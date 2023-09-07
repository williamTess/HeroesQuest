import React from "react";

const readFile = (file: Blob): FileReader | null => {
  const reader = new FileReader();

  if (!file) return null;

  reader.readAsText(file);
  reader.onerror = () => {
    alert("error");
  };

  return reader;
};

export default readFile;
