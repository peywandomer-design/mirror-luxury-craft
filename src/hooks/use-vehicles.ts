import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Vehicle } from "@/data/vehicles";

export const vehiclesQueryKey = ["vehicles"] as const;

export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, name, type, year, mileage, fuel, transmission, price, image, featured, sort_order",
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Vehicle[];
}

export function useVehicles() {
  return useQuery({
    queryKey: vehiclesQueryKey,
    queryFn: fetchVehicles,
  });
}
