const black = "#333";
const blue = "#00C0F2";
const red = "#ef3c39";
const yellow = "#F8BF95";
const orange = "orange";
const active = "rgb(0, 127, 212)";
const cyan = "#39f";

// --active-color:rgb(50,139,248);
// --active-primary-color:#f6d365;
// --active-secondary-color:#f6d365;
const colors = {
  blacks: {
    5: "#fafafa",
    10: "#d8d8d8",
    20: "#bbb",
    30: "#999",
    40: "#7a7a7a",
    50: "#525252",
    60: "#3d3d3d",
    90: black,
  },
  blues: {
    10: "#F4F6F9",
    20: "#def3f7",
    30: blue,
    40: "#00ABD7",
  },
  reds: {
    30: red,
  },
  yellows: {
    30: yellow,
  },
  black,
  blue,
  red,
  yellow,
  orange,
  cyan,
  active,
};

colors.textColor = colors.black;

const space = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 48, 56, 64, 72, 80, 96, 120, 140, 180, 200,
  300,
];

const fontSizes = [12, 14, 16, 18];

const fontWeights = {
  light: 200,
  thin: 300,
  normal: 400,
  bold: 700,
  black: 900,
};

const breakpoints = ["288px", "608px", "1024px", "1504px"];

const fontStack = "'Chivo Mono', sans-serif;"; // "sans-serif,Comic Sans, -apple-system, BlinkMacSystemFont,";
const fontFamilies = {
  body: fontStack,
  heading: fontStack,
};
const lineHeights = [
  "20px",
  "24px",
  "28px",
  "32px",
  "40px",
  "60px",
  "72px",
  "80px",
  "100px",
  "120px",
];

export default {
  colors,
  space,
  fontSizes,
  fontWeights,
  fontFamilies,
  breakpoints,
  lineHeights,
};
