function getQuestionnaire(mergedData, formData) {
    let questionnaire = [];
  
    for (let a in mergedData) {
      let data = { ...formData[a], ...mergedData[a] };
      let answerData = {
        question: data['question'],
        answer: data['answer'].toString(),
        label_key: a,
        question_no: data['question_no'],
        sub_tab: data['sub_tab'],
      };
  
      if (!data.non_scoring && Array.isArray(data['answer'])) {
        if (!data['answer'].includes('None of the above')) {
          answerData['marks'] = data['answer'].length ?? 0;
        } else {
          answerData['answer'] = 'None of the above';
        }
      } else if (data.non_scoring === true && data?.type == 'dropdown') {
        delete answerData['marks'];
        delete answerData['max_marks'];
      } else if (data?.type == 'image') {
        delete answerData['marks'];
        delete answerData['max_marks'];
      } else if (data?.type == 'edittext') {
        delete answerData['marks'];
        delete answerData['max_marks'];
      }
  
      let tostr = data['answer'].toString();
      let rawMarks = tostr.toLowerCase();
      if (
        data.non_scoring === false &&
        data?.type != 'image' &&
        data?.type != 'edittext'
      ) {
        let marks = rawMarks == 'yes' ? 1 : 0;
        answerData['marks'] = marks;
        answerData['max_marks'] = 1;
      }
      if (!data.non_scoring) {
        // Uncomment in future project
        // if(data["options"]?.length > 0){
        //   answerData["marks"] = data["answer"]?.toLowerCase == "no" ? 0 : 1;
        //   answerData["max_marks"] = 1;
        // }
  
        if (
          data['question']?.includes('0 to 5') ||
          data['question']?.includes('1 to 5')
        ) {
          answerData['marks'] = data['answer'];
          answerData['max_marks'] = 5;
        }
        if (data['question']?.includes('0(lowest) to 5 (highest)')) {
          answerData['marks'] = data['answer'];
          answerData['max_marks'] = 5;
        }
        if (data.type === 'date') {
          if (answerData['answer'] === '') {
            const currentDate = new Date().toISOString().split('T')[0];
            answerData['answer'] = currentDate;
          }
        }
      }
      questionnaire.push(answerData);
    }
  
    const sortedArray = questionnaire.sort(
      (a, b) => a.question_no - b.question_no
    );
    return sortedArray;
  }
  
  export default getQuestionnaire;
  