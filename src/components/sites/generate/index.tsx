import * as Realm from "realm-web";
import { useParams } from 'react-router-dom';
import { config } from "../../../config";
import { useEffect, useState } from "react";

import OpenAI from 'openai';
import { Button } from "antd";
const openai = new OpenAI({
    apiKey: config.openaiApiKey,
    organization: config.openaiOrg,
    dangerouslyAllowBrowser: true,
});

const app = new Realm.App({ id: config.appId }); 

function Generate() {
    const {site_id} = useParams();
    
    const [onboardingData, setOnboardingData] = useState<any>();
    const [dataForGeneration, setDataForGeneration] = useState<any>();
  
  const currentUserID = app.currentUser!.id;

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const onboarding_collection = mongodb.db("legis").collection("Questionnaire");        
  useEffect(() => {
    console.log("Fetching the survey data from mongo.");
    async function getData() {
      try {
        const result = await onboarding_collection.find({ site_id: new Realm.BSON.ObjectId(site_id) });
        const data = result.length > 0 ? result[0] : {};
        setOnboardingData(data);
        let dataForGeneration = {
            LawFirmName: data.LawFirmName,
            OneSentenceDescription: data.OneSentenceDescription,
            SpecializedPracticeAreas: data.SpecializedPracticeAreas,
            FirmRepresentation: data.FirmRepresentation,
            ImportantValues: data.ImportantValues,
        }; 

        setDataForGeneration(dataForGeneration);
        // getResponseFromGPT()

      } catch (error) {
        console.error("Error fetching for Questionnaire data for this site:", error);
      }
    }
  
    getData();
  }, []);

  async function getResponseFromGPT() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });
      console.log("chatCompletion: ", chatCompletion)
      alert("chatCompletion:" + JSON.stringify(chatCompletion))
  }

    return ( <>
        {/* onboardingData: {JSON.stringify(onboardingData)} <br /> */}
        <Button onClick={getResponseFromGPT}>
            getResponseFromGPT()
        </Button>
        dataForGeneration: {JSON.stringify(dataForGeneration)}
    </> );
}

export default Generate;