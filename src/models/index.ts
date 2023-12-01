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
  key?: string;
  type?: FieldType;
  label?: string;
  ratio?: number; // used for image input's crop aspect ratio
  index?: number; // used for collection datas like: lawyers or reviews.
  collection?: string; // used to specify collection within section.
  variantProperty?: string // used to specify which element connected by key is going to have different variations
  section_id?: string // mirror for data's section_id
  seriableLabel?: string // noun to name your seriable field in buttons' labels
  isGroup?: boolean // if set to true displays all editable fields of seriable value for selected collection value (e.g. for collection lawyerDetails it displays photo, name and descritpion fields all at once.)
  isSection?: boolean // if set to true interface displays '+ Add' and '- Delete' buttons for seriables in selected collection value
  cdnUUID?: string // used to store clicked value's current image cdn UUID. It will be later displayed in image input in editor's Interface.
  seriableId?: string // used as diffrentiator between seriable field input forms (E.g. when new lawyer is created it's edit form doesn't have the same key as the previous one. )
}