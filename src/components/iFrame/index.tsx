import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IFrameProps {
    children: React.ReactNode;
    style?: React.CSSProperties,
    colors?: string[]
   }
    const IFrame: React.FC<IFrameProps> = ({ children, style = {}, colors = [] }) => {
    const src = '/preview-iframe';
    const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
    
    const mountNode = contentRef?.contentWindow?.document?.body;
    const [isLoaded, setIsLoaded] = useState(false);

    function updateCSSStylesIFrame() {
        if (contentRef && colors && colors?.length > 0) {
            const iframe = contentRef;
            var innerDoc = iframe.contentDocument || iframe?.contentWindow?.document;
            try {
                innerDoc?.documentElement?.style.setProperty('--legis-color-1', `${colors[0]}`);
                innerDoc?.documentElement?.style.setProperty('--legis-color-2', `${colors[1]}`);
                innerDoc?.documentElement?.style.setProperty('--legis-color-3', `${colors[2]}`);
                innerDoc?.documentElement?.style.setProperty('--legis-font-main', `IBM Plex Sans`);
            } catch {message.error("Error loading template colors"); }
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
        if (contentRef) {
          const iframe = contentRef;
          iframe.onload = () => {
                updateCSSStylesIFrame()
                setIsLoaded(true);
            };
        }
       }, [contentRef, children, mountNode]);
    //    alert(JSON.stringify(style))
    return (
        <iframe ref={setContentRef} style={style}>
            {isLoaded ? (mountNode && ReactDOM.createPortal(children, mountNode)) : <Spin size='large' />}
        </iframe>
    );
};


export default IFrame;