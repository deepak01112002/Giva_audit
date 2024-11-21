const AppStyle = {
  primaryBG: "#242633",
  primaryText: "#f5f5f5",
  muted: "#f0f0f0",
};

export const getAttributeByScore = (score, type = "color") => {
  //Excellent
  let color = "#1CBD5C";
  //Good

  if (type === "color") {
    if (score <= 65) {
      color = "#FF5B5B";
      //Average
    } else if (score > 65 && score <= 74) {
      color = "#FAAE56";
      //Poor:
    } else if (score > 74 && score <= 84) {
      color = "#FCE232";
      //bad:
    } else if (score > 84 && score <= 89) {
      color = "#AED676";
    }
  } else if (type === 'text') {
    if (score <= 65) {
      color = "Bad";
      //Average
    } else if (score > 65 && score <= 74) {
      color = "Poor";
      //Poor:
    } else if (score > 74 && score <= 84) {
      color = "Average";
      //bad:
    } else if (score > 84 && score <= 89) {
      color = "Good";
    } else {
      color = 'Excellent';
    }
  } else {
    if (score <= 65) {
      color = "#fcb1b1";
      //Average
    } else if (score > 65 && score <= 74) {
      color = "#fcdfbd";
      //Poor:
    } else if (score > 74 && score <= 84) {
      color = "#fcf09f";
      //bad:
    } else if (score > 84 && score <= 89) {
      color = "#e3ffbd";
    } else {
      color = "#cef5dd";
    }
  }
  return color;
};

export default AppStyle;
