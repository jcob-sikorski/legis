import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Flex, Layout, Row, Input, message } from "antd";
import {
  RIGHT_BAR_WIDTH,
  DEV_START_JSON,
  NAV_BAR_HEIGHT,
  LEFT_BAR_WIDTH,
} from "./const";

// Window Components
import Interface from "./Interface";
import Visualisation from "./Visualisation";
import { useParams, useNavigate } from "react-router-dom";
import ChooseTemplateModal from "./modals/ChooseTemplateModal";

import ReactDOMServer from "react-dom/server";

import { v4 as uuidv4 } from "uuid";

import * as Realm from "realm-web";

import "./index.css";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
  EyeFilled,
  EyeOutlined,
  MobileFilled,
  MobileOutlined,
  RedoOutlined,
  SettingOutlined
} from "@ant-design/icons";
import Sections from "./Sections";
import {
  updateCssStyles,
} from "../../../utils";
import MainMenu from "../menu";
import { useApp } from "../../RealmApp";
import Logo from "../menu/Logo";
import { FieldContext } from "../../../models";
import { getOnboardingData } from "../generate/getOnboardingData";
import Questionnaire from "../../../models/Questionnaire";
import MobilePreviewModal from "./modals/MobilePreviewModal";
import Site from "../../../models/Site";

import { useDispatch } from "react-redux";
import { setSite } from "../../../redux/actions";
import IFrame from "../../iFrame";

// CSS for template sets... in the future can be loaded by React Lazy or imported from cloud to improve performance
import HyperspaceCSS from "../skeletons/Hyperspace/assets/css/main.css?inline";
import ParadigmShiftCSS from "../skeletons/ParadigmShift/assets/css/main.css?inline";
import SolidStateCSS from "../skeletons/SolidState/assets/css/main.css?inline";
import StellarCSS from "../skeletons/Stellar/assets/css/main.css?inline";
import StoryCSS from "../skeletons/Story/assets/css/main.css?inline";

import TemplateSetName from "../../../models/TemplateSetName";

