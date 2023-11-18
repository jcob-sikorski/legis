import * as Realm from "realm-web";
import { useNavigate, useParams } from 'react-router-dom';
import { config } from "../../../config";
import { useEffect, useState } from "react";
import { Button, Flex, Spin } from "antd";

import OpenAI from 'openai';
import { function_description } from "./functionDescription";
import { getOnboardingData } from "./getOnboardingData";
import Questionnaire from "../../../models/Questionnaire";

import { v4 } from "uuid";

import 'animate.css';
import { useApp } from "../../RealmApp";

console.log("Before running new OpenAI: config.abc: ", config.abc);
console.log("Before running new OpenAI: config ", config);

const openai = new OpenAI({
    apiKey: config.abc,
    organization: config.openaiOrg,
    dangerouslyAllowBrowser: true,
});

function Generate() {
  const {site_id, onboarding} = useParams();
  
  const [onboardingData, setOnboardingData] = useState<any>();
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(); 
  const [textIndex, setTextIndex] = useState(0);

  const waitingRoomTexts = [
    'Spinning the Magic...',
    'Brewing Awesomeness...',
    'Stirring the Creativity...',
    'Cooking up Brilliance...',
    'Shaping Wonders...',
    'Dancing with Ideas...',
    'Whipping up Wonderment...',
    'Sprinkling Stardust...',
    'Crafting Dreams...',
    'Juggling Innovation...',
    'Painting Pixel Perfection...',
    'Mastering the Art of Fun...',
    'Tickling the Imagination...',
    'Weaving Digital Delight...',
    'Sculpting Smiles...',
    'Building Blocks of Joy...',
    'Blending Laughter and Code...',
    'Mixing Tech and Play...',
    'Sculpting the Future...',
    'Waltzing with Innovation...',
  ];

  const navigate = useNavigate();

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const onboarding_collection = mongodb.db("legis").collection("Questionnaire");    
  const site_collection = mongodb.db("legis").collection("Site");

  useEffect(() => {
    console.log("Fetching the survey data from mongo.");
    async function fetchOnboardingData() {
      try {
        const result = await onboarding_collection.find({ site_id: new Realm.BSON.ObjectId(site_id) });
        const data = result.length > 0 ? result[0] : {};
        setOnboardingData(data);
      } catch (error) {
        console.error("Error fetching for Questionnaire data for this site:", error);
      }
    }
    fetchOnboardingData();
  }, []);

  async function getResponseFromGPT() {
    const systemPrompt = "You’re the expert at designing sleek, professional, high-end, easy to read and very short text for legal firm website. Design one and provide the JSON of the following structure:"
    const userPrompt = getOnboardingData(onboardingData);

    console.log("userPrompt: ", userPrompt);

    setLoading(true);
    await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
      model: 'gpt-3.5-turbo-1106',
      tools: function_description,
      tool_choice: {"type": "function", "function": {"name": "generate_sections_text"}},
      response_format: { "type": "json_object" }
    }).then((res) => {
      // TODO safeguard from tool_calls "undefined"
      let finalContent: any = JSON.parse(res.choices[0].message.tool_calls![0].function.arguments);
      console.log("FINAL CONTENT: ", finalContent);
      setResponse(finalContent)
      setLoading(false);
        
      // generate site data value
      const siteData = getSiteData(finalContent, onboardingData);
      updateSite(siteData);
    }).catch((e) => {
      setError(JSON.stringify(e));
      console.warn(e);
    })
  }

  useEffect(() => {
    if (onboardingData) {
      getResponseFromGPT();
    }
  }, [onboardingData]);

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
        // TODO if useParams says onboardingflow == true then go to color-palette
        //        else go to editor
        if (onboarding === '1') {
          navigate(`/color-palette/${site_id}`);
        } else {
          navigate(`/editor/${site_id}`);
        }
      } catch (error) {
        console.error("Error updating site:", error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(() => Math.floor(Math.random() * waitingRoomTexts.length));
    }, 3500);
  
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);
  

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
          {loading && (
            <h1 className="animate__bounceIn" style={{ fontSize: 25 }}>
              <Spin size="large" style={{ marginRight: 10 }} /> {waitingRoomTexts[textIndex]}
            </h1>
          )}
        </Flex>
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

function getSiteData(data: any, onboardingData: Questionnaire) {
  
  const {NavBar, Hero, PracticeAreas, OurTeam, TheirValues, AboutUs} = data;
  const {ClientReviews, LawFirmName} = onboardingData

  console.log("mfmfmf: ", onboardingData);

  let reviews = [];
  try {
    reviews = JSON.parse(ClientReviews ?? "[]");
  } catch {
    alert("error parsing reviews in getSiteData.")
  }

  // 1. Nav bar
  // 2. Hero section - name & 1-2 sentence description
  // 3. Practice areas
  // 4. Their values
  // 5. The team
  // 6. Reviews and testimonials
  // 7. Contact us form / CTA

  return [
    // 1. Nav bar = QUESTION 1
    // {
    //   section_id: v4(),
    //   template_id: 'TNavBar1',
    //   name: NavBar,
    // },
    // 2. Hero section = GENERATED
    {
      section_id: v4(),
      template_id: 'LHero1',
      heading: Hero.headline,
      subHeading: Hero.subHeadline,
      logo: LawFirmName,
    },
    // 3. Practice areas = GENERATED
    {
      section_id: v4(),
      template_id: 'LPracticeAreas1',
      areasList: PracticeAreas,
    },
    // 4. Their values = GENERATED 
    {
      section_id: v4(),
      template_id: 'LValues1',
      description: TheirValues,
    },
    // 5. The team = QUESTION 9
    {
      section_id: v4(),
      template_id: 'LTeam1',
      lawyerDetails: OurTeam
    },
    // 6. Reviews and testimonials = GENERATED
    {
      section_id: v4(),
      template_id: 'LReviews2',
      reviews,
    },
    // 7. About us = GENERATED
    {
      section_id: v4(),
      template_id: 'LAbout1',
      paragraph: AboutUs
    },
    // 7. Contact us form / CTA = NO DATA
    {
      section_id: v4(),
      template_id: 'LContact3',
    },
  ]
}

export default Generate;