import Questionnaire from "../../../models/Questionnaire";

export const getOnboardingData = ({
  LawFirmName,
  MainPracticeArea,
  OneSentenceDescription,
  SpecializedPracticeAreas,
  FirmRepresentation,
  FirmStrengths,
  LawyerDetails,
  ClientReviews,
  StandOutFactor,
  ImportantValues
}: Questionnaire): string => {
  return `
{
  "LawFirmName": "${LawFirmName}",
  "MainPracticeArea": "${MainPracticeArea}",
  "OneSentenceDescription": "${OneSentenceDescription}",
  "SpecializedPracticeAreas": "${SpecializedPracticeAreas}",
  "FirmRepresentation": "${FirmRepresentation}",
  "LawyerDetails": "${LawyerDetails}",
  "FirmStrengths": "${FirmStrengths}",
  "StandOutFactor": ${JSON.stringify(StandOutFactor?.join("; "))},
  "ImportantValues": ${JSON.stringify(ImportantValues?.join("; "))},
}`;
};
