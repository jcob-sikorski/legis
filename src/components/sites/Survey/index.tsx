import React, { useState, ReactNode } from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Radio } from 'antd';
import { useSpring, animated } from '@react-spring/web';

import * as Realm from "realm-web";
import { useNavigate, useParams } from 'react-router-dom';
import { config } from "../../../config";

import './Survey.css';
import Questionnaire from '../../../models/Questionnaire';

const { Title } = Typography;
const { Option } = Select;

function Survey() {
  const { site_id } = useParams();
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string | number | string[] }>({});

  const fields = [
    'LawFirmName',
    'MainPracticeArea',
    'OneSentenceDescription',
    'SpecializedPracticeAreas',
    'StandOutFactor',
    'FirmRepresentation',
    'ImportantValues',
    'FirmStrengths',
    'LawyerDetails',
    'ClientReviews'
  ];
  
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [animationProps, setAnimationProps] = useSpring(() => ({
  }));

  const app = new Realm.App({ id: config.appId });
  
  const currentUserID = app.currentUser!.id;

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const survey_collection = mongodb.db("legis").collection("Questionnaire");

  React.useEffect(() => {
    console.log("Fetching the survey data from mongo.");
    async function getData() {
      try {
        // const result = await survey_collection.deleteMany({});
        // Include a query to find the site by its site_id
        const result = await survey_collection.find({ site_id: new Realm.BSON.ObjectId(site_id) });
        // const result: any = [];
        console.log(result);
  
        // If the result is empty, call the createData function
        if (!result || result.length === 0) {
          createData();
        } else {
          const documents = result.map((doc: any) => {
            // Convert user_id and _id to strings
            const modifiedDoc = {
              ...doc,
              site_id: doc.site_id.toString(),
              _id: doc._id.toString(),
            };
            return modifiedDoc;
          });
          const mergedDocuments = documents.reduce((acc, doc) => ({ ...acc, ...doc }), {});
          setFieldValues(prevState => ({...prevState, ...mergedDocuments}));
        }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
    }
  
    getData();
  }, []);
  

  async function createData() {
    console.log("Creating new survey data for this site");

    const newId = new Realm.BSON.ObjectId()
    const newSurveyData = {
      site_id: new Realm.BSON.ObjectID(site_id),
      _id: newId,
      page: 0,
      LawFirmName: "",
      MainPracticeArea: "",
      OneSentenceDescription: "",
      SpecializedPracticeAreas: "",
      FirmRepresentation: "",
      FirmStrengths: "",
      LawyerDetails: "",
      ClientReviews: "",
      StandOutFactor: [],
      ImportantValues: []
    };
  
    try {
      const result = await survey_collection.insertOne(newSurveyData);
      console.log("Created new survey data:", JSON.stringify(result));

      // TODO set the newSurvey data to the state hook
    } catch (error) {
      console.error("Error creating site:", error);
    }
  }


  const updateField = async (fieldName: keyof Questionnaire, value: string | number | string[]) => {
    const updatedValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(updatedValues);
  };


  React.useEffect(() => {
    if (fieldValues) {
      console.log("fieldValues: ", fieldValues);
    }
  }, [fieldValues]);
  

  const updateDBField = async (fieldName: keyof Questionnaire) => {
    try {
      const updateResult = await survey_collection.updateOne(
        { site_id: new Realm.BSON.ObjectID(site_id) },
        { $set: { [fieldName]: fieldValues[fieldName] } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);
    } catch (error) {
      console.error('Error updating document in MongoDB:', error);
    }
  }
  

  const nextPage = () => {
    if (page < fields.length) {
      updateDBField(fields[page] as keyof Questionnaire);
    }

    setAnimationProps({
      from: { opacity: 0, transform: 'translateY(100%)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { tension: 220 * 4, friction: 120 / 4 },
    });
    setPage(page + 1);
  };


  const prevPage = () => {
    setAnimationProps({
      from: { opacity: 0, transform: 'translateY(-100%)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { tension: 220 * 4, friction: 120 / 4 },
    });
    setPage(page - 1);
  };

  const navigate = useNavigate();
  
  const onFinish = () => {
    if (page < fields.length) {
      console.log("onFinish push to ")
      updateDBField(fields[page] as keyof Questionnaire);
    }

    navigate(`/generate/${site_id}`);
  }

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#262627' }}>
        <img src="https://ucarecdn.com/194ed0d0-5921-4684-8ae1-02bfd645d41c/_d65e891a18e343b9bccb0adb2a065aca.jpeg" alt="Your description" style={{ width: '100%', maxHeight: '100vh' }} />
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Form
          name="survey"
          layout="vertical"
          size='large'
          style={{ maxWidth: '80%' }}
        >
          {page === 0 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What is the name of your law firm?</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.LawFirmName}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
          {page === 1 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What is your main practice area? (e.g., Family Law)</div>
              <div className="custom-select">
                <Select 
                  placeholder="Select your main practice area" 
                  value={fieldValues?.MainPracticeArea ? fieldValues?.MainPracticeArea.toString() : ''}
                  onChange={(value: string) => updateField(fields[page] as keyof Questionnaire, value)}
                  style={{
                    width: '100%', 
                    marginTop: '10px',
                    borderRadius: '4px',
                    borderColor: '#1890ff',
                  }}
                  dropdownStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Option value="Banking and Debt finance Law">Banking and Debt finance Law</Option>
                  <Option value="Charity Law">Charity Law</Option>
                  <Option value="Civil litigation dispute resolution law">
                    Civil litigation dispute resolution law
                  </Option>
                  <Option value="Commercial law">Commercial law</Option>
                  <Option value="Arbitration">Arbitration</Option>
                  <Option value="Aviation Law">Aviation Law</Option>
                  <Option value="Construction Law">Construction Law</Option>
                  <Option value="Consumer Law">Consumer Law</Option>
                  <Option value="Corporate Law">Corporate Law</Option>
                  <Option value="Criminal Law">Criminal Law</Option>
                  <Option value="Employment Law">Employment Law</Option>
                  <Option value="Environmental Law">Environmental Law</Option>
                  <Option value="Family Law">Family Law</Option>
                  <Option value="Real-estate law">Real-estate law</Option>
                  <Option value="Human Rights Law">Human Rights Law</Option>
                  <Option value="Immigration Law">Immigration Law</Option>
                  <Option value="Energy & Infrastructure Law">Energy & Infrastructure Law</Option>
                  <Option value="Insurance Law">Insurance Law</Option>
                  <Option value="Intellectual Property Law">Intellectual Property Law</Option>
                  <Option value="Personal Injury Law">Personal Injury Law</Option>
                  <Option value="Property Law">Property Law</Option>
                  <Option value="Public company & equity finance law">
                    Public company & equity finance law
                  </Option>
                  <Option value="Restructuring & insolvency law">Restructuring & insolvency law</Option>
                  <Option value="Competition Law">Competition Law</Option>
                  <Option value="Maritime Law">Maritime Law</Option>
                  <Option value="Sports Law">Sports Law</Option>
                  <Option value="Tax law">Tax law</Option>
                  <Option value="Gaming Law">Gaming Law</Option>
                </Select>
              </div>
            </div>
          )}
          {page === 2 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Write a one-sentence description of your law firm</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.OneSentenceDescription}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
          {page === 3 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What smaller practice areas do you specialize in? (E.g., Divorce settlement, custody claims, drafting wills, etc)</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.SpecializedPracticeAreas}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
          {page === 4 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>How does your law firm stand out?</div>
              <div className="custom-checkbox">
                <Checkbox.Group 
                  value={Array.isArray(fieldValues?.StandOutFactor) ? fieldValues?.StandOutFactor : [fieldValues?.StandOutFactor]}
                  onChange={(checkedValues) => updateField(fields[page] as keyof Questionnaire, checkedValues as string[])}
                >
                  <Checkbox value="Work ethic - We work harder than anyone else." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Work ethic - We work harder than anyone else.
                  </Checkbox>
                  <Checkbox value="Clarity-focused: We are problem solvers at heart." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Clarity-focused: We are problem solvers at heart.
                  </Checkbox>
                  <Checkbox value="Domain experts - We are experts at what we do." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Domain experts - We are experts at what we do.
                  </Checkbox>
                  <Checkbox value="Accessible - We make sure quality legal help reaches as many people as possible." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Accessible - We make sure quality legal help reaches as many people as possible.
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </div>
          )}
          {page === 5 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Which of these statements best represents your law firm?</div>
              <Radio.Group 
                className="custom-radio" 
                value={fieldValues?.FirmRepresentation}
                onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
              >
                <Radio value="Gritty - We aren’t afraid to get our hands dirty" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Gritty - We aren’t afraid to get our hands dirty
                </Radio>
                <Radio value="Passionate - We are going to do everything to make sure our client is happy" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Passionate - We are going to do everything to make sure our client is happy
                </Radio>
                <Radio value="Compassionate & Strong - we look after our clients always, especially when things get rough" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Compassionate & Strong - we look after our clients always, especially when things get rough
                </Radio>
                <Radio value="Fearless - We aren’t afraid to take on big challenges. We take them head on." style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Fearless - We aren’t afraid to take on big challenges. We take them head on.
                </Radio>
              </Radio.Group>
            </div>
          )}
          {page === 6 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What values are most important at your law firm?</div>
              <div className="custom-checkbox">
                <Checkbox.Group 
                  value={Array.isArray(fieldValues?.ImportantValues) ? fieldValues?.ImportantValues : [fieldValues?.ImportantValues]}
                  onChange={(checkedValues) => updateField(fields[page] as keyof Questionnaire, checkedValues as string[])}
                >
                  <Checkbox value="Reliability" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Reliability
                  </Checkbox>
                  <Checkbox value="Loyalty & Trust" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Loyalty & Trust
                  </Checkbox>
                  <Checkbox value="Integrity" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Integrity
                  </Checkbox>
                  <Checkbox value="Excellence" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Excellence
                  </Checkbox>
                  <Checkbox value="Collaboration" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Collaboration
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </div>
          )}
          {page === 7 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Tell us the strength of your firm, what are your experience levels and what you bring to the table.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.FirmStrengths}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
          {page === 8 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Name your lawyers and write a one-sentence description about your lawyer.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.LawyerDetails}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
          {page === 9 && (
            <div>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Write 3 good reviews given by your clients. Separate each review by a comma.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.ClientReviews}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
        <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', bottom: 0, right: 0 }}>
          {page !== 0 && (
            <Button
              type="primary"
              onClick={prevPage}
              className="custom-button"
              style={{
                width: 100,
                height: 50
              }}
            >
              Previous
            </Button>
          )}
          {page !== 9 && (
            <Button
              type="primary"
              onClick={nextPage}
              className="custom-button"
              style={{
                width: 100,
                height: 50
              }}
            >
              Next
            </Button>
          )}
          {page === 9 && (
            <Button
              type="primary"
              onClick={onFinish}
              className="custom-button"
              style={{
                width: 100,
                height: 50
              }}
            >
              Finish
            </Button>
          )}
        </div>
        </Form>
      </div>
  </Layout>
);
}

export default Survey;