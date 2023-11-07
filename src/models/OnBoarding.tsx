export default interface OnBoarding {
  _id: string;
  site_id: string;
  page?: number;
  LawFirmName?: string;
  MainPracticeArea?: string;
  OneSentenceDescription?: string;
  SpecializedPracticeAreas?: string;
  StandOutFactor?: string[];
  FirmRepresentation?: string;
  ImportantValues?: string[];
  FirmStrengths?: string;
  LawyerDetails?: string;
  ClientReviews?: string;
}