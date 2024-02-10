
// chakra-theme.js

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Mordern Era",
    heading: "Tiempos Heading",
  },
  fontFace: {
    Tiempos: {
      name: "Tiempos Heading",
      file: "./fonts/Tiempos-Font/TiemposHeadline-Regular.otf", // Update the path to the actual location of your Tiempos font file
    },
    MordernEra: {
      name: "Mordern Era",
      file: "./fonts/MordernEra/ModernEra/ModernEra.ttf", // Update the path to the actual location of your Modern Era font file
    },
  },
});

export default theme;
