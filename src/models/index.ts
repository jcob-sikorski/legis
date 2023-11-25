export interface JSONProfileField {
    id: string,
    label: string,
    type: FieldType,
    subtype: number,
    generative?: number,
  }



export interface JSONProfile {
    metadata: any,
    fields: JSONProfileField[],
}

export interface OnboardingData {
  templateIds: string[],
  lawyerField: string,
}


export type FieldType = 'text' | 'number' | 'image' | 'textarea' | 'checkbox';
export interface FieldContext {
  key: string;
  type: FieldType;
  label: string;
  ratio: number; // used for image input's crop aspect ratio
  index: number; // used for collection datas like: lawyers or reviews.
  collection: string; // used to specify collection within section.
}