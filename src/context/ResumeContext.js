import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [generatedHTML, setGeneratedHTML] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ResumeContext.Provider
      value={{
        generatedHTML,
        setGeneratedHTML,
        isGenerating,
        setIsGenerating,
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
