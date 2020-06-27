import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const PDFViewer = ({ route, navigation }) => {
  const { uri } = route.params;
  return (
    <PDFReader
      source={{
        uri,
      }}
      style={{ width, height }}
    />
  );
};

export default PDFViewer;
