import _get from "lodash/get";

export const fetchedUserDataParser = (res) => {
  if (res && res.data) {
    res = res.data;
  }

  if (!res) {
    return [];
  }
  const data = res.map((e) => {
    var data = {
      date: _get(e, "Date", ""),
      empcode: _get(e, "Empcode", ""),
      name: _get(e, "Name", ""),
      mobile: _get(e, "Mobile", ""),
      email: _get(e, "Email"),
      designation: _get(e, "Designation"),
      formId: _get(e, "Form_Id", ""),
      username: _get(e, "Username", ""),
      Campaign: _get(e?.audit_details, "campaign_name", ""),
      City: _get(e?.audit_details, "city", ""),
      State: _get(e?.audit_details, "state"),
      Region: _get(e?.audit_details, "region"),
      Store: _get(e?.audit_details, "store_name", ""),
      store_code: _get(e?.audit_details, "store_code", ""),
      audit_date: _get(e?.audit_details, "audit_date", ""),
    };

    if (data.formId??"") {
      return data;
    }
  });
  return data.filter((e) => e);
};

export const parseSubmittedData = (res) => {
  if (res && res.data) {
    res = res.data;
  }

  if (!res) {
    return [];
  }
  let rawData = res['categories_result'];
  let mappedData = {};
  rawData.map((e)=>{
    let formName = e['category'];
    let questionaire = {};
    e['questionnarie'].map((questionData)=>{
      questionaire[questionData['label_key']] = {
      	answer:questionData['answer'],
        question:questionData['question'],
        
      };
    });
    mappedData[formName] = questionaire;
  })
  return mappedData;
}
