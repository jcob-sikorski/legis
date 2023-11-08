import Questionnaire from "../../../models/Questionnaire";

export const getPrompt = ({LawFirmName, MainPracticeArea, OneSentenceDescription, StandOutFactor, ImportantValues, SpecializedPracticeAreas, FirmRepresentation, FirmStrengths} : Questionnaire) => (`You are a website copywriter. 
I need you to create labels for wireframes of elements of these sections. 
Law firm name is “${LawFirmName}” and its main practice area is “${MainPracticeArea}”. 
Their one sentence description is “${OneSentenceDescription}”. Their standing out factor is "${StandOutFactor}". Give all your sections filled with answers in 1 big JSON file at the end. This is the data based on which i want you to create wireframes like i tell you: {
    "LawFirmName": "${LawFirmName}",
    "MainPracticeArea": "Aviation Law",
    "OneSentenceDescription": "${OneSentenceDescription}",
    "SpecializedPracticeAreas": "${SpecializedPracticeAreas}",
    "FirmRepresentation": "${FirmRepresentation}",
    "FirmStrengths": "${FirmStrengths}",
    "StandOutFactor": ${StandOutFactor?.join("; ")}
    "ImportantValues":  ${ImportantValues?.join("; ")}
}


Gimme wireframe labels for Aviation Law Firm Hero section. It should contain a headline and a  sub-headline. Make the subheadline longer
 for the Practice Areas section. For each area i want you to create a paragraph explaining a bit more and helping a potential customer understand the law firm in context of this law area of expertise. 

Heres the raw data to work with, along the data from previous response (which is that the website is about an Aviation Law Firm)

    "SpecializedPracticeAreas": "Aviation Accidents & Personal Injury, Litigation, Aircraft Transactions",

Do the Our values page like before, given this data, and make a paragraph about our values and also a very short description or a motto for each value. Figure something out.
The data fields to be inspired by: FirmRepresentation, FirmStrengths, ImportantValues in the given above object
Do the About Us page, with paragraph and some other elements that you think should be contained in wireframes of About Us. The data fields to be inspired by: FirmRepresentation and StandOutFactor in the given above object

Answer ONLY WITH CODE WITH NO COMMENTS AND IN THIS JSON FORMAT:
{
    "HeroSection": {
        "headline": [FILL],
        "sub-headline": [FILL]
      },
    "ValuesPage": {
      "pageDescription": [FILL],
      "values": [
        {
          "name": [FILL],
          "motto": [FILL],
          "description": [FILL]
        },
        ...other values here
      ]
    },
    "PracticeAreas": [
        {
            "PracticeAreaTitle": [FILL],
            "PracticeAreaDescription": [FILL],
        },
        ...other values here
    ],
    "AboutUsPage": {
        // longparagraph here
        "paragraph": [FILL],
    }    
  }
`).trim();
