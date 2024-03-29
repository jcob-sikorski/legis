import { Layout, Card, Row, Col, List, Flex, Button } from "antd";
import { useApp } from "./../../RealmApp.tsx";
import { valueColorMapping } from "./colorMappings.tsx";
import { useState, useEffect } from "react";
import Visualisation from "../editor/Visualisation.tsx";
import { config } from "../../../config.tsx";
import { useNavigate, useParams } from "react-router-dom";

import * as Realm from "realm-web";
import { updateCssStyles } from "../../../utils/index.ts";
import IFrame from "../../iFrame/index.tsx";
import HyperspaceCSS from "../skeletons/Hyperspace/assets/css/main.css?inline";
import ParadigmShiftCSS from "../skeletons/ParadigmShift/assets/css/main.css?inline";
import SolidStateCSS from "../skeletons/SolidState/assets/css/main.css?inline";
import StellarCSS from "../skeletons/Stellar/assets/css/main.css?inline";
import StoryCSS from "../skeletons/Story/assets/css/main.css?inline";
const SIDE_BAR_WIDTH = 300;

function ColorPalette() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);
  const { site_id } = useParams();

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  const [data, setData] = useState<any>();
  const [templateSetId, setTemplateSetId] = useState<any>();
  const [cssString, setCssString] = useState<any>();
  const [palette, setPalette] = useState<string[]>([
    "#5D74CF",
    "#8D88C7",
    "#4D4D4D",
  ]);

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

  const groups = ["Monochromatic", "Neutral", "Bright", "Bold"];

  const renderButtonColor = (group: string, index: number) => {
    let color1 = valueColorMapping[group][index][0];
    let color2 = valueColorMapping[group][index][1];
    let color3 = valueColorMapping[group][index][2];
    return `linear-gradient(to right, ${color1} 33%, ${color2} 33%, ${color2} 66%, ${color3} 66%)`;
  };

  const getPalette = (group: string, index: number) => {
    return valueColorMapping[group][index];
  };

  const handleClick = (color: string[], index: number) => {
    setSelectedButtonIndex(index);
    setPalette(color);
    console.log("SELECTED COLOR: ", color);
  };

  useEffect(() => {
    updateCssStyles(palette);
  }, [palette]);

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
            "Found a site with template_set_id:",
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

  const navigate = useNavigate();

  async function onNext() {
    try {
      const updateResult = await site_collection.updateOne(
        { _id: new Realm.BSON.ObjectID(site_id) },
        { $set: { template_colors: palette } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);
    } catch (error) {
      console.error("Error updating document in MongoDB:", error);
    }

    navigate(`/editor/${site_id}`);
  }

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Flex
        id="visualisation-container"
        className="editor-scrollbar"
        style={{
          maxHeight: "100vh",
          overflowY: "scroll",
          justifyContent: "center",
          width: "100%",
          marginRight: SIDE_BAR_WIDTH,
        }}
      >
        {/* <div style={{
            transform: 'scale(0.7)', 
            transformOrigin: 'top'
          }}> */}
        <IFrame
          cssString={cssString}
          colors={palette}
          style={{ width: "100%", height: "100vh" }}
        >
          <Visualisation
            template_set_id={templateSetId}
            data={data}
            mode="showcase"
          />
        </IFrame>
        {/* </div> */}
      </Flex>
      <div
        style={{
          width: "100%",
          maxWidth: SIDE_BAR_WIDTH,
          position: "absolute",
          right: 0,
        }}
      >
        <List
          style={{
            flex: "1",
            // overflowY: 'scroll',
            height: "100vh",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          dataSource={groups}
          renderItem={(group, index) => (
            <Card
              title={group}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              {[...Array(2)].map((_, i) => (
                <Row gutter={16} key={i} justify={"center"}>
                  {[...Array(4)].map((_, j) => (
                    <Col key={j}>
                      <button
                        onClick={() =>
                          handleClick(
                            getPalette(group, i * 4 + j),
                            index * 10 + i * 4 + j
                          )
                        }
                        style={{
                          width: 80,
                          height: 20,
                          marginBottom: 10,
                          background: renderButtonColor(group, i * 4 + j),
                          border:
                            index * 10 + i * 4 + j === selectedButtonIndex
                              ? "thin pink"
                              : "none",
                          borderRadius: 5,
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              ))}
            </Card>
          )}
        />
        <Flex justify="center">
          <Button
            type="primary"
            onClick={onNext}
            className="custom-button"
            style={{
              // width: 100,
              height: 50,
              // right: 0,
              // position: 'absolute',
              right: 0,
              // bottom: 0
            }}
          >
            Edit your content
          </Button>
        </Flex>
      </div>
    </Layout>
  );
}

export default ColorPalette;
