import {
  Page,
  View,
  Document,
  StyleSheet,
  Text,
  Image,
  Font,
} from '@react-pdf/renderer';
import { getAttributeByScore } from '../utils/colors';
let client_code = 'samsung';

let clientConfiguration = {
  sleep: {
    overAllExperience: true,
    auditSummary: true,
    logoSource: '/sleep_logo.png',
    altText: 'Sleep ',
    auditDetailsPadding: '5px',
  },
  titan: {
    overAllExperience: true,
    auditSummary: true,
    logoSource: '/titan_logo.png',
    altText: 'Titan ',
    auditDetailsPadding: '5px',
  },
  vip: {
    overAllExperience: false,
    auditSummary: false,
    logoSource: '/vip_logo.png',
    altText: 'Vip ',
    auditDetailsPadding: '15px',
  },
  gmr: {
    overAllExperience: true,
    auditSummary: true,
    logoSource: '/gmr_logo.png',
    altText: 'Gmr ',
    auditDetailsPadding: '15px',
  },
  samsung: {
    overAllExperience: true,
    auditSummary: true,
    logoSource: '/samsung_logo.png',
    altText: 'Samsung ',
    auditDetailsPadding: '15px',
  },
  giva: {
    overAllExperience: true,
    auditSummary: true,
    logoSource: '/samsung_logo.png',
    altText: 'Samsung ',
    auditDetailsPadding: '15px',
  },
};

const styles = StyleSheet.create({
  container: {
    margin: '0px 5px',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid grey',
    justifyContent: 'space-between',
    padding: '0px 8px',
  },
  logo: { height: '50px', width: '100px', objectFit: 'contain' },
  icon: { height: '20px', width: '20px', objectFit: 'contain' },
  borderBox: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    border: 'solid black 10px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    border: 'solid black 10px',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
  },
  tableTitle: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  questionnarieBox: {
    flex: 1,
    fontSize: '10px',
    fontWeight: 'normal',
    padding: '10px',
    overflow: 'hidden',
    maxHeight: '100%',
    textOverflow: 'ellipsis',
    border: 'solid black 1px',
  },
  questionnarieImage: {
    flex: 1,
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
});

Font.registerHyphenationCallback((word) => {
  return [word];
});

const isImage = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
function isURL(str) {
  // Regular expression pattern for URL validation
  // var pattern = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:www\.)?(?:[^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  var pattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return pattern.test(str);
}

function Answer(props) {
  const { answer } = props;
  if (isImage(answer)) {
    return <Image style={styles.questionnarieImage} src={answer} />;
  } else if (isURL(answer)) {
    return (
      <Text break style={styles.questionnarieBox}>
        {answer ?? '-'}
      </Text>
    );
  }
  return (
    <Text break style={styles.questionnarieBox}>
      {answer ?? '-'}
    </Text>
  );
}

