import { useEffect, useRef, useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import "../resources/styles/components/AIResumeComponent.css";

const AIResumeComponent = () => {
  const shadowHostRef = useRef(null);
  const shadowRootRef = useRef(null);

  const { generatedHTML } = useContext(ResumeContext);

  useEffect(() => {
    if (shadowHostRef.current && !shadowRootRef.current) {
      shadowRootRef.current = shadowHostRef.current.attachShadow({
        mode: "open",
      });
    }
    if (shadowRootRef.current) {
      shadowRootRef.current.innerHTML = generatedHTML;
    }
  }, [generatedHTML]);

  return <div id="shadow-host-element" className="shadow-host" ref={shadowHostRef} />;
};

export default AIResumeComponent;
