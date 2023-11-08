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

export const content = JSON.parse("{\n    \"HeroSection\": {\n        \"headline\": \"Welcome to Legis Aviation Law Firm\",\n        \"sub-headline\": \"Representing clients in aviation accidents, litigation, and aircraft transactions\"\n    },\n    \"ValuesPage\": {\n        \"pageDescription\": \"At Legis, our values are the foundation of our firm. They guide our actions and interactions with clients, and are essential to our success.\",\n        \"values\": [\n            {\n                \"name\": \"Passion\",\n                \"motto\": \"Dedicated to achieving the best outcome for our clients\",\n                \"description\": \"We approach every case with passion and dedication, doing everything we can to ensure our clients' satisfaction.\"\n            },\n            {\n                \"name\": \"Expertise\",\n                \"motto\": \"Knowledge and skills that set us apart\",\n                \"description\": \"As domain experts in aviation law, we bring a high level of specialized knowledge and skills to every case.\"\n            },\n            {\n                \"name\": \"Reliability\",\n                \"motto\": \"Trustworthy and dependable representation\",\n                \"description\": \"Clients can rely on us to provide consistent and reliable legal representation, ensuring that their best interests are always protected.\"\n            },\n            {\n                \"name\": \"Collaboration\",\n                \"motto\": \"Working together for optimal results\",\n                \"description\": \"Collaboration is at the heart of our approach. We work closely with our clients, keeping them informed and involved throughout the legal process.\"\n            }\n        ]\n    },\n    \"PracticeAreas\": [\n        {\n            \"PracticeAreaTitle\": \"Aviation Accidents & Personal Injury\",\n            \"PracticeAreaDescription\": \"In the realm of aviation accidents and personal injury, Legis is here to help. With our extensive understanding of aviation regulations and experience in representing clients in personal injury claims, we provide the highest level of advocacy to those who have been injured in aviation accidents.\"\n        },\n        {\n            \"PracticeAreaTitle\": \"Litigation\",\n            \"PracticeAreaDescription\": \"Navigating the complexities of aviation litigation requires a law firm with expertise and a track record of success. Legis has a deep understanding of this realm, and we are prepared to represent clients in all areas of aviation-related litigation, ensuring their rights are protected and their best interests are served.\"\n        },\n        {\n            \"PracticeAreaTitle\": \"Aircraft Transactions\",\n            \"PracticeAreaDescription\": \"When it comes to matters of aircraft transactions, Legis is the firm you can trust. Our in-depth knowledge of aviation laws and regulations, combined with our experience in negotiating and structuring successful aircraft transactions, allows us to guide our clients through the intricacies of buying, selling, and leasing aircraft with confidence.\"\n        }\n    ],\n    \"AboutUsPage\": {\n        \"paragraph\": \"At Legis, we are committed to providing exceptional legal representation to our clients in the field of aviation law. With a strong work ethic and an unwavering dedication to our clients' success, we work tirelessly to achieve the best possible outcomes. Our domain expertise sets us apart, and our clients can rely on us to provide reliable and trustworthy representation. We believe in collaboration, working closely with our clients to ensure their voices are heard and their concerns are addressed. With Legis, you can expect personalized attention, strong advocacy, and unparalleled expertise in aviation law.\"\n    }    \n}");