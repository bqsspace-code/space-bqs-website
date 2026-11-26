import { test } from "node:test";
import assert from "node:assert/strict";
import { volumeToMass, compareDelivery, robBalance, convertUnit } from "../lib/survey-calculations.ts";
import { quoteSchema } from "../app/lib/quote-schema.ts";
import { buildCreateDemoRequestInput, submitCreateDemoRequest } from "../app/lib/demo-request.ts";

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
  const sample = compareDelivery(460, 457.819);
  assert.equal(sample.difference.toFixed(3), "-2.181");
  assert.equal(sample.percent.toFixed(2), "-0.47");
  assert.deepEqual(compareDelivery(500, 500), { difference: 0, percent: 0 });
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
  const base = { name: "Test User", email: "user@example.com", company: "Example", country: "Singapore", organizationType: "Independent bunker survey company", companySize: "1-10", role: "Operations", teamSize: "1–5" };
  for (const deployment of ["Public cloud", "Private cloud", "On-premises", "Discuss options"]) {
    const parsed = quoteSchema.parse({ ...base, solution: "Cargo WMS", deployment });
    assert.equal(parsed.solution, "Cargo WMS");
    assert.equal(parsed.deployment, deployment);
  }
  assert.equal(quoteSchema.parse(base).solution, "Space BQS");
  assert.equal(quoteSchema.safeParse({ ...base, deployment: "Unexpected" }).success, false);
});

test("demo request schema validates split names, optional fields, and email format", () => {
  const parsed = quoteSchema.parse({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    company: "Example Ltd",
    country: "Singapore",
    organizationType: "Independent bunker survey company",
    phoneNumber: "",
    companySize: "1-10",
    solution: "Space BQS",
    deployment: "Public cloud",
    message: "Evaluating deck survey sync.",
  });

  assert.equal(parsed.firstName, "Jane");
  assert.equal(parsed.lastName, "Doe");
  assert.equal(parsed.phoneNumber, undefined);
  assert.equal(parsed.companySize, "1-10");
  assert.equal(parsed.formType, "space-bqs");
  assert.equal(quoteSchema.safeParse({ firstName: "Jane", lastName: "Doe", email: "not-an-email", company: "Co" }).success, false);
});

test("buildCreateDemoRequestInput maps Space BQS fields into CreateDemoRequestInput", () => {
  const parsed = quoteSchema.parse({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    company: "Example Ltd",
    country: "Malaysia",
    organizationType: "Marine inspection agency",
    phoneNumber: "+15551234567",
    companySize: "11-50",
    role: "Fleet Superintendent",
    solution: "Cargo WMS",
    deployment: "Private cloud",
    volume: "400 TEU/month",
    message: "Need bonded cargo workflow.",
    formType: "space-bqs",
  });

  const input = buildCreateDemoRequestInput(parsed);
  assert.equal(input.firstName, "Jane");
  assert.equal(input.lastName, "Doe");
  assert.equal(input.email, "jane@example.com");
  assert.equal(input.company, "Example Ltd");
  assert.equal(input.phoneNumber, "+15551234567");
  assert.equal(input.companySize, "11-50");
  assert.match(input.projectDetails ?? "", /Country: Malaysia/);
  assert.match(input.projectDetails ?? "", /Organization type: Marine inspection agency/);
  assert.equal(input.formType, "space-bqs");
  assert.match(input.projectDetails ?? "", /Solution: Cargo WMS/);
  assert.match(input.projectDetails ?? "", /Deployment: Private cloud/);
  assert.match(input.projectDetails ?? "", /Role: Fleet Superintendent/);
  assert.match(input.projectDetails ?? "", /Monthly volume: 400 TEU\/month/);
  assert.match(input.projectDetails ?? "", /Notes: Need bonded cargo workflow\./);

  const legacy = quoteSchema.parse({
    name: "Captain Alex",
    email: "alex@example.com",
    company: "Harbor Marine",
    country: "United States",
    organizationType: "Fleet operator",
    companySize: "11-50",
    role: "Lead Surveyor",
    teamSize: "6–20",
  });
  const legacyInput = buildCreateDemoRequestInput(legacy);
  assert.equal(legacyInput.firstName, "Captain");
  assert.equal(legacyInput.lastName, "Alex");
  assert.equal(legacyInput.companySize, "11-50");
});

test("submitCreateDemoRequest posts GraphQL mutation and handles GraphQL errors", async () => {
  let capturedUrl = "";
  let capturedBody = "";

  const created = await submitCreateDemoRequest(
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      company: "Example Ltd",
      formType: "space-bqs",
    },
    {
      endpoint: "https://example.invalid/graphql",
      fetchImpl: async (url, init) => {
        capturedUrl = String(url);
        capturedBody = String(init?.body ?? "");
        return new Response(
          JSON.stringify({
            data: {
              createDemoRequest: {
                _id: "673000000000000000000001",
                firstName: "Jane",
                email: "jane@example.com",
                formType: "space-bqs",
                trackingStatus: "new",
                createdAt: "2026-11-12T10:00:00.000Z",
              },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  );

  assert.equal(capturedUrl, "https://example.invalid/graphql");
  const parsedBody = JSON.parse(capturedBody);
  assert.match(parsedBody.query, /mutation CreateDemoRequest/);
  assert.equal(parsedBody.variables.input.formType, "space-bqs");
  assert.equal(created._id, "673000000000000000000001");

  await assert.rejects(
    () =>
      submitCreateDemoRequest(
        { firstName: "Jane", lastName: "Doe", email: "jane@example.com", company: "Example Ltd" },
        {
          endpoint: "https://example.invalid/graphql",
          fetchImpl: async () =>
            new Response(JSON.stringify({ errors: [{ message: "Validation failed" }] }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
        },
      ),
    /Validation failed/,
  );
});
