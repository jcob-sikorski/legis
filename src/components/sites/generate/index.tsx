import * as Realm from "realm-web";
import { useNavigate, useParams } from 'react-router-dom';
import { config } from "../../../config";
import { useEffect, useState } from "react";

import OpenAI from 'openai';
import { Button, Flex, Spin } from "antd";
import { content, getPrompt } from "./prompt";
import { OnboardingData } from "../../../models";
import { v4 } from "uuid";
// import { AIGeneratedData } from "../../../models/AIGeneratedData";
import Questionnaire from "../../../models/Questionnaire";

import 'animate.css';


const openai = new OpenAI({
    apiKey: config.openaiApiKey,
    organization: config.openaiOrg,
    dangerouslyAllowBrowser: true,
});



const app = new Realm.App({ id: config.appId }); 

function Generate() {
    const {site_id} = useParams();
    
    const [onboardingData, setOnboardingData] = useState<any>();
    const [response, setResponse] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(); 

    const [step, setStep] = useState<number>(0); 
  
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
        // getResponseFromGPT()
        

      } catch (error) {
        console.error("Error fetching for Questionnaire data for this site:", error);
      }
    }
  
    getData();
  }, []);

  const site_collection = mongodb.db("legis").collection("Site");

  const updateSite = async (data: any) => {
    console.log("Trying to upload this data: ", data);
    if (data) {
      try {
        const result = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site_id) }, // Specify the query to find the site by site_id
          {
            $set: { bodyTemplate: data }, // Use $set to update the data field
          }
        );

        console.log("Updated site:", JSON.stringify(result));
      } catch (error) {
        console.error("Error updating site:", error);
      }
    }
  };

  async function getResponseFromGPT() {

    

    const prompt = getPrompt(onboardingData);

    setStep(1);
    setLoading(true);
      await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }], // 
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        temperature: 0.3,
      }).then((res) => {
        const finalContent = JSON.parse(res.choices[0].message.content ?? "{}");
        setResponse(finalContent)
        setLoading(false);
        setStep(2);
        // generate site data value
        const siteData = getSiteData(onboardingData, finalContent);
        updateSite(siteData);
        
        console.log(res);
      }).catch((e) => {
        setError(JSON.stringify(e));
        console.warn(e);
      })
      // console.log("chatCompletion: ", chatCompletion)
      // alert("chatCompletion:" + JSON.stringify(chatCompletion))
  }

  const navigate = useNavigate();
  function onContinue() {
    navigate(`/editor/${site_id}`);
  }

    return ( <>
        <Flex vertical style={{background: '#000', height: '100vh', width: '100%', color: 'white'}} justify="center" align="center">
        {" "}
        {error && <><h1 className="animate__bounceIn" style={{fontSize: 25, color: 'red'}}>
            An error has occured
          </h1>
          <h3>Error message:</h3>
          <div>
            {JSON.stringify(error)}
          </div>
          <div className="animate__bounceInUp" style={{animationDelay: '0s'}}>
            <Button  onClick={getResponseFromGPT} type='primary' size='large' style={{width: 350, height: 50, marginTop: 30}}>
              Try again
            </Button>
          </div>
          </>}

          {!loading && step === 0 && <><h1 className="animate__bounceIn" style={{fontSize: 25}}>
            On this stage, AI will generate your page's content. Ready?
          </h1>
          <div className="animate__bounceInUp" style={{animationDelay: '0s'}}>
            <Button  onClick={getResponseFromGPT} type='primary' size='large' style={{width: 350, height: 50, marginTop: 30}}>
              Let's make magic happen!
            </Button>
          </div>
          </>}

          {loading && <><h1 className="animate__bounceIn" style={{fontSize: 25}}>
            <Spin size="large" style={{marginRight: 10}} /> Generating AI Content...
          </h1>
          </>}

          {step === 2 && <><h1 className="animate__bounceIn" style={{fontSize: 25, color: 'lime'}}>
            Success!
          </h1>
          <div className="animate__bounceInUp" style={{animationDelay: '0s'}}>
            <Button  onClick={onContinue} type='primary' size='large' style={{width: 350, height: 50, marginTop: 30}}>
              Continue
            </Button>
          </div>
          </>}
          
        </Flex>
        {/* onboardingData: {JSON.stringify(onboardingData)} <br /> */}
        {localStorage.getItem("dev") === "true" && 
        // Dev only here
        <><Button onClick={getResponseFromGPT}>
            getResponseFromGPT()
        </Button>
        <br />
        <br />
        onboardingData: {JSON.stringify(onboardingData)}
        <br />

        {error && <div style={{color: 'red', fontSize: 20}}>ERROR: {error}</div>}

        <h1>AI generated these labels:</h1>

        

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
        </b></>}
    </> );
}

function getSiteData({LawFirmName, LawyerDetails, ClientReviews}: Questionnaire, {HeroSection, PracticeAreas, ValuesPage, AboutUsPage}: any) {
  
  // 1. Nav bar
  // 2. Hero section - name & 1-2 sentence description
  // 3. Practice areas
  // 4. Their values
  // 5. The team
  // 6. Reviews and testimonials
  // 7. Contact us form / CTA

  return [
    // 1. Nav bar = QUESTION 1
    {
      section_id: v4(),
      template_id: 'TNavBar1',
      name: LawFirmName,
    },
    // 2. Hero section = GENERATED
    {
      section_id: v4(),
      template_id: 'THero1',
      heading: HeroSection["headline"],
      subHeading: HeroSection["sub-headline"],
    },
    // 3. Practice areas = GENERATED
    {
      section_id: v4(),
      template_id: 'TPracticeAreas1',
      areasList: PracticeAreas,
    },
    // 4. Their values = GENERATED 
    {
      section_id: v4(),
      template_id: 'TValues1',
      description: ValuesPage["pageDescription"],
      valuesList: ValuesPage["values"],
    },
    // 5. The team = QUESTION 9
    {
      section_id: v4(),
      template_id: 'TTeam1',
      lawyerDetails: LawyerDetails?.split(";")
    },
    // 6. Reviews and testimonials = GENERATED
    {
      section_id: v4(),
      template_id: 'TReviews1',
      reviews: ClientReviews?.split(";"),
    },
    // 7. About us = GENERATED
    {
      section_id: v4(),
      template_id: 'TAbout1',
      paragraph: AboutUsPage["paragraph"]
    },
    // 7. Contact us form / CTA = NO DATA
    {
      section_id: v4(),
      template_id: 'TContact3',
    },
  ]
}

export default Generate;