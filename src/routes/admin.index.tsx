import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, ExternalLink, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useVehicles, vehiclesQueryKey } from "@/hooks/use-vehicles";
import type { Vehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const vehicleSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(160),
  type: z.string().trim().max(80),
  year: z
    .union([z.coerce.number().int().min(1900).max(2100), z.literal("")])
    .optional(),
  mileage: z.string().trim().max(60),
  fuel: z.string().trim().max(40),
  transmission: z.string().trim().max(40),
  price: z.string().trim().max(40),
  image: z.string().trim().url("Enter a valid image URL").max(600).or(z.literal("")),
  featured: z.boolean(),
  sort_order: z.coerce.number().int().min(0).max(100000),
});

type FormState = {
  name: string;
  type: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
  featured: boolean;
  sort_order: string;
};

const emptyForm: FormState = {
  name: "",
  type: "",
  year: "",
  mileage: "",
  fuel: "",
  transmission: "",
  price: "",
  image: "",
  featured: false,
  sort_order: "0",
};

function toForm(v: Vehicle): FormState {
  return {
    name: v.name,
    type: v.type,
    year: v.year != null ? String(v.year) : "",
    mileage: v.mileage,
    fuel: v.fuel,
    transmission: v.transmission,
    price: v.price,
    image: v.image,
    featured: v.featured,
    sort_order: String(v.sort_order),
  };
}

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: vehicles = [], isLoading } = useVehicles();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (active) setIsAdmin(!!roles);
    });
    return () => {
      active = false;
    };
  }, []);

  const update = (key: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, sort_order: String(vehicles.length + 1) });
    setErrors({});
    setDialogOpen(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditing(v);
    setForm(toForm(v));
    setErrors({});
    setDialogOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const handleSave = async () => {
    setErrors({});
    const parsed = vehicleSchema.safeParse({
      ...form,
      year: form.year === "" ? "" : form.year,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const payload = {
      name: parsed.data.name,
      type: parsed.data.type,
      year:
        parsed.data.year === "" || parsed.data.year === undefined
          ? null
          : Number(parsed.data.year),
      mileage: parsed.data.mileage,
      fuel: parsed.data.fuel,
      transmission: parsed.data.transmission,
      price: parsed.data.price,
      image: parsed.data.image,
      featured: parsed.data.featured,
      sort_order: parsed.data.sort_order,
    };

    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from("vehicles")
          .update(payload)
          .eq("id", editing.id);
        if (error) throw error;
        toast.success("Vehicle updated");
      } else {
        const { error } = await supabase.from("vehicles").insert(payload);
        if (error) throw error;
        toast.success("Vehicle added");
      }
      await queryClient.invalidateQueries({ queryKey: vehiclesQueryKey });
      setDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save vehicle");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", deleteTarget.id);
      if (error) throw error;
      toast.success("Vehicle deleted");
      await queryClient.invalidateQueries({ queryKey: vehiclesQueryKey });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete vehicle");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="container-luxe py-10">
      <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:inline">
            Stock Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ExternalLink className="size-4" /> View site
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </header>

      {isAdmin === false && (
        <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
          Your account does not have administrator rights, so changes cannot be
          saved. Sign in with the owner account.
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Manage Stock
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"} in
            the public inventory.
          </p>
        </div>
        <Button variant="gold" onClick={openCreate}>
          <Plus className="size-4" /> Add Vehicle
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        {isLoading ? (
          <div className="p-10 text-center text-muted-foreground">Loading…</div>
        ) : vehicles.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No vehicles yet. Add your first listing.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-4 bg-card p-4 transition-colors hover:bg-surface"
              >
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                  {v.image ? (
                    <img
                      src={v.image}
                      alt={v.name}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-foreground">
                      {v.name}
                    </h3>
                    {v.featured && (
                      <Star className="size-4 shrink-0 fill-gold text-gold" />
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {[v.type, v.year, v.mileage].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="font-bold text-gold">{v.price}</p>
                  <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    #{v.sort_order}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEdit(v)}
                    aria-label={`Edit ${v.name}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDeleteTarget(v)}
                    aria-label={`Delete ${v.name}`}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Field label="Name" error={errors.name}>
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Volvo FH 540 Globetrotter"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Type" error={errors.type}>
                <Input
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  placeholder="Tractor Unit"
                />
              </Field>
              <Field label="Year" error={errors.year}>
                <Input
                  value={form.year}
                  onChange={(e) => update("year", e.target.value)}
                  placeholder="2021"
                  inputMode="numeric"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Mileage / Hours" error={errors.mileage}>
                <Input
                  value={form.mileage}
                  onChange={(e) => update("mileage", e.target.value)}
                  placeholder="412,000 km"
                />
              </Field>
              <Field label="Price" error={errors.price}>
                <Input
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="£58,950"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Fuel" error={errors.fuel}>
                <Input
                  value={form.fuel}
                  onChange={(e) => update("fuel", e.target.value)}
                  placeholder="Diesel"
                />
              </Field>
              <Field label="Transmission" error={errors.transmission}>
                <Input
                  value={form.transmission}
                  onChange={(e) => update("transmission", e.target.value)}
                  placeholder="Automatic"
                />
              </Field>
            </div>

            <Field label="Image URL" error={errors.image}>
              <Input
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="https://…/photo.jpg"
              />
            </Field>
            {form.image && (
              <div className="h-40 overflow-hidden rounded-md border border-border bg-surface">
                <img
                  src={form.image}
                  alt="Preview"
                  className="size-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 items-end gap-4">
              <Field label="Sort order" error={errors.sort_order}>
                <Input
                  value={form.sort_order}
                  onChange={(e) => update("sort_order", e.target.value)}
                  inputMode="numeric"
                />
              </Field>
              <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured
                </Label>
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(v) => update("featured", v)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : editing ? "Save Changes" : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this vehicle?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.name}" will be permanently removed from your public
              inventory. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
