import { z } from "zod";

const optionalTrimmed = (max: number, message?: string) =>
  z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : typeof val === "string" ? val.trim() : val),
    z.string().max(max, message).optional(),
  );

export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];
export const ORGANIZATION_TYPES = [
  "Independent bunker survey company",
  "Marine inspection agency",
  "Fleet operator",
  "Other marine organization",
] as const;

const companySizeSchema = z.preprocess(
  (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
  z.enum(COMPANY_SIZES),
);

export const quoteSchema = z
  .object({
    firstName: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : typeof val === "string" ? val.trim() : val),
      z.string().min(1, "First name is required").max(80).optional(),
    ),
    lastName: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Last name is required").max(80).optional(),
    ),
    name: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : typeof val === "string" ? val.trim() : val),
      z.string().min(2, "Your name is required").max(160).optional(),
    ),
    email: z.string().trim().email("A valid work email is required"),
    company: z.string().trim().min(2, "Your company is required").max(160),
    country: z.string().trim().min(2, "Country is required").max(100),
    organizationType: z.enum(ORGANIZATION_TYPES),
    phoneNumber: optionalTrimmed(40, "Phone number is too long"),
    role: optionalTrimmed(120, "Role is too long"),
    companySize: companySizeSchema,
    teamSize: optionalTrimmed(40),
    solution: z.enum(["Space BQS", "Cargo WMS", "Discuss both"]).default("Space BQS"),
    deployment: z.enum(["Discuss options", "Public cloud", "Private cloud", "On-premises"]).default("Discuss options"),
    volume: optionalTrimmed(100),
    message: optionalTrimmed(2000),
    projectDetails: optionalTrimmed(1600),
    formType: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : typeof val === "string" ? val.trim() : val),
      z.string().min(1).max(64).default("space-bqs"),
    ),
  })
  .superRefine((data, ctx) => {
    const hasSplitName = Boolean(data.firstName && data.lastName);
    const hasFullName = Boolean(data.name && data.name.length >= 2);

    if (!hasSplitName && !hasFullName) {
      if (!data.firstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["firstName"],
          message: "First name is required",
        });
      }
      if (!data.lastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lastName"],
          message: "Last name is required",
        });
      }
    }
  });

export type QuoteSubmission = z.infer<typeof quoteSchema>;
