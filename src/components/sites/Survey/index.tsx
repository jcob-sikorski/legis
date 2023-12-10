import React, { useState, ReactNode, useEffect } from "react";
import {
  Layout,
  Typography,
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  Radio,
  List,
  Flex,
  Upload,
  message,
} from "antd";
import { useSpring, animated } from "@react-spring/web";

import * as Realm from "realm-web";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";

import "./../../../index.css";
import "./Survey.css";
import Questionnaire from "../../../models/Questionnaire";
import { MainPracticeArea } from "./MainPracticeArea";
import { SurveyInput } from "./SurveyInput";
import { FirmRepresentation } from "./FirmRepresentation";
import { CheckboxGroup } from "./CheckboxGroup";
import { useApp } from "../../RealmApp";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import { uploadDirect } from "@uploadcare/upload-client";
import { getUrl } from "../../../utils";
import Visualisation from "../editor/Visualisation";
import ImgCrop from "antd-img-crop";
import IFrame from "../../iFrame";

const { Title } = Typography;
const { Option } = Select;

function Survey() {
  const { site_id } = useParams();
  const [fieldValues, setFieldValues] = useState<{
    [key: string]: string | number | string[];
  }>({});

  const fields = [
    "LawFirmName",
    "MainPracticeArea",
    "OneSentenceDescription",
    "SpecializedPracticeAreas",
    "StandOutFactor",
    "FirmRepresentation",
    "ImportantValues",
    "FirmStrengths",
    "LawyerDetails",
    "ClientReviews",
  ];

  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [animationProps, setAnimationProps] = useSpring(() => ({}));

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const survey_collection = mongodb.db("legis").collection("Questionnaire");
  const site_collection = mongodb.db("legis").collection("Site");

  React.useEffect(() => {
    console.log("Fetching the survey data from mongo.");
    async function getData() {
      try {
        // const result = await survey_collection.deleteMany({});
        // Include a query to find the site by its site_id
        const result = await survey_collection.find({
          site_id: new Realm.BSON.ObjectId(site_id),
        });
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
          const mergedDocuments = documents.reduce(
            (acc: any, doc: any) => ({ ...acc, ...doc }),
            {}
          );
          setFieldValues((prevState) => ({ ...prevState, ...mergedDocuments }));
        }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
    }

    getData();
  }, []);

  async function createData() {
    console.log("Creating new survey data for this site");

    const newId = new Realm.BSON.ObjectId();
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
      ImportantValues: [],
    };

    try {
      const result = await survey_collection.insertOne(newSurveyData);
      console.log("Created new survey data:", JSON.stringify(result));

      // TODO set the newSurvey data to the state hook
    } catch (error) {
      console.error("Error creating site:", error);
    }
  }

  const updateField = async (
    fieldName: keyof Questionnaire,
    value: string | number | string[]
  ) => {
    const updatedValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(updatedValues);
  };

  const devUpdateFields = async (obj: any) => {
    const updatedValues = { ...fieldValues, ...obj };
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

      if (
        fieldName === "LawFirmName" ||
        fieldName === "OneSentenceDescription"
      ) {
        const field = fieldName === "LawFirmName" ? "title" : "description";

        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectID(site_id) },
          { $set: { [field]: fieldValues[fieldName] } }
        );
      }
    } catch (error) {
      console.error("Error updating document in MongoDB:", error);
    }
  };

  const nextPage = () => {
    switch (page) {
      case 1:
        if (!fieldValues["MainPracticeArea"]) {
          message.error("Please select an option from the list.");
          return;
        }
        break;
      case 2:
        if (!fieldValues["OneSentenceDescription"]) {
          message.error("The field is empty. Please fill it out.");
          return;
        }
        break;
      case 3:
        if (!fieldValues["SpecializedPracticeAreas"]) {
          message.error("The field is empty. Please fill it out.");
          return;
        }
        break;
      case 4:
        if ((fieldValues["StandOutFactor"] as string[]).length === 0) {
          message.error("Please select at least one option.");
          return;
        }
        break;
      case 5:
        if (!fieldValues["FirmRepresentation"]) {
          message.error("Please select an option.");
          return;
        }
        break;
      case 6:
        if ((fieldValues["ImportantValues"] as string[]).length === 0) {
          message.error("Please select at least one option.");
          return;
        }
        break;
      case 7:
        if (!fieldValues["FirmStrengths"]) {
          message.error("The field is empty. Please fill it out.");
          return;
        }
        break;
      case 8:
        // TODO the LawyerDetails
        break;
      default:
        if (!fieldValues["LawFirmName"]) {
          message.error("The field is empty. Please fill it out.");
          return;
        }
        break;
    }

    if (page < fields.length) {
      updateDBField(fields[page] as keyof Questionnaire);
    }

    setAnimationProps({
      from: { opacity: 0, transform: "translateY(100%)" },
      to: { opacity: 1, transform: "translateY(0)" },
      config: { tension: 220 * 4, friction: 120 / 4 },
    });
    setPage(page + 1);
  };

  const prevPage = () => {
    setAnimationProps({
      from: { opacity: 0, transform: "translateY(-100%)" },
      to: { opacity: 1, transform: "translateY(0)" },
      config: { tension: 220 * 4, friction: 120 / 4 },
    });
    setPage(page - 1);
  };

  const navigate = useNavigate();

  const onFinish = async () => {
    if (!fieldValues["ClientReviews"]) {
      message.error("The field is empty. Please fill it out.");
      return;
    }

    console.log("here: ", fieldValues["ClientReviews"]);

    if (page < fields.length) {
      console.log("onFinish push to ");
      await updateDBField(fields[page] as keyof Questionnaire).then(() => {
        navigate(`/generate/${site_id}/1`);
      });
    }
  };

  const [lawyersJSON, setLawyersJSON] = useState("[]");
  const [lawyers, setLawyers] = useState<any[]>([
    { name: "", description: "", photo: "", id: v4() },
  ]);
  const [reviews, setReviews] = useState<any[]>([
    { clientName: "", testimonial: "", id: v4() },
  ]);

  function handleAddLawyer() {
    // alert("handleAddLawyer")
    setLawyers([
      ...lawyers,
      { name: "", description: "", photo: "", id: v4() },
    ]);
  }

  function handleAddReview() {
    // alert("handleAddLawyer")
    setReviews([...reviews, { clientName: "", testimonial: "", id: v4() }]);
  }

  function handleRemoveLawyer(indexToDelete: number) {
    if (lawyers?.length > 1) {
      let newLawyers = lawyers;
      newLawyers[indexToDelete] = undefined;
      newLawyers = newLawyers.filter((x) => x);
      console.log("newLawyers: ", newLawyers);
      setLawyers(newLawyers);
    }
  }

  function handleRemoveReview(indexToDelete: number) {
    if (reviews?.length > 1) {
      let newReviews = reviews;
      newReviews[indexToDelete] = undefined;
      newReviews = newReviews.filter((x) => x);
      console.log("newReviews: ", newReviews);
      setReviews(newReviews);
    }
  }

  function changeLawyerData(value: any, key: string, index: number) {
    let newLawyers = lawyers;
    if (newLawyers?.length > 0) {
      newLawyers[index][key] = value;
      console.log("newLawyers: ", newLawyers);

      setLawyers(newLawyers);
      updateField("LawyerDetails", JSON.stringify(newLawyers));
    }
  }

  function changeReviewData(value: any, key: string, index: number) {
    // lawyers naming = reviews
    let newReviews = reviews;
    if (newReviews?.length > 0) {
      newReviews[index][key] = value;
      console.log("newReviews: ", newReviews);

      setReviews(newReviews);
      updateField("ClientReviews", JSON.stringify(newReviews));
    }
  }

  useEffect(() => {
    if (fieldValues["LawyerDetails"]) {
      const json: string = String(fieldValues["LawyerDetails"]);
      console.log("json: ", json);
      try {
        setLawyers(JSON.parse(json));
      } catch (e: any) {
        console.warn("Error parsing fetched JSON to LAWYER DETAILS.");
      }
    }
  }, [fieldValues]);

  useEffect(() => {
    if (fieldValues["ClientReviews"]) {
      const json: string = String(fieldValues["ClientReviews"]);
      console.log("json: ", json);
      try {
        setReviews(JSON.parse(json));
      } catch (e: any) {
        console.warn("Error parsing fetched JSON to CLIENT REVIEWS.");
      }
    }
  }, [fieldValues]);

  async function devFillOut() {
    // setPage(8);

    const shaunTestData = {
      // site_id: new Realm.BSON.ObjectID(site_id),
      // _id: newId,
      // page: 0,
      LawFirmName: "Shaun & Benn Law partners",
      MainPracticeArea: "Intellectual Property Law",
      OneSentenceDescription:
        "we are a team of intellectual property lawyers who specialize in copyrights, trademarks, patents and everything related to IP rights for innovative & creative companies and individuals.",
      SpecializedPracticeAreas: "copyright law, trademark law, patent law,",
      StandOutFactor: [
        "Clarity-focused: We are problem solvers at heart.",
        "Domain experts - We are experts at what we do.",
      ],
      ImportantValues: [
        "Reliability",
        "Loyalty & Trust",
        "Excellence",
        "Collaboration",
      ],
      FirmStrengths: `Our firm’s significant litigation experience provides our transactional services an advantage by knowing first-hand how registrations and agreements play out when they are disputed in court. Since 2017, industry peers awarded Shaun & Benn as a "SuperLawyers Rising Star“ for "Intellectual Property Litigation” - a distinction limited to only 2.5% attorneys in the Southern California region.`,
      LawyerDetails: JSON.stringify([
        {
          name: "Shaun Poli",
          description:
            "is a renowned IP lawyer with over 10+ years of experience handling IP law cases and has worked with companies like Cisco, Sun microsystems, Apple, Slack and many more companies across Silicon Valley.",
        },
        {
          name: "Benn Deusch",
          description:
            "is a copyright lawyer who works with creators and artists across different domains. He has worked with writers, musicians, painters, architects and many more creators for over 10 years.",
        },
      ]),
      ClientReviews: JSON.stringify([
        {
          testimonial:
            "Shaun & Benn have been incredibly professional about how they go about doing their business. They are domain experts and they have a very keen attention to detail",
          clientName: "Client 1",
        },
        {
          testimonial:
            "Shaun & Been helped me when I really needed someone to step in and help me file a patent for my invention. It's hard to trust lawyers but Shaun & Benn really had my back and I appreciate them.",
          clientName: "Client 2",
        },
        {
          testimonial:
            "The best lawyers are those who give a shit about your business and Shaun and Benn are those rare breed of lawyers who care about their clients. They go above and beyond to make you feel you're in good hands. I recommend them very strongly.",
          clientName: "Client 3",
        },
      ]),
    };

    try {
      const updateResult = await survey_collection.updateOne(
        { site_id: new Realm.BSON.ObjectID(site_id) },
        { $set: { ...shaunTestData } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);
      setPage(9);
    } catch (error) {
      console.error("Error updating document in MongoDB:", error);
    }
  }

  return (
    <Layout
      style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
    >
      <div>
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundPosition: "50%",
            backgroundImage:
              "url('https://ucarecdn.com/194ed0d0-5921-4684-8ae1-02bfd645d41c/_d65e891a18e343b9bccb0adb2a065aca.jpeg')",
            height: "100vh",
            width: "50vw",
          }}
        />
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // minWidth: 400,
        }}
      >
        <Form
          name="survey"
          layout="vertical"
          size="large"
          style={{ maxWidth: "80%" }}
        >
          {page === 0 && (
            <SurveyInput
              question={"What is the name of your law firm?"}
              value={"LawFirmName"}
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 1 && (
            <MainPracticeArea
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 2 && (
            <SurveyInput
              question={"Write a one-sentence description of your law firm."}
              value={"OneSentenceDescription"}
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 3 && (
            <SurveyInput
              question={
                "What smaller practice areas do you specialize in? (E.g., Divorce settlement, custody claims, drafting wills, etc.)"
              }
              value={"SpecializedPracticeAreas"}
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 4 && (
            <CheckboxGroup
              value={"StandOutFactor"}
              question={"How does your law firm stand out?"}
              values={[
                "Work ethic - We work harder than anyone else.",
                "Clarity-focused: We are problem solvers at heart.",
                "Domain experts - We are experts at what we do.",
                "Accessible - We make sure quality legal help reaches as many people as possible.",
              ]}
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 5 && (
            <FirmRepresentation
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 6 && (
            <CheckboxGroup
              value={"ImportantValues"}
              question={"What values are most important at your law firm?"}
              values={[
                "Reliability",
                "Loyalty & Trust",
                "Integrity",
                "Excellence",
                "Collaboration",
              ]}
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 7 && (
            <SurveyInput
              question={
                "Tell us the strength of your firm, what are your experience levels and what you bring to the table."
              }
              value={"FirmStrengths"}
              page={page}
              fields={fields}
              fieldValues={fieldValues}
              updateField={updateField}
            />
          )}
          {page === 8 && (
            <div>
              <div style={{ fontSize: "30px", fontWeight: "bolder" }}>
                Name your lawyers and write a one-sentence description about
                your lawyer.
              </div>
              <List
                className="editor-scrollbar"
                style={{
                  flex: "1",
                  overflowY: "scroll",
                  height: "50vh",
                  width: "100%",
                  padding: 0,
                }}
                dataSource={lawyers}
                renderItem={(data, i: number) => (
                  <LawyerInputComponent
                    data={data}
                    index={i}
                    changeLawyerData={changeLawyerData}
                    handleRemoveLawyer={handleRemoveLawyer}
                  />
                )}
              />
              <Button
                title="Add lawyer"
                style={{ width: "100%", fontWeight: "bold" }}
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddLawyer}
              >
                Add lawyer
              </Button>
            </div>
          )}
          {page === 9 && (
            <div>
              <div style={{ fontSize: "30px", fontWeight: "bolder" }}>
                Write 3 good reviews given by your clients. Separate each review
                by a comma.
              </div>
              <List
                className="editor-scrollbar"
                style={{
                  flex: "1",
                  overflowY: "scroll",
                  height: "45vh",
                  width: "100%",
                  padding: 0,
                }}
                dataSource={reviews}
                renderItem={(data, i: number) => (
                  <ReviewInputComponent
                    data={data}
                    index={i}
                    changeReviewData={changeReviewData}
                    handleRemoveReview={handleRemoveReview}
                  />
                )}
              />
              <Button
                title="Add review"
                style={{ width: "100%", fontWeight: "bold" }}
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddReview}
              >
                Add review
              </Button>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            {/* {import.meta.env.DEV && (
              <button onClick={devFillOut}>Fill out with [Shaun & Benn]</button>
            )} */}
            {page !== 0 && (
              <Button
                type="primary"
                onClick={prevPage}
                className="custom-button"
                style={{
                  width: 100,
                  height: 50,
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
                  height: 50,
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
                  height: 50,
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

const uploadButton = (
  <div
    style={{
      width: "120px",
      height: "120px",
      borderRadius: 12,
      border: "2px solid black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: 1,
      flexDirection: "column",
      background: "#ccc",
    }}
  >
    {/* {loading ? <LoadingOutlined /> : } */}
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const inputStyle = {
  backgroundColor: "transparent",
  color: "black",
  border: "2px solid black",
  // outline: "2px solid red",
  fontSize: 20,
  height: "50%",
  borderRadius: 4,
};

function LawyerInputComponent({
  data,
  index,
  changeLawyerData,
  handleRemoveLawyer,
}: any) {
  const { id, name, description, cdnUUID } = data;

  const [currentUUID, setCurrentUUID] = useState<string>("");

  console.log("XZCZXCCZX data: ", data);

  async function beforeUpload(file: any) {
    console.log("Before upload");
    const result = await uploadDirect(file, {
      publicKey: config.pkUploadcare,
      store: "auto",
    });

    console.log("result: ", result);
    console.log("result.uuid: ", result.uuid);

    changeLawyerData(result.uuid, "cdnUUID", index);

    // setCurrentUUID()

    // handleDelete(tempOldUUID);

    return false;
  }

  function handleChange() {
    // changeLawyerData('nowa wartosc', "cdnUUID", index);
  }

  return (
    <div key={id}>
      <Flex
        style={{
          width: "100%",
          gap: 5,
          marginBottom: 20,
          // background: '#f00',
          height: "120px",
        }}
      >
        <Flex
          style={{
            width: "120px",
            borderRadius: 4,
            justifyContent: "flex-end",
          }}
        >
          <ImgCrop
            cropperProps={{
              style: {
                containerStyle: {
                  background: "#999",
                  backgroundPosition: "50%",
                  backgroundImage:
                    "url('https://upload.wikimedia.org/wikipedia/commons/6/66/White_grey_checkerboard.svg'",
                },
              },
              // required props set to default to avoid <ImgCrop /> error
              zoomSpeed: 1,
              restrictPosition: true,
              mediaProps: {},
            }}
            fillColor="#0000"
            modalProps={{
              okButtonProps: { style: { backgroundColor: "#1677ff" } },
            }}
            cropShape="round"
            rotationSlider
            aspect={1}
          >
            <Upload
              name="avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
                background: "#aaa",
                border: "2px solid black",
              }}
              // listType=""
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {cdnUUID ? (
                <img
                  src={getUrl(cdnUUID)}
                  alt="avatar"
                  className="relative overflow-hidden bg-cover bg-no-repeat"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: 4,
                    border: "2px solid black",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop>
        </Flex>
        <Flex
          vertical
          style={{ width: "70%", gap: 5 }}
          align="center"
          justify="center"
        >
          <Input
            defaultValue={name}
            onChange={(e: any) =>
              changeLawyerData(e.target.value, "name", index)
            }
            placeholder="Lawyer Name"
            style={inputStyle}
            // style={{}}
          />
          <Input
            defaultValue={description}
            onChange={(e: any) =>
              changeLawyerData(e.target.value, "description", index)
            }
            placeholder="Lawyer Description"
            style={inputStyle}
          />
        </Flex>
        <Flex>
          <Button
            type="default"
            onClick={() => handleRemoveLawyer(index)}
            style={{
              padding: 10,
              height: "100%",
              background: "#f55",
              borderRadius: 4,
              textAlign: "center",
              color: "black",
              border: "2px solid #a33",
            }}
          >
            <DeleteFilled style={{ margin: 0 }} />
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

function ReviewInputComponent({
  data,
  index,
  changeReviewData,
  handleRemoveReview,
}: any) {
  const { id, clientName, testimonial, cdnUUID } = data;

  const [currentUUID, setCurrentUUID] = useState<string>("");

  console.log("XZCZXCCZX data: ", data);

  async function beforeUpload(file: any) {
    console.log("Before upload");
    const result = await uploadDirect(file, {
      publicKey: config.pkUploadcare,
      store: "auto",
    });

    console.log("result: ", result);
    console.log("result.uuid: ", result.uuid);

    changeReviewData(result.uuid, "cdnUUID", index);

    // setCurrentUUID()

    // handleDelete(tempOldUUID);

    return false;
  }

  // async function beforeUpload(file: any){
  //     console.log("Before upload")
  //     const result = await uploadDirect(file, {
  //       publicKey: config.pkUploadcare,
  //       store: 'auto',
  //     });

  //     console.log("result: ", result);
  //     console.log("result.uuid: ", result.uuid);

  //     changeReviewData(result.uuid, "cdnUUID", index);

  //     // setCurrentUUID()

  //     // handleDelete(tempOldUUID);

  //     return false;
  // }

  function handleChange() {
    // changeLawyerData('nowa wartosc', "cdnUUID", index);
  }

  return (
    <div key={id}>
      <Flex
        style={{
          width: "100%",
          gap: 5,
          marginBottom: 20,
          // background: '#f00',
          height: "120px",
        }}
      >
        <Flex
          style={{
            width: "120px",
            borderRadius: 4,
            justifyContent: "flex-end",
          }}
        >
          <ImgCrop
            cropperProps={{
              style: {
                containerStyle: {
                  background: "#999",
                  backgroundPosition: "50%",
                  backgroundImage:
                    "url('https://upload.wikimedia.org/wikipedia/commons/6/66/White_grey_checkerboard.svg'",
                },
              },
              // required props set to default to avoid <ImgCrop /> error
              zoomSpeed: 1,
              restrictPosition: true,
              mediaProps: {},
            }}
            fillColor="#0000"
            modalProps={{
              okButtonProps: { style: { backgroundColor: "#1677ff" } },
            }}
            cropShape="round"
            rotationSlider
            aspect={1}
          >
            <Upload
              name="avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
                background: "#aaa",
                border: "2px solid black",
              }}
              // listType=""
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {cdnUUID ? (
                <img
                  src={getUrl(cdnUUID)}
                  alt="avatar"
                  className="relative overflow-hidden bg-cover bg-no-repeat"
                  style={{
                    minWidth: "120px",
                    height: "120px",
                    borderRadius: 4,
                    border: "2px solid black",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop>
        </Flex>
        <Flex
          vertical
          style={{ width: "90%", gap: 5 }}
          align="center"
          justify="center"
        >
          <Input
            defaultValue={testimonial}
            onChange={(e: any) =>
              changeReviewData(e.target.value, "testimonial", index)
            }
            placeholder="Enter review here..."
            style={inputStyle}
          />
          <Input
            defaultValue={clientName}
            onChange={(e: any) =>
              changeReviewData(e.target.value, "clientName", index)
            }
            placeholder="Client Name"
            style={inputStyle}
            // style={{}}
          />
        </Flex>
        <Flex>
          <Button
            type="default"
            onClick={() => handleRemoveReview(index)}
            style={{
              padding: 10,
              height: "100%",
              background: "#f55",
              borderRadius: 4,
              textAlign: "center",
              color: "black",
              border: "2px solid #a33",
            }}
          >
            <DeleteFilled style={{ margin: 0 }} />
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

{
  /* <div className="relative overflow-hidden bg-cover bg-no-repeat" style={{
        backgroundPosition: '50%',
        backgroundImage: "url('https://ucarecdn.com/194ed0d0-5921-4684-8ae1-02bfd645d41c/_d65e891a18e343b9bccb0adb2a065aca.jpeg')",
        height: '100vh',
        width: '50vw'
    }} /> */
}

export default Survey;
