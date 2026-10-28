/** Explicit worksheet arithmetic. No ASTM table lookup or hidden corrections. */
function nonNegative(value: number, name: string) {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a finite number of zero or more.`);
}

function positive(value: number, name: string) {
  nonNegative(value, name);
  if (value === 0) throw new Error(`${name} must be greater than zero.`);
}

function finiteResult(...values: number[]) {
  if (values.some((value) => !Number.isFinite(value))) throw new Error("The result is outside the supported numeric range. Check your inputs.");
}

export function volumeToMass(observed: number, water: number, vcf: number, density: number) {
  nonNegative(observed, "Observed volume");
  nonNegative(water, "Free-water volume");
  positive(vcf, "Supplied VCF");
  positive(density, "Density");
  if (water > observed) throw new Error("Free-water volume cannot exceed observed volume.");
  const net = observed - water;
  const standard = net * vcf;
  const mass = standard * density;
  finiteResult(net, standard, mass);
  return { net, standard, mass };
}

export function compareDelivery(declared: number, measured: number) {
  positive(declared, "BDN declared mass");
  nonNegative(measured, "Measured mass");
  const difference = measured - declared;
  const percent = difference / declared * 100;
  finiteResult(difference, percent);
  return { difference, percent };
}

export function robBalance(opening: number, receipts: number, transfers: number, closing: number) {
  nonNegative(opening, "Opening ROB");
  nonNegative(receipts, "Receipts");
  nonNegative(transfers, "Transfers out");
  nonNegative(closing, "Closing ROB");
  const available = opening + receipts;
  const consumption = available - transfers - closing;
  finiteResult(available, consumption);
  if (consumption < 0) throw new Error("Closing ROB and transfers exceed opening ROB plus receipts. Reconcile the entries before using the balance.");
  return { available, consumption };
}

export const VOLUME_UNITS = { "m³": 1, "L": 0.001, "US gal": 0.003785411784, "Imp gal": 0.00454609 };
export const MASS_UNITS = { "MT": 1, "kg": 0.001, "lb": 0.00045359237 };

export function convertUnit(value: number, from: string, to: string, dimension: "volume" | "mass") {
  nonNegative(value, "Quantity");
  const units: Record<string, number> = dimension === "volume" ? VOLUME_UNITS : MASS_UNITS;
  if (!Object.hasOwn(units, from) || !Object.hasOwn(units, to)) throw new Error("Choose units from the same measurement family.");
  const result = value * units[from] / units[to];
  finiteResult(result);
  return result;
}
