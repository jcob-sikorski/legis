import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import A from "../../components/sites/skeletons/Hyperspace/assets/css/main.css?inline";
import { v4 } from "uuid";

interface IFrameProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  colors?: string[];
  cssString?: string;
}
const IFrame: React.FC<IFrameProps> = ({
  children,
  style = {},
  colors = [],
  cssString = "",
}) => {
  const src = "/preview-iframe";
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  const mountNode = contentRef?.contentWindow?.document?.body;
  const [isLoaded, setIsLoaded] = useState(false);
  const [styleNodeIds, setStyleNodeIds] = useState<string[]>([]); // node = element naming convention. These are used to clear up not needed style nodes in head of iframe.

  function updateCSSStylesIFrame() {
    if (contentRef && colors && colors?.length > 0) {
      const iframe = contentRef;
      var innerDoc = iframe.contentDocument || iframe?.contentWindow?.document;
      try {
        innerDoc?.documentElement?.style.setProperty(
          "--legis-color-1",
          `${colors[0]}`
        );
        innerDoc?.documentElement?.style.setProperty(
          "--legis-color-2",
          `${colors[1]}`
        );
        innerDoc?.documentElement?.style.setProperty(
          "--legis-color-3",
          `${colors[2]}`
        );
        innerDoc?.documentElement?.style.setProperty(
          "--legis-font-main",
          `IBM Plex Sans`
        );
      } catch {
        message.error("Error loading template colors");
      }
    }
  }

  function updateCSSString() {
    if (contentRef && cssString) {
      const iframe = contentRef;
      var innerDoc = iframe.contentDocument || iframe?.contentWindow?.document;
      try {
        const styleElement = innerDoc?.createElement("style");
        if (styleElement) {
          const newElementId = v4();
          const newStyleNodeIds = styleNodeIds
            ?.map((nodeId: string) => {
              // DELETE PREVIOUS STYLE ELEMENT
              // message.info()
              try {
                const previousStyleElement = innerDoc!.getElementById(nodeId);
                previousStyleElement!.parentNode!.removeChild(
                  previousStyleElement!
                );
                return "";
              } catch {
                // If the element was not found or couldnt be deleted keep it in array for next cleaning.
                // message.error("err deleting previous style elem.")
                return nodeId;
              }
            })
            .filter((x) => x); // remove empty strings ""
          setStyleNodeIds([...newStyleNodeIds, newElementId]);
          // CREATE NEW STYLE ELEMENT
          // setCurrentStyleElementId(newElementId);
          styleElement.id = newElementId;
          styleElement.innerHTML = cssString;
          innerDoc?.head.appendChild(styleElement);
        }
      } catch {
        message.error("Error loading css in IFrame.");
      }
    }
  }

  useEffect(() => {
    if (contentRef) {
      contentRef.src = src;
    }
  }, [contentRef, src]);

  useEffect(() => {
    if (colors && colors?.length > 0) {
      updateCSSStylesIFrame();
    }
  }, [colors]);

  useEffect(() => {
    if (cssString) {
      updateCSSString();
    }
  }, [cssString]);

  useEffect(() => {
    if (contentRef) {
      const iframe = contentRef;
      iframe.onload = () => {
        updateCSSStylesIFrame();
        updateCSSString();
        setIsLoaded(true);
      };
    }
  }, [contentRef, children, mountNode]);
  //    alert(JSON.stringify(style))
  return (
    <iframe ref={setContentRef} style={style}>
      {isLoaded ? (
        mountNode && ReactDOM.createPortal(children, mountNode)
      ) : (
        <Spin size="large" />
      )}
    </iframe>
  );
};

export default IFrame;
