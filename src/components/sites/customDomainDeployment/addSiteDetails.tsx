import { Layout, Typography, Button, Steps, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSite } from "../../../redux/actions";

import { useApp } from "../../RealmApp";
import * as Realm from "realm-web";

const { Step } = Steps;
const { Title } = Typography;

function AddSiteDetails() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { site_id } = useParams();

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  async function onContinue() {
    const site = await site_collection.findOne(
      { _id: new Realm.BSON.ObjectId(site_id) },
      { projection: { cname: 1 } }
    );

    dispatch(setSite(site));

    navigate("/overview-settings");
  }

  return (
    <Layout style={{ height: "100vh", backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: "50px",
        }}
      >
        <Steps current={2} labelPlacement={"vertical"} style={{ width: "50%" }}>
          <Step title="Add custom domain" />
          <Step title="Connect domain" />
          <Step title="Publish your site" />
        </Steps>
      </div>
      <Title
        level={1}
        style={{
          color: "black",
          fontWeight: "extra-bold",
          marginTop: "50px",
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        Add your site details
      </Title>
      <h2
        style={{
          fontSize: 18,
          fontWeight: "300",
          wordWrap: "break-word",
          lineHeight: "20px",
          textAlign: "center",
          alignSelf: "center",
          marginTop: 50,
        }}
      >
        Add a title, brief description, and upload images of your law firm on
      </h2>
      <h2
        style={{
          fontSize: 18,
          fontWeight: "300",
          wordWrap: "break-word",
          lineHeight: "20px",
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        your new website. Simply click the button below and go to your
      </h2>
      <h2
        style={{
          fontSize: 18,
          fontWeight: "300",
          wordWrap: "break-word",
          lineHeight: "20px",
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        “site settings”
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={onContinue}
          className="custom-button"
          type="primary"
          size="large"
          style={{ marginTop: 50 }}
        >
          Go to site settings
        </Button>
      </div>
    </Layout>
  );
}

export default AddSiteDetails;
