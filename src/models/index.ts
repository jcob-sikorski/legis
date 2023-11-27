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


export type FieldType = 'text' | 'number' | 'image' | 'textarea' | 'checkbox' | 'button';
export interface FieldContext {
  key: string;
  type: FieldType;
  label: string;
  ratio: number; // used for image input's crop aspect ratio
  index: number; // used for collection datas like: lawyers or reviews.
  collection: string; // used to specify collection within section.
  variantProperty: string // used to specify which element connected by key is going to have different variations
  section_id: string // mirror for data's section_id
  seriableLabel: string // noun to name your seriable field in buttons' labels
}