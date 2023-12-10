import { faker } from "@faker-js/faker";
import "./s1.css";
import IFrame from "../../iFrame";
import { useEffect, useState } from "react";
import Visualisation from "../editor/Visualisation";

import Stellar from "./Stellar";
import StellarCSS from "./Stellar/assets/css/main.css?inline";

import SolidState from "./SolidState";
import SolidStateCSS from "./SolidState/assets/css/main.css?inline";

import Hyperspace from "./Hyperspace";
import HyperspaceCSS from "./Hyperspace/assets/css/main.css?inline";

import Story from "./Story";
import StoryCSS from "./Story/assets/css/main.css?inline";

import ParadigmShift from "./ParadigmShift";
import ParadigmShiftCSS from "./ParadigmShift/assets/css/main.css?inline";

const testData = {
  heading: "Corporate Law Experts with 10+ years experience",
  subHeading:
    "Providing exceptional services to the biggest corporations on Earth. In California. across competition law, corporate law.",
  buttonLabel: "Book a consultation",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gray_Wikipedia_Logo.jpg/715px-Gray_Wikipedia_Logo.jpg?20191209222645",
};

function Skeletons() {
  const [selectedSkeletonId, setSelectedSkeletonId] = useState("Stellar");

  const [component, setComponent] = useState<any>();
  const [cssString, setCssString] = useState<string>("");

  useEffect(() => {
    switch (selectedSkeletonId) {
      default:
      case "Stellar": {
        setComponent(<Stellar />);
        setCssString(StellarCSS);
        break;
      }
      case "SolidState": {
        setComponent(<SolidState />);
        setCssString(SolidStateCSS);
        break;
      }
      case "Hyperspace": {
        setComponent(
          <>
            {/* <Hyperspace data={{}} template_id='practice' setContext={() => {}}/> */}
            <Hyperspace data={{}} template_id="team" setContext={() => {}} />
            {/* <Hyperspace data={{}} template_id='values' setContext={() => {}}/> */}
          </>
        );
        setCssString(HyperspaceCSS);
        break;
      }
      case "Story": {
        setComponent(<Story />);
        setCssString(StoryCSS);
        break;
      }
      case "ParadigmShift": {
        setComponent(<ParadigmShift />);
        setCssString(ParadigmShiftCSS);
        break;
      }
    }
  }, [selectedSkeletonId]);

  // useEffect(() => {
  //     if (cssString) {
  //         const styleElement = document.createElement('style');
  //         styleElement.innerHTML = cssString;
  //         document.head.appendChild(styleElement);
  //     }
  // }, [cssString])

  const skeletonIds = [
    "Stellar",
    "SolidState",
    "Hyperspace",
    "Story",
    "ParadigmShift",
  ];

  return (
    <div>
      <div style={{ width: "75vw", marginInline: "auto", fontStyle: "italic" }}>
        <div>
          Skeletons:
          {skeletonIds?.map((s: any, i: number) => (
            <a
              style={{ fontWeight: selectedSkeletonId === s ? 800 : 400 }}
              href="#"
              onClick={() => setSelectedSkeletonId(s)}
            >
              {" "}
              {s}
            </a>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* SHero1 */}
        <div style={{ display: "flex" }}>
          {/* {HyperspaceCSS} */}
          <IFrame
            cssString={cssString}
            style={{
              width: "75vw",
              height: "95vh",
              marginInline: "auto",
              outline: "4px solid #99f",
            }}
          >
            {component}
            {/* <Visualisation data={[{template_id: 'LHero1'}]} mode='showcase' /> */}
          </IFrame>
          <IFrame
            cssString={cssString}
            style={{
              width: "calc(25vw - 30px)",
              maxHeight: "760px",
              height: "95vh",
              marginInline: "auto",
              outline: "4px solid #99f",
            }}
          >
            {component}
          </IFrame>
        </div>
      </div>
    </div>
  );
}

export default Skeletons;
