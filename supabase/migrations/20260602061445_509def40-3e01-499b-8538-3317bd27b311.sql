-- Roles enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Vehicles table
CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT '',
  year integer,
  mileage text NOT NULL DEFAULT '',
  fuel text NOT NULL DEFAULT '',
  transmission text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.vehicles TO anon, authenticated;
GRANT ALL ON public.vehicles TO authenticated, service_role;

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view vehicles"
  ON public.vehicles FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert vehicles"
  ON public.vehicles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vehicles"
  ON public.vehicles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vehicles"
  ON public.vehicles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER vehicles_set_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed existing sample inventory
INSERT INTO public.vehicles (name, type, year, mileage, fuel, transmission, price, image, featured, sort_order) VALUES
('Volvo FH 540 Globetrotter', 'Tractor Unit', 2021, '412,000 km', 'Diesel', 'Automatic', '£58,950', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80', true, 1),
('Scania R450 Curtainsider', 'Tractor & Trailer', 2020, '498,500 km', 'Diesel', 'Automatic', '£62,500', 'https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&w=1200&q=80', true, 2),
('DAF LF 260 Box Rigid', 'Rigid Truck', 2019, '286,300 km', 'Diesel', 'Manual', '£34,750', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80', true, 3),
('MAN TGS 35.420 Tipper', 'Tipper', 2022, '164,900 km', 'Diesel', 'Automatic', '£71,995', 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80', true, 4),
('Mercedes-Benz Sprinter 314', 'Panel Van', 2021, '92,400 km', 'Diesel', 'Manual', '£21,450', 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1200&q=80', true, 5),
('CAT 320 Tracked Excavator', 'Plant', 2020, '5,200 hrs', 'Diesel', 'Hydrostatic', '£84,000', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80', true, 6);