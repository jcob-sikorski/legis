export interface JSONProfileField {
    id: string,
    label: string,
    type: FieldType,
    subtype: number,
    generative?: number,
  }

export type FieldType = "input" | "textarea" | "checkbox" | "image";

export interface JSONProfile {
    metadata: any,
    fields: JSONProfileField[],
}

export interface OnboardingData {
  templateIds: string[],
  lawyerField: string,
}