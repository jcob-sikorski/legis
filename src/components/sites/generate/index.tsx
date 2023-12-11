import * as Realm from "realm-web";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";
import { useEffect, useState } from "react";
import { Button, Flex, Spin, message } from "antd";

import OpenAI from "openai";
import { function_description } from "./functionDescription";
import { getOnboardingData } from "./getOnboardingData";
import Questionnaire from "../../../models/Questionnaire";

import { v4 } from "uuid";

import "animate.css";
import { useApp } from "../../RealmApp";
import TemplateSetName from "../../../models/TemplateSetName";

const openai = new OpenAI({
  apiKey: config.openaiKey,
  organization: config.openaiOrg,
  dangerouslyAllowBrowser: true,
});

function Generate() {
  const { site_id } = useParams();

  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const [bodyTemplate, setBodyTemplate] = useState<any>([]);
  const [templateSetId, setTemplateSetId] = useState<any>([]);

  const navigate = useNavigate();

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  useEffect(() => {

    console.log("Fetching site's body_template from mongo.");
    async function fetchBodyTemplate() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({
          _id: new Realm.BSON.ObjectId(site_id),
        });

        if (result.length > 0 && result[0].hasOwnProperty("body_template")) {
          console.log(
            "Found a site with body_template:",
            result[0].body_template
          );
          setBodyTemplate(result[0].body_template);
          // tdyTemplate(setTemplateSetIdt[ssetTemplateSetId].body_template);
        } else {
          console.log("Site doesn't have the body_template yet.");
        }

        if (result.length > 0 && result[0].hasOwnProperty("template_set_id")) {
          console.log(
            "Found a site with body_template:",
            result[0].template_set_id
          );
          setTemplateSetId(result[0].template_set_id);
        } else {
          console.log("Site doesn't have the template_set_id yet.");
        }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
    }

    fetchBodyTemplate();
  }, []);

  async function getResponseFromGPT() {
    const systemPrompt =
      "You’re the expert at designing sleek, professional, high-end, easy to read and very short text for legal firm website. Design one and provide the JSON of the following structure:";
    const userPrompt = getOnboardingData();

    setLoading(true);
    await openai.chat.completions
      .create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: "gpt-3.5-turbo-1106",
        tools: function_description,
        tool_choice: {
          type: "function",
          function: { name: "generate_sections_text" },
        },
        response_format: { type: "json_object" },
      })
      .then((res) => {
        // TODO safeguard from tool_calls "undefined"
        let finalContent: any = JSON.parse(
          res.choices[0].message.tool_calls![0].function.arguments
        );
        console.log("FINAL CONTENT: ", finalContent);
        setResponse(finalContent);
        setLoading(false);

        // generate site data value

        const template_set_id = getRandomTemplateSetId({
          repeat: false,
          lastTemplateSetId: templateSetId,
        });

        const siteData = getSiteData(
          finalContent,
          bodyTemplate,
          template_set_id
        );

        updateSite(siteData, template_set_id);
      })
      .catch((e) => {
        setError(JSON.stringify(e));
        console.warn(e);
      });
  }

  useEffect(() => {
    if (onboardingData) {
      getResponseFromGPT();
    }
  }, [onboardingData]);

  const updateSite = async (data: any, template_set_id: string) => {
    console.log("Trying to upload this data: ", data);
    if (data) {
      try {
        const result = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site_id) }, // Specify the query to find the site by site_id
          {
            $set: { body_template: data, template_set_id }, // Use $set to update the data field
          }
        );

        console.log("updated template_set_id to: ", template_set_id);
        console.log("Updated site:", JSON.stringify(result));
        // TODO if useParams says onboardingflow == true then go to color-palette
        //        else go to editor
        // if (onboarding === "1") {
        //   navigate(`/showcase/${site_id}`);
        // } else {
        navigate(`/editor/${site_id}`);
        // }
      } catch (error) {
        console.error("Error updating site:", error);
      }
    }
  };

  return (
    <>
      <Flex
        vertical
        style={{
          background: "#000",
          height: "100vh",
          width: "100%",
          color: "white",
        }}
        justify="center"
        align="center"
      >
        {" "}
        {error && (
          <>
            <h1
              className="animate__bounceIn"
              style={{ fontSize: 25, color: "red" }}
            >
              An error has occured
            </h1>
            <h3>Error message:</h3>
            <div>{JSON.stringify(error)}</div>
            <div
              className="animate__bounceInUp"
              style={{ animationDelay: "0s" }}
            >
              <Button
                onClick={getResponseFromGPT}
                type="primary"
                size="large"
                style={{ width: 350, height: 50, marginTop: 30 }}
              >
                Try again
              </Button>
            </div>
          </>
        )}
        {loading && (
          <h1 className="animate__bounceIn" style={{ fontSize: 25 }}>
            <Spin size="large"/>
          </h1>
        )}
      </Flex>
      {localStorage.getItem("dev") === "true" && (
        // Dev only here
        <>
          <Button onClick={getResponseFromGPT}>getResponseFromGPT()</Button>
          <br />
          <br />
          onboardingData: {JSON.stringify(onboardingData)}
          <br />
          {error && (
            <div style={{ color: "red", fontSize: 20 }}>ERROR: {error}</div>
          )}
          <h1>AI generated these labels:</h1>
          <h2 style={{ fontWeight: 500, fontSize: 25 }}>Hero section</h2>
          <b>
            <h3>
              <span style={{ fontWeight: 300 }}>headline:</span>{" "}
              {response?.HeroSection["headline"]}
            </h3>
            <h3>
              <span style={{ fontWeight: 300 }}>sub-headline:</span>{" "}
              {response?.HeroSection["sub-headline"]}
            </h3>
          </b>
          <h2 style={{ fontWeight: 500, fontSize: 25 }}>
            Practice Areas section
          </h2>
          <b>
            <h3>
              <span style={{ fontWeight: 300 }}>pageDescription:</span>{" "}
              {response?.PracticeAreas["pageDescription"]}
            </h3>
            <h3>
              <span style={{ fontWeight: 300 }}>values:</span>{" "}
              {response?.PracticeAreas.map((x: any) => (
                <>
                  <h3 style={{ marginLeft: 40 }}>
                    title: {x?.PracticeAreaTitle}
                  </h3>
                  <h3 style={{ marginLeft: 80 }}>
                    description: {x?.PracticeAreaDescription}
                  </h3>
                  <br />
                </>
              ))}
            </h3>
          </b>
          <h2 style={{ fontWeight: 500, fontSize: 25 }}>Core Values section</h2>
          <b>
            <h3>
              <span style={{ fontWeight: 300 }}>pageDescription:</span>{" "}
              {response?.ValuesPage["pageDescription"]}
            </h3>
            <h3>
              <span style={{ fontWeight: 300 }}>values:</span>{" "}
              {response?.ValuesPage["values"]?.map((x: any) => (
                <>
                  <h3 style={{ marginLeft: 40 }}>Name: {x?.name}</h3>
                  <h3 style={{ marginLeft: 80 }}>Motto: {x?.motto}</h3>
                  <h3 style={{ marginLeft: 120 }}>
                    Description: {x?.description}
                  </h3>
                  <br />
                </>
              ))}
            </h3>
          </b>
          <h2 style={{ fontWeight: 500, fontSize: 25 }}>About Us section</h2>
          <b>
            <h3>
              <span style={{ fontWeight: 300 }}>paragraph:</span>{" "}
              {response?.AboutUsPage["paragraph"]}
            </h3>
          </b>
        </>
      )}
    </>
  );
}

