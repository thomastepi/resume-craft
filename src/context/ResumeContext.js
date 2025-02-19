import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [generatedHTML, setGeneratedHTML] = useState(null);
  const [isCVGenerated, setIsCVGenerated] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ResumeContext.Provider
      value={{
        generatedHTML,
        setGeneratedHTML,
        isCVGenerated,
        setIsCVGenerated,
        isPrinting,
        setIsPrinting,
        loading,
        setLoading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
