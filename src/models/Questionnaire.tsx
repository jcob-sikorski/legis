export default interface Questionnaire {
  _id: string;
  site_id: string;
  page?: number;
  LawFirmName?: string; //Q1
  MainPracticeArea?: string; //Q2
  OneSentenceDescription?: string; //Q3
  SpecializedPracticeAreas?: string; //Q4
  StandOutFactor?: string[]; //Q5
  FirmRepresentation?: string; //Q6
  ImportantValues?: string[]; //Q7
  FirmStrengths?: string; //Q8
  LawyerDetails?: string; //Q9
  ClientReviews?: string; //Q10
}