function getSiteData(
  data: any,
  onboardingData: Questionnaire,
  bodyTemplate: any,
  templateSetId: string
) {
  const { Hero, PracticeAreas, OurTeam, OurValues, AboutUs } = data;

  let lawyerDetails = OurTeam;
  try {
    lawyerDetails = lawyerDetails?.map((lawyer: any, i: number) => {
      try {
        return {
          ...lawyer,
          cdnUUID: (onboardingLawyerDetails || [])[i].cdnUUID,
        };
      } catch {}
    });
  } catch {
    console.warn("error parsing lawyerDetails in getSiteData.");
  }

  // 1. Hero section - name & 1-2 sentence description
  // 2. Practice areas
  // 3. Their values
  // 4. The team
  // 5. Reviews and testimonials
  // 6. About Us
  // 7. Contact Us

  if (templateSetId === "Stellar")
    return [
      // {
      //   section_id: v4(),
      //   template_id: "nav",
      //   logo: LawFirmName,
      //   buttonLabel: "Contact Us",
      //   buttonLink: "#contact-us",
      // },
      // 1. Hero
      {
        section_id: v4(),
        template_id: "LHero1",
        heading: Hero.headline,
        subHeading: Hero.subHeadline,
        logo: LawFirmName,
        buttonLabel: "REGISTER",
        buttonLink: "https://legis.live",
      },
      // 2. Practice areas
      {
        section_id: v4(),
        template_id: "LPracticeAreas2",
        areasList: PracticeAreas,
        title: "Practice Areas",
      },
      // 3. Values
      {
        section_id: v4(),
        template_id: "LValues2",
        // description: OurValues,
        valuesList: OurValues,
        superTitle: "Find out about...",
        title: "Our Values",
      },
      // 4. Team
      {
        section_id: v4(),
        template_id: "LTeam1",
        lawyerDetails,
        superTitle: "Learn more about...",
        title: "Our Team",
      },
      // 5. Reviews
      {
        section_id: v4(),
        template_id: "LReviews2",
        reviews,
        title: "Testimonials",
      },
      // 6. About
      {
        section_id: v4(),
        template_id: "LAbout1",
        paragraph: AboutUs,
        title: "About Us",
      },
      // 7. Contact Us form / CTA = NO DATA
      {
        section_id: v4(),
        template_id: "LContact1",
        title: "Contact Us",
        paragraph: "[LOREM IPSUM GENERATED HERE/DEV NEEDS TO REPLACE THIS!!!]",
        email: "example@example.com",
        phone: "1-234-567-890",
        address: "Address, A1 234BC",
        buttonLabel: "Send Message",
        buttonLink: "https://legis.live",
      },
      // {
      //   section_id: v4(),
      //   template_id: "footer",
      //   logo: LawFirmName,
      //   buttonLabel: "Contact Us",
      //   buttonLink: "#contact-us",
      // },
    ];

  if (templateSetId === "SolidState")
    return [
      // {
      //   section_id: v4(),
      //   template_id: "nav",
      //   logo: LawFirmName,
      //   buttonLabel: "Contact Us",
      //   buttonLink: "#contact-us",
      // },
      // 1. Hero
      {
        section_id: v4(),
        template_id: "LHero1",
        heading: Hero.headline,
        subHeading: Hero.subHeadline,
        logo: LawFirmName,
        buttonLabel: "REGISTER",
        buttonLink: "https://legis.live",
      },
      // 2. Practice areas
      {
        section_id: v4(),
        template_id: "LPracticeAreas2",
        areasList: PracticeAreas,
        title: "Practice Areas",
      },
      // 3. Values
      {
        section_id: v4(),
        template_id: "LValues2",
        // description: OurValues,
        valuesList: OurValues,
        superTitle: "Find out about...",
        title: "Our Values",
      },
      // 4. Team
      {
        section_id: v4(),
        template_id: "LTeam1",
        lawyerDetails,
        superTitle: "Learn more about...",
        title: "Our Team",
      },
      // 5. Reviews
      {
        section_id: v4(),
        template_id: "LReviews2",
        reviews,
        title: "Testimonials",
      },
      // 6. About
      {
        section_id: v4(),
        template_id: "LAbout1",
        paragraph: AboutUs,
        title: "About Us",
      },
      // 7. Contact Us form / CTA = NO DATA
      {
        section_id: v4(),
        template_id: "LContact1",
        title: "Contact Us",
        paragraph: "[LOREM IPSUM GENERATED HERE/DEV NEEDS TO REPLACE THIS!!!]",
        email: "example@example.com",
        phone: "1-234-567-890",
        address: "Address, A1 234BC",
        buttonLabel: "Send Message",
        buttonLink: "https://legis.live",
      },
      // {
      //   section_id: v4(),
      //   template_id: "footer",
      //   logo: LawFirmName,
      //   buttonLabel: "Contact Us",
      //   buttonLink: "#contact-us",
      // },
    ];

  if (templateSetId === "ParadigmShift")
    return [
      {
        section_id: v4(),
        template_id: "nav",
        logo: LawFirmName,
        buttonLabel: "Contact Us",
        buttonLink: "#contact-us",
      },
      // 1. Hero
      {
        section_id: v4(),
        template_id: "LHero1",
        heading: Hero.headline,
        subHeading: Hero.subHeadline,
        logo: LawFirmName,
        buttonLabel: "REGISTER",
        buttonLink: "https://legis.live",
      },
      // 2. Practice areas
      {
        section_id: v4(),
        template_id: "LPracticeAreas2",
        areasList: PracticeAreas,
        title: "Practice Areas",
      },
      // 3. Values
      {
        section_id: v4(),
        template_id: "LValues2",
        // description: OurValues,
        valuesList: OurValues,
        superTitle: "Find out about...",
        title: "Our Values",
      },
      // 4. Team
      {
        section_id: v4(),
        template_id: "LTeam1",
        lawyerDetails,
        superTitle: "Learn more about...",
        title: "Our Team",
      },
      // 5. Reviews
      {
        section_id: v4(),
        template_id: "LReviews2",
        reviews,
        title: "Testimonials",
      },
      // 6. About
      {
        section_id: v4(),
        template_id: "LAbout1",
        paragraph: AboutUs,
        title: "About Us",
      },
      // 7. Contact Us form / CTA = NO DATA
      {
        section_id: v4(),
        template_id: "LContact1",
        title: "Contact Us",
        paragraph: "[LOREM IPSUM GENERATED HERE/DEV NEEDS TO REPLACE THIS!!!]",
        email: "example@example.com",
        phone: "1-234-567-890",
        address: "Address, A1 234BC",
        buttonLabel: "Send Message",
        buttonLink: "https://legis.live",
      },
      // {
      //   section_id: v4(),
      //   template_id: "footer",
      //   logo: LawFirmName,
      //   buttonLabel: "Contact Us",
      //   buttonLink: "#contact-us",
      // },
    ];

  // if (bodyTemplate?.length > 0) {
  //   arr = arr.map((section: any, i: number) =>
  //     i < bodyTemplate?.length
  //       ? { ...section, template_id: bodyTemplate[i].template_id }
  //       : section
  //   );
  // }

  return [
    // {
    //   section_id: v4(),
    //   template_id: "nav",
    //   logo: LawFirmName,
    //   buttonLabel: "Contact Us",
    //   buttonLink: "#contact-us",
    // },
    // 1. Hero
    {
      section_id: v4(),
      template_id: "LHero1",
      heading: Hero.headline,
      subHeading: Hero.subHeadline,
      logo: LawFirmName,
      buttonLabel: "REGISTER",
      buttonLink: "https://legis.live",
    },
    // 2. Practice areas
    {
      section_id: v4(),
      template_id: "LPracticeAreas2",
      areasList: PracticeAreas,
      title: "Practice Areas",
    },
    // 3. Values
    {
      section_id: v4(),
      template_id: "LValues2",
      // description: OurValues,
      valuesList: OurValues,
      superTitle: "Find out about...",
      title: "Our Values",
    },
    // 4. Team
    {
      section_id: v4(),
      template_id: "LTeam1",
      lawyerDetails,
      superTitle: "Learn more about...",
      title: "Our Team",
    },
    // 5. Reviews
    {
      section_id: v4(),
      template_id: "LReviews2",
      reviews,
      title: "Testimonials",
    },
    // 6. About
    {
      section_id: v4(),
      template_id: "LAbout1",
      paragraph: AboutUs,
      title: "About Us",
    },
    // 7. Contact Us form / CTA = NO DATA
    {
      section_id: v4(),
      template_id: "LContact1",
      title: "Contact Us",
      paragraph: "[LOREM IPSUM GENERATED HERE/DEV NEEDS TO REPLACE THIS!!!]",
      email: "example@example.com",
      phone: "1-234-567-890",
      address: "Address, A1 234BC",
      buttonLabel: "Send Message",
      buttonLink: "https://legis.live",
    },
    // {
    //   section_id: v4(),
    //   template_id: "footer",
    //   logo: LawFirmName,
    //   buttonLabel: "Contact Us",
    //   buttonLink: "#contact-us",
    // },
  ];
}

