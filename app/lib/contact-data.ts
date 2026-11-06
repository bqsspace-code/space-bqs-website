export interface OfficeLocation {
  id: string;
  country: string;
  /**
   * Formatted phone number displayed in bold (e.g. "+1 646 421 5740").
   * If omitted or empty, the country name is shown prominently as in the screenshot.
   */
  displayNumber?: string;
  /**
   * Raw tel link target (e.g. "+16464215740").
   * If omitted, links to the contact page / inquiry.
   */
  phone?: string;
  flagCode: "us" | "ca" | "in" | "ae" | "sa" | "kw" | "sg" | "my";
  note?: string;
}

export const MAIN_OFFICE_DISPLAY = "+1 646 421 5740";
export const MAIN_OFFICE_TEL = "+16464215740";

/**
 * Global office contact details (referenced from aibizmod.com navbar)
 */
export const OFFICE_LOCATIONS: OfficeLocation[] = [
  // Left Column
  {
    id: "us",
    country: "USA",
    displayNumber: "+1 646 421 5740",
    phone: "+16464215740",
    flagCode: "us",
  },
  {
    id: "in",
    country: "India",
    // Matches the screenshot where India is listed for regional inquiry
    // To enable direct dialing, set displayNumber: "+91 80 4680 9100" and phone: "+918046809100"
    displayNumber: "",
    phone: "",
    flagCode: "in",
    note: "Sales & Technical Support",
  },
  {
    id: "sa",
    country: "Saudi Arabia",
    displayNumber: "+966 56 208 1999",
    phone: "+966562081999",
    flagCode: "sa",
  },
  {
    id: "sg",
    country: "Singapore",
    displayNumber: "+65 86 111 900",
    phone: "+6586111900",
    flagCode: "sg",
  },

  // Right Column
  {
    id: "ca",
    country: "Canada",
    displayNumber: "+1 (979) 326-9493",
    phone: "+19793269493",
    flagCode: "ca",
  },
  {
    id: "ae",
    country: "UAE",
    displayNumber: "+971 56 256 7509",
    phone: "+971562567509",
    flagCode: "ae",
  },
  {
    id: "kw",
    country: "Kuwait",
    displayNumber: "+965 9724 3755",
    phone: "+96597243755",
    flagCode: "kw",
  },
  {
    id: "my",
    country: "Malaysia",
    displayNumber: "+60 10660 7357",
    phone: "+60106607357",
    flagCode: "my",
  },
];
