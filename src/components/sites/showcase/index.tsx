import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../RealmApp";
import { useEffect, useState } from "react";
import { Button, Col, Flex, Layout, Row } from "antd";
import Title from "antd/es/typography/Title";
import Visualisation from "../editor/Visualisation";
import { DEV_JSON_TO_INJECT } from "../editor/const";
import ScaledVisualisation from "../../scaledVisualisation";
import {
  getBodyTemplateFromTemplateSetId,
  switchTemplateSet,
} from "../../../utils";

import * as Realm from "realm-web";
import { config } from "../../../config";
import axios from "axios";
import { BgColorsOutlined, ReloadOutlined } from "@ant-design/icons";
import IFrame from "../../iFrame";
import HyperspaceCSS from "../skeletons/Hyperspace/assets/css/main.css?inline";
import ParadigmShiftCSS from "../skeletons/ParadigmShift/assets/css/main.css?inline";
import SolidStateCSS from "../skeletons/SolidState/assets/css/main.css?inline";
import StellarCSS from "../skeletons/Stellar/assets/css/main.css?inline";
import StoryCSS from "../skeletons/Story/assets/css/main.css?inline";

function Showcase() {
  const { site_id }: any = useParams();

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  const navigate = useNavigate();

  const [data, setData] = useState();
  const [templateSetId, setTemplateSetId] = useState();
  const [cssString, setCssString] = useState<string>("");

  useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
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
          setData(result[0].body_template);
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

    getData();
  }, []); // Include site_id in the dependency array if it may change

  // useEffect(() => {

  //   if (currentUser?.id) {
  //     // User has account! proceed to creating template
  //     navigate('/dashboard');
  //   } else {
  //     // User doesnt have an account! proceed to creating account. template_set_id is still stored in session storage.
  //     navigate('/signup');
  //   }

  // }, [app]);

  function onRegenerate() {
    navigate(`/generate/${site_id}/1`);
  }

  function onContinue() {
    navigate(`/color-palette/${site_id}`);
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

  const [mockBought, setMockBought] = useState(false);

  return (
    <Layout
      className="text-gray-800"
      style={{
        padding: 50,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex vertical className="my-5" style={{ minWidth: "500px" }}>
        <Title level={3} style={{ fontWeight: 500, textAlign: "center" }}>
          Here's your <span style={{ fontWeight: 800 }}>generated</span>{" "}
          website!
        </Title>
        <div
          style={{
            fontWeight: 500,
            textAlign: "center",
            marginTop: -12,
            marginBottom: 12,
            fontSize: 16,
          }}
        >
          Just a few last steps
        </div>
        <Row>
          <Col span={12}>
            <Button
              icon={<ReloadOutlined />}
              onClick={onRegenerate}
              type="primary"
              className="bg-black font-semibold text-lg h-12 w-100 "
              style={{ width: "100%", marginRight: 3, background: "#111" }}
            >
              Regenerate
            </Button>
          </Col>
          <Col span={12}>
            <Button
              icon={<BgColorsOutlined />}
              onClick={onContinue}
              type="primary"
              className="bg-blue-500 font-semibold text-lg h-12"
              style={{ width: "100%", marginLeft: 3 }}
            >
              Choose your colors!
            </Button>
          </Col>
        </Row>
      </Flex>
      <IFrame style={{ width: "40%", height: "100%" }} cssString={cssString}>
        <div className="animate__bounceIn">
          <ScaledVisualisation
            template_set_id={templateSetId ?? ""}
            data={data}
            mode="showcase"
            width="200vw"
            height="200vh"
          />
        </div>
      </IFrame>
    </Layout>
  );
}

export default Showcase;
