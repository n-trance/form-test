import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { Dimensions } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export interface PDFViewer {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

const PDFViewer = ({ route }: PDFViewer) => {
  const { uri } = route.params;
  return <PDFReader source={{ uri }} style={{ width, height }} />;
};

export default PDFViewer;
