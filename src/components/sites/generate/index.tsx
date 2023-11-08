import * as Realm from "realm-web";
import { useParams } from 'react-router-dom';
import { config } from "../../../config";
import { useEffect, useState } from "react";

import OpenAI from 'openai';
import { Button, Spin } from "antd";
import { content, getPrompt } from "./prompt";
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_openaiApiKey,
    dangerouslyAllowBrowser: true,
});

const app = new Realm.App({ id: config.appId }); 

function Generate() {
    const {site_id} = useParams();
    
    const [onboardingData, setOnboardingData] = useState<any>();
    const [response, setResponse] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();
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
    const prompt = getPrompt(onboardingData);

    setLoading(true);
      await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }], // 
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        temperature: 0.3,
      }).then((res) => {
        setResponse(JSON.parse(res.choices[0].message.content ?? "{}"))
        setLoading(false);
        console.log(res);
      }).catch((e) => {
        setError(JSON.stringify(e));
        console.warn(e);
      })
      // console.log("chatCompletion: ", chatCompletion)
      // alert("chatCompletion:" + JSON.stringify(chatCompletion))
  }

    return ( <>
        {/* onboardingData: {JSON.stringify(onboardingData)} <br /> */}
        <Button onClick={getResponseFromGPT}>
            getResponseFromGPT()
        </Button>
        <br />
        <br />
        onboardingData: {JSON.stringify(onboardingData)}
        <br />

        {error && <div style={{color: 'red', fontSize: 20}}>ERROR: {error}</div>}

        <h1>AI generated these labels:</h1>

        {loading && <><Spin />Fetching GPT response... </>}

        <h2 style={{fontWeight: 500, fontSize: 25}}>Hero section</h2>
        <b>
        <h3><span style={{fontWeight: 300}}>headline:</span> {response?.HeroSection["headline"]}</h3>
        <h3><span style={{fontWeight: 300}}>sub-headline:</span> {response?.HeroSection["sub-headline"]}</h3>
        </b>

        <h2 style={{fontWeight: 500, fontSize: 25}}>Practice Areas section</h2>
        <b>
        <h3><span style={{fontWeight: 300}}>pageDescription:</span> {response?.PracticeAreas["pageDescription"]}</h3>
        <h3><span style={{fontWeight: 300}}>values:</span> {response?.PracticeAreas.map((x: any) => <>
          <h3 style={{marginLeft: 40}}>title: {x?.PracticeAreaTitle}</h3>
          <h3 style={{marginLeft: 80}}>description: {x?.PracticeAreaDescription}</h3>
          <br />
        </>)}</h3>
        </b>

        <h2 style={{fontWeight: 500, fontSize: 25}}>Core Values section</h2>
        <b>
        <h3><span style={{fontWeight: 300}}>pageDescription:</span> {response?.ValuesPage["pageDescription"]}</h3>
        <h3><span style={{fontWeight: 300}}>values:</span> {response?.ValuesPage["values"]?.map((x: any) => <>
          <h3 style={{marginLeft: 40}}>Name: {x?.name}</h3>
          <h3 style={{marginLeft: 80}}>Motto: {x?.motto}</h3>
          <h3 style={{marginLeft: 120}}>Description: {x?.description}</h3>
          <br />
        </>)}</h3>
        </b>

        <h2 style={{fontWeight: 500, fontSize: 25}}>About Us section</h2>
        <b>
        <h3><span style={{fontWeight: 300}}>paragraph:</span> {response?.AboutUsPage["paragraph"]}</h3>
        </b>
    </> );
}

export default Generate;