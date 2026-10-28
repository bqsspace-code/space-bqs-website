import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("A valid work email is required"),
  company: z.string().min(2, "Your company is required"),
  role: z.string().min(2, "Your role is required"),
  teamSize: z.string().min(1, "Team size is required"),
  solution: z.enum(["Space BQS", "Cargo WMS", "Discuss both"]).default("Space BQS"),
  deployment: z.enum(["Discuss options", "Public cloud", "Private cloud", "On-premises"]).default("Discuss options"),
  volume: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
});
