import { test } from "node:test";
import assert from "node:assert/strict";
import { volumeToMass, compareDelivery, robBalance, convertUnit } from "../lib/survey-calculations.ts";
import { quoteSchema } from "../app/lib/quote-schema.ts";

test("supplied-factor worked check returns 457.819 MT without intermediate rounding", () => {
  const result = volumeToMass(498.12, 0.12, 0.9677, 0.95);
  assert.ok(Math.abs(result.net - 498) < 1e-10);
  assert.equal(result.mass.toFixed(3), "457.819");
});
test("mass worksheet rejects impossible inputs and accepts a zero net volume", () => {
  assert.throws(() => volumeToMass(10, 11, 1, 0.95), /cannot exceed/);
  assert.throws(() => volumeToMass(10, 0, 0, 0.95), /greater than zero/);
  assert.equal(volumeToMass(10, 10, 1, 0.95).mass, 0);
});
test("BDN difference is signed and uses declared mass as denominator", () => {
  assert.deepEqual(compareDelivery(500, 497.5), { difference: -2.5, percent: -0.5 });
  assert.deepEqual(compareDelivery(500, 505), { difference: 5, percent: 1 });
  assert.throws(() => compareDelivery(0, 5), /greater than zero/);
});
test("ROB balance includes transfers and prevents a misleading negative consumption", () => {
  assert.deepEqual(robBalance(250, 100, 20, 180), { available: 350, consumption: 150 });
  assert.equal(robBalance(100, 0, 0, 100).consumption, 0);
  assert.throws(() => robBalance(100, 0, 50, 80), /Reconcile/);
});
test("US and imperial gallons use their distinct exact SI definitions", () => {
  assert.ok(Math.abs(convertUnit(1, "US gal", "L", "volume") - 3.785411784) < 1e-12);
  assert.ok(Math.abs(convertUnit(1, "Imp gal", "L", "volume") - 4.54609) < 1e-12);
  assert.equal(convertUnit(1, "MT", "kg", "mass"), 1000);
  assert.ok(Math.abs(convertUnit(convertUnit(100, "L", "US gal", "volume"), "US gal", "L", "volume") - 100) < 1e-10);
  assert.throws(() => convertUnit(1, "MT", "L", "volume"), /same measurement family/);
});
test("invalid, negative, infinite, and overflowing inputs are not exported as valid results", () => {
  for (const value of [NaN, Infinity, -1]) {
    assert.throws(() => volumeToMass(value, 0, 1, 1));
    assert.throws(() => compareDelivery(1, value));
    assert.throws(() => robBalance(value, 0, 0, 0));
    assert.throws(() => convertUnit(value, "MT", "kg", "mass"));
  }
  assert.throws(() => volumeToMass(1e308, 0, 10, 1), /numeric range/);
});

test("inquiries preserve solution and deployment choices with backward-compatible defaults", () => {
  const base = { name: "Test User", email: "user@example.com", company: "Example", role: "Operations", teamSize: "1–5" };
  for (const deployment of ["Public cloud", "Private cloud", "On-premises", "Discuss options"]) {
    const parsed = quoteSchema.parse({ ...base, solution: "Cargo WMS", deployment });
    assert.equal(parsed.solution, "Cargo WMS");
    assert.equal(parsed.deployment, deployment);
  }
  assert.equal(quoteSchema.parse(base).solution, "Space BQS");
  assert.equal(quoteSchema.safeParse({ ...base, deployment: "Unexpected" }).success, false);
});