const Editor: React.FC = () => {
  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const onboarding_collection = mongodb.db("legis").collection("Questionnaire");
  const site_collection = mongodb.db("legis").collection("Site");

  const dispatch = useDispatch();

  const { site_id } = useParams();
  console.warn("site_id editor", site_id);

  const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState<any[]>([]);

  const [lawFirmName, setLawFirmName] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const [templateSetId, setTemplateSetId] = useState<string>("");
  const [siteTitle, setSiteTitle] = useState<string>();

  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const [cssString, setCssString] = useState<string>("");

  const [isAddingNewSection, setIsAddingNewSection] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [isDevMode, setIsDevMode] = useState<boolean>(false);

  const [context, setContext] = useState<FieldContext>();

  const dummyRef = useRef<any>(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  function processJson(json: string) {
    // If is able to parse json, then parse it and set to data. If not, display error in console, but don't crash app.
    try {
      setData(JSON.parse(json));
    } catch {
      console.warn("Custom Error: JSON Formatting Error!");
    }
  }

  useEffect(() => {
    switch (templateSetId as any) {
      default:
      case "Hyperspace":
        setCssString(HyperspaceCSS);
        break;
      case "ParadigmShift":
        setCssString(ParadigmShiftCSS);
        break;
      case "SolidState":
        setCssString(SolidStateCSS);
        break;
      case "Stellar":
        setCssString(StellarCSS);
        break;
      case "Story":
        setCssString(StoryCSS);
        break;
    }
  }, [templateSetId]);

  // shared functions

  function onAddSection() {
    setIsAddingNewSection(true);
  }

  function onTemplateSelected(template_id: string) {
    const section_id = uuidv4();
    setData([
      ...data,
      {
        template_id,
        section_id,
      },
    ]);
    setSelectedSectionId(section_id);
    setSelectedTemplateId(template_id);
    dummyRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    // scrollToElement(section_id);
  }

  function checkIfNoSections() {
    return data && data.length === 0;
  }

  function onMobile() {
    setIsMobile((state) => !state);
    // window.open(`/preview/${site_id}`, '', 'width=410,height=700');
  }

  function onGenerate() {
    // navigate to /generate
    navigate(`/generate/${site_id}/0`); // (overwrites only template_body field)

    // create useParams hook to know from where the request goes from onboarding or from editor?
    // if onboarding then to color pallete
    //  else go to editor (color pallete is already saved in mongodb)

    // selected during survey
    const surveyData: any = {
      templateIds: ["THero1", "TContact3", "TContact2"],
      lawyerField: "Real Estate",
    };
    // getPromptForGeneration(surveyData);
  }

  useEffect(() => {
    if (colors?.length > 0) {
      updateCssStyles(colors);
    }
  }, [colors]);

  useEffect(() => {
    document.title =
      "Legis | " + (siteTitle || lawFirmName || "Edit your site");
  }, [siteTitle]);

  async function handleSettingsButton() {
    navigate(`/settings/${site_id}`);
  }


  React.useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({
          _id: new Realm.BSON.ObjectId(site_id),
        });

        const getFromMongoDB = (fieldName: string, setter: any) => {
          if (result.length > 0 && result[0].hasOwnProperty(fieldName)) {
            console.log(
              `Found a site with ${fieldName}:`,
              result[0][fieldName]
            );
            setter(result[0][fieldName]);
          } else {
            console.log(`Site doesn't have ${fieldName} value yet.`);
          }
        };

        getFromMongoDB("body_template", setData);
        getFromMongoDB("template_colors", setColors);
        getFromMongoDB("template_set_id", setTemplateSetId);
        getFromMongoDB("title", setSiteTitle);
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
      try {
        const result = await onboarding_collection.find({
          site_id: new Realm.BSON.ObjectId(site_id),
        });
        const onboardingData: Questionnaire =
          result.length > 0 ? result[0] : {};

        setLawFirmName(onboardingData.LawFirmName);
      } catch (error) {
        console.error(
          "Error fetching for Questionnaire data for this site:",
          error
        );
      }

      try {
        const result = await site_collection.find({
          _id: new Realm.BSON.ObjectId(site_id),
        });

        if (result.length > 0 && result[0].hasOwnProperty("title")) {
          console.log(
            "Found a site with template_colors:",
            result[0].template_colors
          );
          setColors(result[0].template_colors);
        } else {
          console.log("Site doesn't have the template_colors yet.");
        }
      } catch (error) {
        console.error(
          "Error fetching for Questionnaire data for this site:",
          error
        );
      }
    }

    getData();
  }, []); // Include site_id in the dependency array if it may change

  const updateSite = async () => {
    if (data) {
      try {
        const result = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site_id) }, // Specify the query to find the site by site_id
          {
            $set: { body_template: data }, // Use $set to update the data field
          }
        );

        console.log("Updated site:", JSON.stringify(result));
      } catch (error) {
        console.error("Error updating site:", error);
      }
    }
  };

  React.useEffect(() => {
    console.log("Pushing the site to mongo.");

    // Set a delay of 5 seconds before updating the site
    const timeoutId = setTimeout(updateSite, 5000);

    // Clear the timeout if the component is unmounted or if the data changes
    return () => clearTimeout(timeoutId);
  }, [data]);

  const sectionsComponent = <MainMenu />;

  const interfaceComponent = (
    <Interface
      setJson={setJson}
      json={json}
      data={data}
      setData={setData}
      processJson={processJson}
      functions={{
        onAddSection,
        setSelectedSectionId,
        setSelectedTemplateId,
        setIsDevMode,
        setContext,
      }}
      variables={{
        selectedSectionId,
        selectedTemplateId,
        isDevMode,
        context,
      }}
    />
  );

  const visualisationComponent = (
    <Visualisation
      template_set_id={templateSetId}
      data={data}
      functions={{
        onAddSection,
        checkIfNoSections,
        setSelectedSectionId,
        setSelectedTemplateId,
        setIsDevMode,
        setData,
        setContext,
      }}
      // setSelectedTemplateId={setSelectedTemplateId}
      variables={{
        selectedSectionId,
        selectedTemplateId,
        isDevMode,
        dummyRef,
        containerRef,
        colors,
      }}
    />
  );

  const borderStyle = "1px solid #0002";

  return (
    <Layout style={{ width: "100%", height: "calc(100vh - 46px)" }}>
      {/* <div style={{position: 'absolute', zIndex: 100, left: 150, bottom: 50, background: '#fff9', width: 200, height: 80}}> 
      MADE WITH LEGIS 
      </div> */}
      <Header
        style={{
          padding: "4px",
          paddingLeft: 0,
          zIndex: 10,
          borderBottom: borderStyle,
          width: "100%",
          background: "#f0f1f9",
          height: NAV_BAR_HEIGHT,
          position: "fixed",
        }}
      >
        <Row>
          <Col span={18}>
            <Flex justify="center" style={{ maxWidth: LEFT_BAR_WIDTH }}>
              <div style={{ marginTop: "0px", marginLeft: "-20px" }}>
                <Logo />
              </div>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex
              justify="flex-end"
              align="center"
              className="bg-red-500x items-center h-full"
              style={{ marginTop: -4 }}
              gap={0}
            >
              {/* <Col span={6}> */}
              <Flex
                justify="flex-end"
                className="h-fullx bg-yellow-500x"
                gap={6}
              >
                <Button
                  type="primary"
                  onClick={onMobile}
                  className="custom-button"
                  icon={<MobileFilled />}
                  style={{ padding: 24, margin: 0 }}
                />
                <Button
                  type="primary"
                  onClick={onGenerate}
                  className="custom-button"
                  icon={<RedoOutlined />}
                  style={{ padding: 24, margin: 0 }}
                />
                <a href={`/preview/${site_id}`} target="_blank">
                  <Button
                    type="primary"
                    // onClick={onPreview}
                    className="custom-button"
                    icon={<EyeFilled />}
                    style={{ padding: 24, margin: 0 }}
                  />
                </a>
                <Button
                  type="primary"
                  onClick={handleSettingsButton}
                  className="custom-button"
                  icon={<SettingOutlined />}
                  style={{ padding: 24, margin: 0 }}
                />
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Layout hasSider style={{ marginTop: NAV_BAR_HEIGHT }}>
        <Layout>
          {/* Left side */}
          <Flex
            style={{
              width: LEFT_BAR_WIDTH,
              background: "#EDF3F9",
              borderRight: borderStyle,
              height: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
              maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
            }}
          >
            {sectionsComponent}
          </Flex>

          {/* Center */}
          <Flex
            id="vis"
            className="editor-scrollbar"
            ref={containerRef}
            style={{
              width: "100%",
              maxWidth: `calc(100vw - ${LEFT_BAR_WIDTH}px - ${RIGHT_BAR_WIDTH}px - 10px)`,

              // height: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
              maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,

              background: "#f9fafb",
              // background: '#f00',
              height: "100vh",
              justifyContent: "center",
              display: "flex",
              alignItems: "flex-start",
              // boxShadow: '12px 4px solid black',
              // scrollBehavior: 'smooth',
            }}
          >
            <div
              style={
                isMobile
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // width: '100%',
                      // marginTop: 20,
                      marginTop: 10,
                      border: "10px solid #555",
                      borderTopWidth: "20px",
                      borderBottomWidth: "20px",
                      borderRadius: 16,
                      height: `calc(100vh - ${NAV_BAR_HEIGHT}px - 20px)`,
                      maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
                    }
                  : {
                      outline: 0,
                      height: "100%",
                      width: "100%",
                    }
              }
            >
              <IFrame
                cssString={cssString}
                colors={colors}
                style={
                  isMobile
                    ? {
                        width: "360px",
                        // padding: 10,
                        height: "100%",
                        maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px + 0px)`,
                      }
                    : {
                        width: "100%",
                        padding: 10,
                        height: "100vh",
                        maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px + 0px)`,
                      }
                }
              >
                {visualisationComponent}
              </IFrame>
            </div>
          </Flex>
          {/* Right side */}
          <Flex
            vertical
            style={{
              width: RIGHT_BAR_WIDTH,
              background: "#EDF3F9",
              borderLeft: borderStyle,
              // position: 'fixed',
              height: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
              maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
              // maxHeight: "100vh",
              // overflowY: 'scroll',
              // overflowX: 'hidden',
              // paddingBottom: 50,
              // right: 0
            }}
          >
            {interfaceComponent}
          </Flex>
        </Layout>
        <ChooseTemplateModal
          onTemplateSelected={onTemplateSelected}
          open={isAddingNewSection}
          setOpen={setIsAddingNewSection}
        />
        {/* <MobilePreviewModal data={data} open={isMobile} setOpen={setIsMobile} /> */}
      </Layout>
    </Layout>
  );
};

export default Editor;
