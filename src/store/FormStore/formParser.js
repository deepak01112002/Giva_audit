import _ from "lodash";
import { getOptions } from "./formApi";
import { insertExtraVal } from "./formSlice";

const getTag = (dataType) => {
  let tag = "input";
  switch (dataType) {
    case "edittext":
      tag = "input";
      break;
    case "date":
      tag = "input";
      break;
    case "dropdown":
      tag = "select";
      break;
    case "image":
      tag = "input";
      break;
    case "radio":
      tag = "radio";
      break;
    case "checkbox":
      tag = "checkbox";
      break;
    default:
      tag = "input";
  }
  return tag;
};

const getInputType = (type) => {
  let tagType = "text";
  switch (type) {
    case "date":
      tagType = "date";
      break;
    case "string":
      tagType = "text";
      break;
    case "dropdown":
      tagType = "select";
      break;
    case "file":
      tagType = "file";
      break;
    case "bool":
      tagType = "checkbox";
      break;
    default:
      tagType = "text";
  }
  return tagType;
};

const getInputAttributes = (tag, e) => {
  let validation = _.get(e, "validation", []);
  let attributes = {};
  attributes = {
    name: _.get(e, "label_key", "default_name"),
    type: getInputType(_.get(e, "value_type", "text")),
  };
  attributes["link"] = _.get(e, "link", false);
  if (validation.length > 0) {
    attributes["required"] = _.get(validation[0], "required_field", false);
  }
  return { attributes: { props: attributes }, answerSheet: "" };
};

const fetchOptions = async (opt, url) => {
  let res = await getOptions(url);

  try {

    if (opt.length > 0) {
      let retData = await Promise.all(
        opt.map(async (option) => {
          let wt = await getAttributes("option", option);
          return wt;
        })
      );

      return { retData, extraStore: [], extraCampaign: [] };
    } else {
      let retData = res?.res?.data?.data?.map((item) => {
        let wt = {
          props: {
            value:  item.store_name ?? item.name,
            innerHTML: item.store_code? `${item.store_name} (${item.store_code})`: item.store_name ?? item.name,
          },
          isClosing: true,
          extraData: item,
        };

        return wt;
      });

      if (res?.api == "/api/samsungvm/getStores") {
        return { retData, extraStore: res?.res.data?.data, extraCampaign: [] };
      } else {
        return { retData, extraCampaign: res?.res?.data?.data, extraStore: [] };
      }
    }
  } catch (err) {
    return [];
  }
};
const getSelectAttributes = async (tag, e, isCheckbox = false) => {
  let options = [];
  let attributes = {};
  let validation = _.get(e, "validation", []);

  attributes = {
    name: _.get(e, "label_key", "default_name"),
    type: getInputType(e, "value_type", "text"),
  };
  if (validation.length > 0) {
    attributes["required"] = _.get(validation[0], "required_field", false);
  }


  let { retData, extraStore, extraCampaign } = await fetchOptions(
    _.get(e, "options", []),
    _.get(e, "url_options", {})
  );

  return {
    attributes: {
      props: attributes,
      isClosing: true,
      innerContent: true,
      innerContentValueType: getInputType(e, "value_type", "text"),
      contentvalue: retData,
    },
    answerSheet: isCheckbox
      ? []
      : retData.length > 0
      ? retData[0]["props"]["value"]
      : "",
      extraStore,
    extraCampaign
  };
};

const getOptionAttributes = (tag, value) => {
  return {
    props: {
      value: value,
      innerHTML: value,
    },
    isClosing: true,
  };
};

const getAttributes = async (tag, data) => {
  let element = {};
  switch (tag) {
    case "input":
      element = getInputAttributes(tag, data);
      break;
    case "select":
      element = await getSelectAttributes(tag, data);
      break;
    case "option":
      element = getOptionAttributes(tag, data);
      break;
    case "radio":
      element = getInputAttributes(tag, data);
      break;
    case "checkbox":
      element = await getSelectAttributes(tag, data, true);
      break;
    case "date":
      element = getInputAttributes(tag, data);
      break;
    case "dropdown":
      element = await getSelectAttributes(tag, data);
      break;
    default:
      element = getInputAttributes(tag, data);
  }
  return element;
};

export const parseData = async (res) => {
  let tabs = [];
  let formContent = {};
  let answerContent = {};
  if (res && res.data) {
    res = res.data;
  }

  if (!res) {
    return [];
  }

  const data = res;
  const multiFormData =
    data["data"][0]["configuration"]["multitab_screen"][
      "multitab_screencontent"
    ];
  const campaign_id = data["data"][0]["configuration"]["campaign_id"];
  let extraStore = [];
  let extraCampaign = []
  try {
    await Promise.all(
      multiFormData.map(async (e, i) => {
        let content = _.get(e, "content", []);

        let tabData = {
          label: _.get(e, "form_name", `tab${i}`),
          id: _.get(e, "form_id", `tab${i}`),
          position: _.get(e, "form_position", i),
        };
        tabs[i] = tabData;
        answerContent[tabData["id"]] = {};

        let formData = await Promise.all(
          content.map(async (c, j) => {
            let non_content = _.get(c, "non_scoring", false);
            let auto_fill = _.get(c, "auto-fill", false);

            let tagName = getTag(_.get(c, "value"));
            let attributes = await getAttributes(tagName, c);
            answerContent[tabData["id"]][attributes.attributes.props.name] = {
              answer: attributes.answerSheet ?? "0",
              question: _.get(c, "label", `content${j}`),
              options: attributes?.attributes?.contentvalue ?? [],
              non_scoring: non_content,
              type:_.get(c, "value"),
              question_no:j,
            };
            if (attributes.extraStore && attributes.extraStore.length > 0) {
              extraStore = attributes.extraStore
            }else if(attributes.extraCampaign && attributes.extraCampaign.length > 0){
              extraCampaign = attributes.extraCampaign
            }
            return {
              label: _.get(c, "label", `content${j}`),
              attributes: attributes.attributes,
              tag: tagName,
              auto_fill: auto_fill,
              question_no:j,
            };
          })
        );
        formContent[tabData["id"]] = formData;
      })
    );
  } catch (err) {
    console.log("error in catch=> ", err);
  }
  
  
  return {
    formContent,
    tabs,
    answerContent,
    module_code: data["data"][0]["module_code"],
    campaign_id,
    extraCampaign,
    extraStore
  };
};

export const parseStoreData = (res) => {
  if (res && res.data) {
    res = res.data;
  }

  if (!res) {
    return [];
  }

  if (!res.data) {
    return [];
  }

  // "_id": "64294cbe4cad39bd3ce446c2",
  // "store_code": "MWF",
  // "store_name": "Mia by Tanishq , Nexus Shantiniketan",
  // "region": "SOUTH 2",
  // "city": "Bengaluru",
  // "state": "KARNATAKA",
  // "address": "Mia by Tanishq,Unit no 209, 2nd Floor,Nexus Shantiniketan Mall,Whitefield Main Road,Hoodi,Bengaluru - 560001,Karnataka",
  // "phone_number1": "080-25018037",
  // "phone_number2": "89717 37288",
  // "mystery_audit": "purchase",
  // "project_code": "audit",
  // "disabled": "false",
  // "counter_code": "MWF"
  const data = res.data.map((e) => {
    return e;
  });
  return data;
};
