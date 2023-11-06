import React from 'react';
import { Layout } from 'antd';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

function Questions() {
  const survey = new Survey.Model({
    "pages": [
      {
        "elements": [
          {
            "type": "html",
            "name": "WelcomeMessage",
            "html": "Welcome to Legis. To adjust the website to your law firm, we first need to understand what your law firm does, what practice areas you work in, and your values among other things. The following questions take between 5 and 8 minutes to complete. They will reveal your law firm's values and how you want your firm to be perceived by your clients. We’ll use it to display website options that reflect your firm and meet the expectations of your client."
          }
        ]
      },
      {
        "elements": [
          {
            type: "text",
            name: "LawFirmName",
            title: "What is the name of your law firm?",
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "MainPracticeArea",
            title: "What is your main practice area? (e.g., Family Law)",
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "dropdown",
            name: "MainPracticeAreaOptions",
            title: "Select your main practice area",
            isRequired: true,
            choices: [
              "Banking and Debt finance Law",
              "Charity Law",
              "Civil litigation dispute resolution law",
              "Commercial law",
              "Arbitration",
              "Aviation Law",
              "Construction Law",
              "Consumer Law",
              "Corporate Law",
              "Criminal Law",
              "Employment Law",
              "Environmental Law",
              "Family Law",
              "Real-estate law",
              "Human Rights Law",
              "Immigration Law",
              "Energy & Infrastructure Law",
              "Insurance Law",
              "Intellectual Property Law",
              "Personal Injury Law",
              "Property Law",
              "Public company & equity finance law",
              "Restructuring & insolvency law",
              "Competition Law",
              "Maritime Law",
              "Sports Law",
              "Tax law",
              "Gaming Law"
            ]
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "OneSentenceDescription",
            title: "Write a one-sentence description of your law firm",
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "SpecializedPracticeAreas",
            title: "What smaller practice areas do you specialize in? (E.g., Divorce settlement, custody claims, drafting wills, etc)"
         }
       ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "StandOutFactor",
            title: "How does your law firm stand out?",
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "checkbox",
            name: "StandOutFactorOptions",
            title: "Select all that apply",
            choices: [
              "Work ethic - We work harder than anyone else.",
              "Clarity-focused: We are problem solvers at heart.",
              "Domain experts - We are experts at what we do.",
              "Accessible - We make sure quality legal help reaches as many people as possible."
            ]
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "FirmRepresentation",
            title: "Which of these statements best represents your law firm?",
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "radiogroup",
            name: "FirmRepresentationOptions",
            title: "Choose one",
            choices: [
              "Gritty - We aren’t afraid to get our hands dirty",
              "Passionate - We are going to do everything to make sure our client is happy",
              "Compassionate & Strong - we look after our clients always, especially when things get rough",
              "Fearless - We aren’t afraid to take on big challenges. We take them head on."
            ]
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "ImportantValues",
            title: "What values are most important at your law firm?",
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "checkbox",
            name: "ImportantValuesOptions",
            title: "Select all that apply",
            choices: [
              "Reliability",
              "Loyalty & Trust",
              "Integrity",
              "Excellence",
              "Collaboration"
            ]
          }
        ]
      },
      {
        "elements": 
        [
          {
            type: "text",
            name: "FirmStrengths",
            title: "Tell us the strength of your firm, what are your experience levels and what you bring to the table.",
          }
        ]
      },
      {
        "elements": 
        [
          {       
            type: "text",
            name: "LawyerDetails",
            title: "Name your lawyers and write a one-sentence description about your lawyer.",
          }
        ]
      },
      {
        "elements": 
        [
          {    
            type: "text",
            name: "ClientReviews",
            title: "Write 3 good reviews given by your clients. Separate each review by a comma.",
          }
        ]
      },
    ]
  });

  // Define any additional survey settings or events here, if needed

  return (
    <Layout>
      <Survey.Survey model={survey} />
    </Layout>
  );
}

export default Questions;