function getRandomTemplateSetId(options: {
  repeat: boolean;
  lastTemplateSetId?: string | undefined;
}) {
  const templateIds: TemplateSetName[] = [
    "Stellar",
    "ParadigmShift",
    "SolidState",
  ];

  if (options.lastTemplateSetId) {
    // it's a rerun. get next template id in the array.
    const i = templateIds?.indexOf(options.lastTemplateSetId as any);
    return templateIds[(i + 1) % templateIds.length];
  } else {
    let randomIndex = Math.floor(Math.random() * templateIds.length);
    return templateIds[randomIndex];
  }

  if (localStorage.getItem("legisTemplateSetId") === "ParadigmShift") {
    localStorage.setItem("legisTemplateSetId", "SolidState");
    return "SolidState";
  } else {
    localStorage.setItem("legisTemplateSetId", "ParadigmShift");
    return "ParadigmShift";
  }

  if (options?.repeat == false) {
    let randomIndex = Math.floor(Math.random() * templateIds.length);
    let previousIndexes = [];
    try {
      previousIndexes = JSON.parse(
        localStorage.getItem("legisUsedIndexes") ?? "[]"
      );
    } catch {}

    if (previousIndexes.indexOf(randomIndex) > -1) {
      localStorage.setItem(
        "legisUsedIndexes",
        JSON.stringify([...previousIndexes, randomIndex])
      );
    }
    message.info("asd");
  } else {
    let randomIndex = Math.floor(Math.random() * templateIds.length);
    return templateIds[randomIndex];
  }
}

