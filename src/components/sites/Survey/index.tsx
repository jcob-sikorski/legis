import React, { useState, ReactNode } from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Radio } from 'antd';
import { useSpring, animated } from '@react-spring/web';

import * as Realm from "realm-web";
import { useNavigate, useParams } from 'react-router-dom';
import { config } from "../../../config";

import './../../../index.css';
import './Survey.css';
import Questionnaire from '../../../models/Questionnaire';
import { MainPracticeArea } from './MainPracticeArea';
import { SurveyInput } from './SurveyInput';
import { FirmRepresentation } from './FirmRepresentation';
import { CheckboxGroup } from './CheckboxGroup';
import { useApp } from '../../RealmApp';

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

  const app: any = useApp();

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
            <SurveyInput question={"What is the name of your law firm?"} value={'LawFirmName'} page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 1 && (
            <MainPracticeArea page={page} fields={fields} fieldValues={fieldValues} updateField={updateField}/>
          )}
          {page === 2 && (
            <SurveyInput question={"Write a one-sentence description of your law firm."} value={'OneSentenceDescription'} page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 3 && (
            <SurveyInput question={"What smaller practice areas do you specialize in? (E.g., Divorce settlement, custody claims, drafting wills, etc.)"} value={'SpecializedPracticeAreas'} page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 4 && (
            <CheckboxGroup value={"StandOutFactor"} question={"How does your law firm stand out?"} values={["Work ethic - We work harder than anyone else.", "Clarity-focused: We are problem solvers at heart.", "Domain experts - We are experts at what we do.", "Accessible - We make sure quality legal help reaches as many people as possible."]} page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 5 && (
            <FirmRepresentation page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 6 && (
            <CheckboxGroup value={"ImportantValues"} question={"What values are most important at your law firm?"} values={["Reliability", "Loyalty & Trust", "Integrity", "Excellence", "Collaboration"]} page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 7 && (
            <SurveyInput question={"Tell us the strength of your firm, what are your experience levels and what you bring to the table."} value={'FirmStrengths'} page={page} fields={fields} fieldValues={fieldValues} updateField={updateField} />
          )}
          {page === 8 && (
            <div>
              <div style={{ fontSize: '30px', fontWeight: 'bolder' }}>Name your lawyers and write a one-sentence description about your lawyer.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.LawyerDetails}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 20
                  }}
                  bordered={false}
                />
              </div>
            </div>
          )}
          {page === 9 && (
            <div>
              <div style={{ fontSize: '30px', fontWeight: 'bolder' }}>Write 3 good reviews given by your clients. Separate each review by a comma.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  value={fieldValues?.ClientReviews}
                  onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 20
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