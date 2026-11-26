import type { CompanySize, QuoteSubmission } from "./quote-schema";

export const DEFAULT_GRAPHQL_URL = "https://app.pmspace.ai/backend/graphql";

export const CREATE_DEMO_REQUEST_MUTATION = `
  mutation CreateDemoRequest($input: CreateDemoRequestInput!) {
    createDemoRequest(input: $input) {
      _id
      firstName
      email
      formType
      trackingStatus
      createdAt
    }
  }
`;

export interface CreateDemoRequestInput {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber?: string;
  companySize?: CompanySize;
  projectDetails?: string;
  formType?: string;
}

export interface DemoRequestRecord {
  _id: string;
  firstName: string;
  email: string;
  formType: string;
  trackingStatus: string;
  createdAt: string;
}

const LEGACY_TEAM_SIZE_MAP: Record<string, CompanySize> = {
  "1–5": "1-10",
  "1-5": "1-10",
  "1-10": "1-10",
  "6–20": "11-50",
  "6-20": "11-50",
  "21–50": "11-50",
  "21-50": "11-50",
  "11-50": "11-50",
  "50+": "51-200",
  "51-200": "51-200",
  "201-1000": "201-1000",
  "1000+": "1000+",
};

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const cleaned = fullName.trim().replace(/\s+/g, " ");
  const spaceIndex = cleaned.indexOf(" ");
  if (spaceIndex === -1) {
    return { firstName: cleaned, lastName: "-" };
  }
  return {
    firstName: cleaned.slice(0, spaceIndex),
    lastName: cleaned.slice(spaceIndex + 1) || "-",
  };
}

/** Map validated Space BQS inquiry fields into the backend's CreateDemoRequestInput shape. */
export function buildCreateDemoRequestInput(data: QuoteSubmission): CreateDemoRequestInput {
  const split = data.firstName && data.lastName
    ? { firstName: data.firstName, lastName: data.lastName }
    : splitFullName(data.name ?? `${data.firstName ?? ""} ${data.lastName ?? ""}`);

  const resolvedCompanySize =
    data.companySize ?? (data.teamSize ? LEGACY_TEAM_SIZE_MAP[data.teamSize.trim()] : undefined);

  const detailLines = [
    `Country: ${data.country}`,
    `Organization type: ${data.organizationType}`,
    data.companySize ? `Team size: ${data.companySize} surveyors / team members` : null,
    data.role || (data.deployment && data.deployment !== "Discuss options") || data.volume
      ? `Solution: ${data.solution}`
      : null,
    data.deployment && data.deployment !== "Discuss options"
      ? `Deployment: ${data.deployment}`
      : null,
    data.role ? `Role: ${data.role}` : null,
    data.volume ? `Monthly volume: ${data.volume}` : null,
    data.teamSize && !data.companySize ? `Team size: ${data.teamSize}` : null,
    data.projectDetails || data.message
      ? data.role || data.volume || (data.deployment && data.deployment !== "Discuss options")
        ? `Notes: ${data.projectDetails ?? data.message}`
        : `${data.projectDetails ?? data.message}`
      : null,
  ].filter(Boolean);

  const input: CreateDemoRequestInput = {
    firstName: split.firstName,
    lastName: split.lastName,
    email: data.email,
    company: data.company,
    formType: data.formType || "space-bqs",
  };

  if (data.phoneNumber) input.phoneNumber = data.phoneNumber;
  if (resolvedCompanySize) input.companySize = resolvedCompanySize;
  if (detailLines.length > 0) input.projectDetails = detailLines.join("\n");

  return input;
}

export function resolveGraphqlEndpoint(): string {
  return process.env.GRAPHQL_API_URL || process.env.NEXT_PUBLIC_GRAPHQL_URL || DEFAULT_GRAPHQL_URL;
}

interface GraphqlResponse {
  data?: { createDemoRequest?: DemoRequestRecord | null };
  errors?: Array<{ message?: string }>;
}

/** Submit a public CreateDemoRequest mutation to the shared GraphQL backend. */
export async function submitCreateDemoRequest(
  input: CreateDemoRequestInput,
  options?: { fetchImpl?: typeof fetch; endpoint?: string },
): Promise<DemoRequestRecord> {
  const fetchFn = options?.fetchImpl ?? fetch;
  const endpoint = options?.endpoint ?? resolveGraphqlEndpoint();

  let response: Response;
  try {
    response = await fetchFn(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: CREATE_DEMO_REQUEST_MUTATION,
        variables: { input },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
  } catch (err) {
    const baseErr = err as Error & { cause?: { code?: string; message?: string } };
    const reason = baseErr.cause?.code || baseErr.cause?.message || baseErr.message || "Network error";
    throw new Error(`GraphQL request to ${endpoint} failed: ${reason}`, { cause: err });
  }

  const payload = (await response.json().catch(() => null)) as GraphqlResponse | null;

  if (!response.ok) {
    const serverMsg = payload?.errors?.[0]?.message;
    throw new Error(serverMsg || `GraphQL endpoint returned HTTP ${response.status}`);
  }

  if (payload?.errors?.length) {
    throw new Error(payload.errors[0]?.message || "GraphQL mutation failed");
  }

  const created = payload?.data?.createDemoRequest;
  if (!created?._id) {
    throw new Error("GraphQL mutation returned an empty demo request record");
  }

  return created;
}