function getRegeneratedSiteData(
  aiData: any,
  onboardingData: Questionnaire,
  bodyTemplateProps: any[]
) {
  const { NavBar, Hero, PracticeAreas, OurTeam, OurValues, AboutUs } = aiData;
  const {
    ClientReviews,
    LawFirmName,
    LawyerDetails: LawyerDetailsJSON,
  } = onboardingData;
  let bodyTemplate = [...bodyTemplateProps];
  console.log("getSiteData.onboardingData: ", onboardingData);
  console.log("getSiteData.bodyTemplate: ", bodyTemplate);

  let reviews = [];
  try {
    reviews = JSON.parse(ClientReviews || "[]");
  } catch {
    console.warn("error parsing reviews in getSiteData.");
  }

  let lawyerDetails = OurTeam;
  try {
    const onboardingLawyerDetails: any = JSON.parse(LawyerDetailsJSON || "[]");
    lawyerDetails = lawyerDetails?.map((lawyer: any, i: number) => {
      try {
        return {
          ...lawyer,
          cdnUUID: (onboardingLawyerDetails || [])[i].cdnUUID,
        };
      } catch {}
    });
  } catch {
    console.warn("error parsing lawyerDetails in getSiteData.");
  }

  // 1. Hero section - name & 1-2 sentence description
  // 2. Practice areas
  // 3. Their values
  // 4. The team
  // 5. Reviews and testimonials
  // 6. About Us
  // 7. Contact Us

  console.log("OK 1");
  // Here include ONLY generated values, OMIT predefined values coz they never changed or if they changed the user wants to keep them changed.
  let generatedMap: { [key: string]: object } = {
    // 1. Hero
    hero: {
      heading: Hero.headline,
      subHeading: Hero.subHeadline,
      logo: LawFirmName,
    },
    // 2. Practice areas
    practice: {
      areasList: PracticeAreas,
    },
    // 3. Values
    values: {
      valuesList: OurValues,
    },
    // 4. Team
    team: {
      lawyerDetails,
    },
    // 5. Reviews
    // nothing to generate here
    // 6. About Us
    about: {
      paragraph: AboutUs,
    },
    // 7. Contact Us
    // nothing to generate here
  };

  console.log("OK 2");
  console.log("OK 2.0", bodyTemplate);
  Object.keys(generatedMap)?.map((key: string) => {
    bodyTemplate = bodyTemplate?.map((section: any) => {
      if (section?.template_id?.indexOf(key) > -1) {
        return { ...section, ...generatedMap[key] };
      } else return section;
    });
    console.log("OK 3.0 ", bodyTemplate);
  });
  console.log("OK 3");

  console.log("Hey generated: ", bodyTemplate);
  return bodyTemplate;

  // return arr;
}

export default Generate;
