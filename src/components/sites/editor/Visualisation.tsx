import { Button, Flex, Layout, Space, message } from "antd";
import { RIGHT_BAR_WIDTH } from "./const";

// Templates
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyFilled,
  DeleteFilled,
  EditFilled,
  EditOutlined,
} from "@ant-design/icons";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { contains, updateCssStyles } from "../../../utils";
// import SHero2 from '../skeletons/SHero2';
import Hyperspace from "../skeletons/Hyperspace";
import TemplateSetName from "../../../models/TemplateSetName";
import SolidState from "../skeletons/SolidState";
import ParadigmShift from "../skeletons/ParadigmShift";
import Stellar from "../skeletons/Stellar";
import Story from "../skeletons/Story";
// import { delay } from '../../../utils';

//const { Content, Footer } = Layout;

function Visualisation({
  data = [], // if anything arrives here in this data prop it's already "sanitized" and is an object structure. NOT a JSON! (You can access its values like data?.email or data?.phone, etc., but you can't change it here)
  functions = {},
  variables = {},
  mode = "",
  template_set_id = "Hyperspace",
}: {
  data: any;
  functions?: any;
  variables?: any;
  mode?: string;
  template_set_id?: TemplateSetName | string;
}) {
  const {
    onAddSection,
    checkIfNoSections,
    setSelectedSectionId,
    setSelectedTemplateId,
    setData,
    setContext,
  } =
    mode === "showcase" || mode === "preview"
      ? {
          onAddSection: () => {},
          checkIfNoSections: () => {},
          setSelectedSectionId: () => {},
          setSelectedTemplateId: () => {},
          setData: () => {},
          setContext: () => {},
        }
      : functions;
  const {
    selectedSectionId,
    selectedTemplateId,
    isDevMode,
    isDeploying,
    dummyRef,
    containerRef,
    colors,
  } =
    mode === "showcase" || mode === "preview"
      ? {
          selectedSectionId: "",
          selectedTemplateId: "",
          isDevMode: false,
          isDeploying: true,
          dummyRef: null,
          containerRef: null,
          colors: [],
        }
      : variables;

  const [removedSectionId, setRemovedSectionId] = useState<string>("");
  const [followedSectionId, setFollowedSectionId] = useState<string>("");
  const [followingDirection, setFollowingDirection] = useState<"up" | "down">(
    "down"
  );
  const [followingCount, setFollowingCount] = useState<number>(0);

  if (mode === "preview") {
    document.documentElement.style.setProperty("--legis-editable-outline", `0`);
  }

  useEffect(() => {
    // alert(containerRef.current);
    var wrapper = document.getElementById("wrapper-" + followedSectionId);
    // alert("containerRef.current " + element.offsetTop)
    if (wrapper) {
      // var height = element.offsetHeight * followingDirection;
      // if (followingDirection === 'down') {
      //     const y = element.getBoundingClientRect().top + containerRef.current.pro - 10;
      //     element.scrollTo({ behavior: 'smooth', top: y });
      // }
      // var wrapper = document.getElementById('wrapper-' + containerRef.current.section_id);
      // var element = document.getElementById('section-' + containerRef.current.section_id);
      const yAfterMoving = wrapper.offsetTop;
      const clientHeight = window.innerHeight;
      const wrapperHeight = wrapper.getBoundingClientRect().height;
      const betweenHeight = clientHeight - wrapperHeight;
      const finalY = yAfterMoving - betweenHeight * 0.5 * 4; // might need to make more precise later
      // *
      // (followingDirection === "up" ? 1 : -1);

      // containerRef.current.scrollTo({top: finalY, behavior: 'smooth'})
      console.log("yAfterMoving: ", yAfterMoving);
      console.log("clientHeight: ", clientHeight);
      console.log("betweenHeight: ", betweenHeight);
      // alert("yAfterMoving " + yAfterMoving);
    }
  }, [followedSectionId, followingCount]);

  const hasNoSections = checkIfNoSections();

  function scrollToSection(section: any) {
    setFollowedSectionId(section.section_id);
    setFollowingCount(followingCount + 1);
  }

  async function onSectionClick(section: any) {
    // setContext({});

    setSelectedSectionId((_: string) => section.section_id);
    setSelectedTemplateId((_: string) => section.template_id);

    scrollToSection(section);
  }

  async function onSectionDuplicate(sectionToDuplicate: any) {
    if (data?.length > 0) {
      let newData: any[] = [];
      data?.map((section: any) => {
        newData.push(section);
        if (section.section_id === sectionToDuplicate.section_id) {
          newData.push({
            ...sectionToDuplicate,
            section_id: v4(),
          });
        }
      });
      setData(newData);
      scrollToSection(sectionToDuplicate);
    }
  }

  async function onSectionDelete(sectionToDelete: any) {
    if (data?.length > 0) {
      setData(
        data?.filter(
          (section: any) => section.section_id !== sectionToDelete.section_id
        )
      );
    }
  }

  async function onSectionMove(sectionToMove: any, direction: "up" | "down") {
    let d: any[] = JSON.parse(JSON.stringify(data));
    if (data?.length > 1) {
      const sectionIds: any[] = data?.map((s: any) => s.section_id);
      const selectedSectionIndex = sectionIds.indexOf(sectionToMove.section_id);

      let destinationIndex;
      if (direction === "up") {
        destinationIndex =
          selectedSectionIndex > 0 ? selectedSectionIndex - 1 : 0;
      } else {
        destinationIndex =
          selectedSectionIndex < data.length - 1
            ? selectedSectionIndex + 1
            : data.length - 1;
      }

      // Swap elements places
      [d[destinationIndex], d[selectedSectionIndex]] = [
        d[selectedSectionIndex],
        d[destinationIndex],
      ];

      setData(d);

      scrollToSection(sectionToMove);
      // setFollowedSectionId(sectionToMove.section_id);
      // setFollowingDirection(direction);
      // setFollowingCount(followingCount + 1);

      // containerRef.current.scrollBy({ top: -500, behavior: 'smooth' });
      // window.scrollBy({ top: 500, behavior: 'smooth' });
    }
  }

  function switchTemplate(data: any) {
    const template_id = data?.template_id.toLowerCase();

    const setContextMiddleware = (obj: any) => {
      setContext({ ...obj, section_id: data?.section_id });
    };
    // message.info('switching ' + template_set_id + ' | ' + template_id)

    // switch (template_set_id) {
    // Hero
    // case "Hyperspace": {

    const sectionHelperNames = [
      "nav",
      "hero",
      "practice",
      "values",
      "team",
      "reviews",
      "contact",
      "footer",
    ];

    let res = <>No section matched.</>;
    sectionHelperNames.map((sectionName: string) => {
      if (contains(template_id, sectionName)) {
        switch (template_set_id) {
          default:
          case "Hyperspace":
            res = (
              <Hyperspace
                template_id={template_id}
                data={data}
                setContext={setContextMiddleware}
              />
            );
            break;
          case "ParadigmShift":
            res = (
              <ParadigmShift
                template_id={template_id}
                data={data}
                setContext={setContextMiddleware}
              />
            );
            break;
          case "SolidState":
            res = (
              <SolidState
                template_id={template_id}
                data={data}
                setContext={setContextMiddleware}
              />
            );
            break;
          case "Stellar":
            res = (
              <Stellar
                template_id={template_id}
                data={data}
                setContext={setContextMiddleware}
              />
            );
            break;
          case "Story":
            res = (
              <Story
                template_id={template_id}
                data={data}
                setContext={setContextMiddleware}
              />
            );
            break;
        }
      }
    });

    return res;
  }

  const selectedSectionStyle = isDeploying
    ? {}
    : { outline: "4px dotted #0000ff77", outlineOffset: "-2px" };

  const contentStyle: any = isDeploying
    ? {}
    : {
        // position: 'absolute',
        // minHeight: '100vh',
        // top: 0,
        // margin: '24px 12px 0',
        // overflow: 'initial',
        width: "100%",
        // transform: 'scale(1)',
        // marginLeft: 'calc(-50% - 10px)',
        // transformOrigin: 'top',
        scroll: "smooth",
      };

  function calculateScale() {
    var viewportWidth = window.innerWidth;
    if (viewportWidth >= 1600) {
      let newVal = 1 + 0.5 * ((viewportWidth - 1600) / (2000 - 1600));
      console.log("newVal: ", newVal);
      if (newVal > 1.5) return 1.5;
      else return newVal;
      return;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vw-scale",
      `${calculateScale()}`
    );
  }, []);

  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
      "--vw-scale",
      `${calculateScale()}`
    );
  });

  useEffect(() => {
    if (colors?.length > 0) {
      updateCssStyles(colors);
    }
  }, [colors]);

  const layoutStyle =
    isDeploying || mode === "preview"
      ? { marginInline: "auto", scroll: "smooth" }
      : {
          // background: '#f00',
          // padding: 10,
          // minHeight: '100vh',
          // transform: 'scale(var(--vw-scale))',
          // transformOrigin: 'top',
          // width: '100vw',
        };

  return (
    <Layout className="site-layout" style={layoutStyle} ref={containerRef}>
      <Flex style={contentStyle} vertical>
        {isDevMode && !isDeploying && (
          <>
            [selectedSectionId]: {selectedSectionId}
            <br />
            [selectedTemplateId]: {selectedTemplateId}
            <br />
          </>
        )}
        {data &&
          data.map((s: any) => (
            <div
              className={`hover-parent ${
                s.section_id === removedSectionId ? "animate__bounceOut" : ""
              }`}
              key={s.section_id}
              id={"wrapper-" + s.section_id}
              onClick={() => (mode === "showcase" ? {} : onSectionClick(s))}
              style={{
                position: "relative",
                opacity: 1,
                ...(selectedSectionId === s.section_id
                  ? selectedSectionStyle
                  : {}),
              }}
            >
              {!isDeploying && (
                <div
                  className="hover-child"
                  style={{
                    background: "#fff",
                    width: "",
                    right: 0,
                    padding: 4,
                    borderRadius: 4,
                    marginTop: 8,
                    marginRight: 8,
                    position: "absolute",
                    top: 0,
                    zIndex: 1000,

                    // width: 100,
                  }}
                >
                  {[
                    {
                      label: "Duplicate section",
                      icon: <CopyFilled />,
                      onClick: () => onSectionDuplicate(s),
                    },
                    {
                      label: "Move section up",
                      icon: <ArrowUpOutlined />,
                      onClick: () => onSectionMove(s, "up"),
                    },
                    {
                      label: "Move section down",
                      icon: <ArrowDownOutlined />,
                      onClick: () => onSectionMove(s, "down"),
                    },
                    // {
                    //     label: 'Edit section',
                    //     icon: <EditFilled />,
                    //     onClick: () => onSectionClick(s),
                    // },
                    {
                      label: "Delete section",
                      icon: <DeleteFilled />,
                      onClick: () => onSectionDelete(s),
                    },
                  ].map(({ label, icon, onClick }) => (
                    <Button
                      className="legis-sections-button"
                      style={{
                        all: "unset",
                        borderColor: "#0000",
                        cursor: "pointer",
                        paddingInline: 6,
                        outline: 0,
                      }}
                      title={label}
                      icon={icon}
                      onClick={onClick}
                    />
                  ))}
                </div>
              )}
              {isDevMode && (
                <>
                  [section_id]: {s.section_id}
                  [template_id]: {s.template_id}
                </>
              )}
              {switchTemplate(s)}
            </div>
          ))}
        {switchTemplate({ template_id: "footer" })}
        <div id="editor-dummy" ref={dummyRef} />
      </Flex>
      {/* {!isDeploying &&
    <Flex align='center' justify='center' style={{minHeight: hasNoSections ? '360px' : '100px'}}>
        <Title style={{cursor:'pointer'}} onClick={onAddSection}>+ New section</Title>
    </Flex>
    } */}
      {/* <Footer style={{ textAlign: 'center' }}>Generated with Legis &middot; 2023</Footer> */}
    </Layout>
  );
}

export default Visualisation;