const scoreCriteria = [
  {
    label: 'Excellent',
    description: '90% and above',
    score: '100',
  },
  {
    label: 'Good',
    description: '85% - 89%',
    score: '86',
  },
  {
    label: 'Average',
    description: '75% - 84%',
    score: '80',
  },
  {
    label: 'Poor',
    description: '66% - 74%',
    score: '70',
  },
  {
    label: 'Bad',
    description: '0% - 65%',
    score: '50',
  },
];
const AudiTextetails = (props) => {
  const { item, index } = props;
  return (
    <View
      key={`border-box-${index}`}
      style={{
        backgroundColor: index % 2 == 0 ? '#f2f2f2' : 'white',
        display: 'flex',
        flexDirection: 'row',
        padding: '2px',
      }}
    >
      <Text
        style={{
          ...styles.questionnarieBox,
          padding: clientConfiguration[client_code].auditDetailsPadding,
        }}
      >
        {item?.key}:
      </Text>
      <Text
        style={{
          ...styles.questionnarieBox,
          flex: 4,
          padding: clientConfiguration[client_code].auditDetailsPadding,
        }}
      >
        {item?.value}
      </Text>
    </View>
  );
};
const ProgressBar = (props) => {
  const { progress, small, text } = props;
  return (
    <View
      style={{
        width: small ? '60%' : '70%',
        height: small ? '10px' : '30px',
        borderRadius: '20px',
        backgroundColor: '#e6e7e8',
      }}
    >
      <View
        style={{
          width: `${progress}%`,
          height: small ? '10px' : '30px',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          borderTopRightRadius: progress == 100 ? '20px' : '0px',
          borderBottomRightRadius: progress == 100 ? '20px' : '0px',
          backgroundColor: getAttributeByScore(progress),
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {text && (
          <Text
            style={{
              fontSize: '10px',
              fontWeight: 'normal',
              color: 'white',
              alignSelf: 'center',
            }}
          >{`${progress}%`}</Text>
        )}
      </View>
    </View>
  );
};

const Report = (props) => {
  const { data } = props;
  const overallPercentage = Math.round(data.overall_percentage ?? 0);
  return (
    <Document
      style={{
        padding: '10%',
      }}
    >
      <Page>
        <View style={styles.container}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '10px',
              marginTop: '10px',
            }}
          >
            <Image style={styles.icon} src={'/fileIconBlack.png'} />
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Audit Report
            </Text>
          </View>
          {clientConfiguration[client_code].logoSource && (
            <Image
              style={styles.logo}
              src={clientConfiguration[client_code].logoSource}
            />
          )}
        </View>
        <View
          style={{
            margin: '10px',
            border: '2px solid #427ef5',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color: 'white',
              fontSize: '14px',
              backgroundColor: '#427ef5',
              fontWeight: 'bold',
              padding: '7px',
            }}
          >
            <Image style={styles.icon} src={'/fileIconWhite.png'} />
            <Text>Audit Details</Text>
          </View>
          {data.audit_details && data.audit_details.length > 0
            ? data?.audit_details.map((item, i) => (
                <AudiTextetails item={item} key={i} index={i} />
              ))
            : data.audit_details && Object.keys(data.audit_details).length > 0
            ? Object.keys(data.audit_details).map((itemKey, i) => (
                <AudiTextetails
                  key={i}
                  index={i}
                  item={{
                    key: itemKey,
                    value: data.audit_details[itemKey],
                  }}
                />
              ))
            : null}
        </View>

        {/* over all expireince  */}

        {clientConfiguration[client_code].overAllExperience && (
          <View
            style={{
              ...styles.heading,
              // paddingBottom: "15px",
              margin: '10px',
              border: '2px solid rgb(193 192 190)',
              display: 'block',
            }}
          >
            <View style={{ backgroundColor: '#e6e7e8', padding: '5px' }}>
              <Text>Overall Experience</Text>
            </View>
            <View
              style={{ display: 'flex', width: '100%', flexDirection: 'row' }}
            >
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  width: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <ProgressBar
                  text={true}
                  progress={overallPercentage}
                  small={false}
                />
                <Text
                  style={{
                    fontSize: '10px',
                    fontWeight: 'normal',
                    padding: '0px',
                    marginTop: '2px',
                  }}
                >
                  {getAttributeByScore(data.overall_percentage, 'text')}
                </Text>
              </View>
              <View
                style={{ width: '40%', display: 'flex', padding: '5px 0px' }}
              >
                <View>
                  {scoreCriteria.map((item, i) => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: getAttributeByScore(item.score),
                      }}
                      key={i}
                    >
                      <Text style={styles.questionnarieBox}>{item.label}</Text>
                      <Text style={styles.questionnarieBox}>
                        {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {clientConfiguration[client_code].auditSummary && (
          <View
            style={{
              padding: '10px',
            }}
          >
            <View
              style={{
                border: '2px solid rgb(193 192 190)',
                // display: "flex",
              }}
            >
              <View style={{ backgroundColor: '#e6e7e8', padding: '5px' }}>
                <Text>Audit Summary</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text style={styles.tableTitle}>#</Text>
                <Text style={styles.tableTitle}>Section</Text>
                <Text style={styles.tableTitle}>Score</Text>
              </View>
              <View>
                {data.category_percentages &&
                data.category_percentages.length > 0
                  ? data.category_percentages.map((item, i) => (
                      <View
                        wrap={false}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: i % 2 == 0 ? '#f2f2f2' : 'white',
                          minHeight: '28px',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                        }}
                        key={i}
                      >
                        <Text style={styles.questionnarieBox}>{i + 1}</Text>
                        <Text style={styles.questionnarieBox}>
                          {item.category_name}
                        </Text>
                        <View
                          style={{
                            ...styles.questionnarieBox,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: '6px',
                            paddingBottom: '6px',
                          }}
                        >
                          <Text
                            style={{
                              padding: 0,
                              margin: 0,
                              marginRight: '5px',
                            }}
                          >
                            {Math.round(item.category_percentage)}%
                          </Text>

                          <ProgressBar
                            progress={Math.round(item.category_percentage)}
                            text={false}
                            small={true}
                          />
                        </View>
                      </View>
                    ))
                  : null}
              </View>
            </View>
          </View>
        )}
      </Page>
      {data?.categories_result?.map((categoryResult, i) => (
        <>
          <Page
            style={{
              padding: '10px',
            }}
          >
            <View
              style={{
                // display: "flex",
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: getAttributeByScore(
                  (categoryResult.marks_scored /
                    categoryResult.category_marks) *
                    100
                ),
              }}
            >
              <View
                style={{
                  backgroundColor: getAttributeByScore(
                    (categoryResult.marks_scored /
                      categoryResult.category_marks) *
                      100,
                    'background'
                  ),
                  textTransform: 'capitalize',
                  padding: '5px',
                  fontWeight: 'bold',
                  paddingLeft: '9px',
                  paddingTop: '10px',
                  color: getAttributeByScore(
                    (categoryResult.marks_scored /
                      categoryResult.category_marks) *
                      100
                  ),
                }}
              >
                <Text>{categoryResult.label ?? '-'}</Text>
              </View>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableTitle}>Question</Text>
                  <Text style={styles.tableTitle}>Answer </Text>
                  <Text style={styles.tableTitle}>Marks</Text>
                  <Text style={styles.tableTitle}>Max Marks</Text>
                </View>
                <View>
                  {categoryResult.questionnarie.map((questionnarie, j) => {
                    return (
                      <View
                        wrap={false}
                        break={j == 15}
                        key={i}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: j % 2 == 0 ? '#f2f2f2' : 'white',
                        }}
                      >
                        <Text style={styles.questionnarieBox}>
                          {' '}
                          {questionnarie?.question ?? '-'}
                        </Text>
                        <Answer answer={questionnarie?.answer} />
                        <Text style={styles.questionnarieBox}>
                          {questionnarie?.marks ?? '-'}
                        </Text>
                        <Text style={styles.questionnarieBox}>
                          {questionnarie?.max_marks ?? '-'}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#e6e7e8',
                  padding: '5px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: '5px',
                    fontSize: '10px',
                  }}
                >
                  Total marks
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: '5px',
                    fontSize: '10px',
                  }}
                >
                  {categoryResult.marks_scored ?? 0} out of{' '}
                  {categoryResult.category_marks ?? 0}
                </Text>
              </View>
              {/* </View> */}
            </View>
          </Page>
        </>
      ))}
    </Document>
  );
};

export default Report;
