import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Row, Col, Flex } from "antd";
import SiteCard from "./SiteCard";
import * as Realm from "realm-web";
import { useApp } from "./../../RealmApp";
import Site from "../../../models/Site";
import Sidebar from "../menu";
import { config } from "../../../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./../../../index.css";
import {
  getBodyTemplateFromTemplateSetId,
  switchTemplateSet,
  updateCssStyles,
} from "../../../utils";
import Logo from "../menu/Logo";

const { Content } = Layout;

export const Dashboard: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);

  const navigate = useNavigate();
  const { email } = useParams();
  // console.log('email: ', email);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const app: any = useApp();

  const currentUserID = app.currentUser!.id;

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");
  const user_collection = mongodb.db("legis").collection("User");
  const survey_collection = mongodb.db("legis").collection("Questionnaire");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  React.useEffect(() => {
    console.log("sites: ", sites);
  }, [sites]);

  React.useEffect(() => {
    const insertUser = async () => {
      if (email) {
        // Create a new user document
        const newUser = {
          _id: new Realm.BSON.ObjectId(app.currentUser!.id),
          email: email,
        };

        // Insert the new user document into the collection
        const result = await user_collection.insertOne(newUser);
        console.log("Created user:", JSON.stringify(result));
      }
    };

    insertUser();

    console.log("creating? ", sessionStorage.getItem("legis_template_set_id"));
    if (sessionStorage.getItem("legis_template_set_id")) {
      createSite();
    }
  }, []);

  const userQuery = { user_id: new Realm.BSON.ObjectId(currentUserID) };

  React.useEffect(() => {
    async function searchDocuments() {
      try {
        const result = await site_collection.find(userQuery);
        const documents = result.map((doc: any) => {
          // Convert user_id and _id to strings
          const modifiedDoc = {
            ...doc,
            user_id: doc.user_id.toString(),
            _id: doc._id.toString(),
          };
          return modifiedDoc;
        });
        console.log("Found documents:", JSON.stringify(documents));
        setSites(documents);
      } catch (error) {
        console.error("Error searching documents:", error);
      }
    }

    searchDocuments();
  }, []);

  async function createSite() {
    if (sites.length === 0) {
      try {
        const data = {
          email: email,
          eventName: "onboardingGuidelines",
        };

        const tsx = {
          method: "post",
          url: "https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://app.loops.so/api/v1/events/send",
          headers: {
            Authorization: `Bearer ${config.loopsKey}`,
          },
          data: data,
        };

        const response = await axios(tsx);

        console.log("LOOPS RESPONSE: ", response);
      } catch {
        console.warn("ERROR SENDING LOOPS onboardingGuidelines");
      }
    }

    // seeded template id section

    let templateIds: string[] = [];
    const sessionTemplateSetId =
      sessionStorage.getItem("legis_template_set_id") || "";
    if (sessionTemplateSetId) {
      // legis_template_set_id exists in session storage
      templateIds = switchTemplateSet(sessionTemplateSetId);
      sessionStorage.removeItem("legis_template_set_id");
    }

    const newId = new Realm.BSON.ObjectId();

    type Site = {
      user_id: Realm.BSON.ObjectId;
      _id: Realm.BSON.ObjectId;
      title: string;
      description: string;
      site_url: string;
      domainConnected: number;
      favicon_url: string;
      cname: string;
      template_colors: string[];
      body_template?: any;
    };

    const newSite: Site = {
      user_id: new Realm.BSON.ObjectId(currentUserID),
      _id: newId,
      title: `Title ${sites.length}`,
      description: "Your Site Description",
      site_url: "",
      domainConnected: 0,
      favicon_url: "",
      cname: "",
      template_colors: ["#efefee", "#a3826c", "#3e3d3d"]
      // body_template: templateIds ? getBodyTemplateFromTemplateSetId(templateIds),
    };
    if (templateIds.length > 0) {
      newSite.body_template = getBodyTemplateFromTemplateSetId(templateIds);
    }

    if (templateIds.length > 0) {
      newSite.body_template = getBodyTemplateFromTemplateSetId(templateIds);
    }

    const site_id: string = newSite._id.toString();

    try {
      const result = await site_collection.insertOne(newSite);
      console.log("Created site:", JSON.stringify(result));

      // updateCssStyles(["#efefee", "#a3826c", "#3e3d3d"]);

      navigate(`/survey/${site_id}`);

      // Create a new GitHub repository
      const githubRepoResponse = await axios.post(
        `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/user/repos`,
        {
          name: site_id,
          private: false, // Set to true if you want a private repository
        },
        {
          auth: {
            username: githubUsername,
            password: githubToken,
          },
        }
      );

      console.log("Created GitHub repository:", githubRepoResponse.data);

      setSites((prevSites) => [
        ...prevSites,
        {
          ...newSite,
          user_id: newSite.user_id.toString(),
          _id: site_id,
        },
      ]);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  }

  async function editSite(siteId: string) {
    navigate(`/editor/${siteId}`);
  }

  async function deleteSite(siteId: string) {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this site?"
    );

    if (!isConfirmed) {
      return; // If the user cancels the deletion, exit the function
    }
    try {
      // Find the site by its _id and get the associated GitHub repository name
      const site = sites.find((site) => site._id === siteId);

      if (site) {
        setSites((prevSites) =>
          prevSites.filter((site) => site._id !== siteId)
        );

        const site_deletion_result = await site_collection.deleteOne({
          _id: new Realm.BSON.ObjectId(siteId),
        });

        const survey_deletion_result = await survey_collection.find({
          site_id: new Realm.BSON.ObjectId(siteId),
        });

        // Delete the GitHub repository
        const githubRepoName = site._id; // Assuming _id corresponds to the GitHub repository name
        const githubRepoDeleteResponse = await axios.delete(
          `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${githubRepoName}`,
          {
            auth: {
              username: githubUsername,
              password: githubToken,
            },
          }
        );

        console.log(
          "Deleted GitHub repository:",
          githubRepoDeleteResponse.status
        );
      } else {
        console.error("Site not found in the local database.");
      }
    } catch (error) {
      console.error("Error deleting site:", error);
    }
  }

  return (
    <>
      <Layout style={{ height: "calc(100vh - 46px)", display: "flex" }}>
        <Sidebar />
        <Layout>
          <Content style={{ background: colorBgContainer, padding: 0 }}>
            <Button
              type="primary"
              onClick={createSite}
              className="custom-button"
              style={{ marginLeft: "auto", height: 50 }} // Use marginLeft: 'auto' to push the button to the right
            >
              New Site
            </Button>
            <Flex
              style={{
                flexDirection: "column",
                maxWidth: 1000,
                marginInline: "auto",
                marginBottom: 50,
                padding: 10,
              }}
            >
              <Row gutter={[16, 24]} style={{ padding: 10 }}>
                {sites &&
                  sites.map((d: any) => (
                    <Col className="gutter-row" span={12}>
                      <SiteCard
                        site_id={d._id}
                        data={d}
                        onEdit={() => editSite(d._id)}
                        onClone={() => createSite()}
                        onDelete={() => deleteSite(d._id)}
                      />
                    </Col>
                  ))}
              </Row>
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
