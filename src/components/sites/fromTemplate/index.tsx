import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../RealmApp";
import { useEffect, useState } from "react";
import { Button, Col, Flex, Layout, Row } from "antd";
import Title from "antd/es/typography/Title";
import Visualisation from "../editor/Visualisation";
import { DEV_JSON_TO_INJECT } from "../editor/const";
import ScaledVisualisation from "../../scaledVisualisation";
import { getBodyTemplateFromTemplateSetId, switchTemplateSet } from "../../../utils";

import * as Realm from 'realm-web';
import { config } from "../../../config";
import axios from "axios";

function FromTemplate() {

  const {template_set_id}: any = useParams();
  
  if (template_set_id) {
    sessionStorage.setItem('legis_template_set_id', template_set_id);
    
    
    // console.log()
  }

  let mockData = JSON.parse(DEV_JSON_TO_INJECT);
  let templateIds = switchTemplateSet(template_set_id || "");
  mockData = mockData?.map((x: any, i: number) => i < templateIds?.length ? {...x, template_id: templateIds[i]} : x)

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const currentUser = app?.currentUser;

  const navigate = useNavigate();

  function onClick() {
    if (currentUser?.id) {
      // User has account! proceed to creating template
      // navigate('/dashboard');

      async function createSite() {
        // if (sites.length === 0) {
        //   try {
    
        //     const data = {
        //       email: email,
        //       eventName: "onboardingGuidelines"
        //     };
            
        //     const tsx = {
        //       method: 'post',
        //       url: 'https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://app.loops.so/api/v1/events/send',
        //       headers: { 
        //         Authorization: `Bearer ${config.loopsKey}`
        //       },
        //       data : data
        //     };
            
        //     const response = await axios(tsx);
            
        //     console.log("LOOPS RESPONSE: ", (response));
        //   } catch {
        //     console.warn("ERROR SENDING LOOPS onboardingGuidelines")
        //   }
        // }
        
        // seeded template id section
    
        let templateIds: string[] = [];
        const sessionTemplateSetId = sessionStorage.getItem('legis_template_set_id') || '';
        if (sessionTemplateSetId) {
          // legis_template_set_id exists in session storage
          templateIds = switchTemplateSet(sessionTemplateSetId);
          sessionStorage.removeItem('legis_template_set_id');
        }
    
        const newId = new Realm.BSON.ObjectId()
    
        const newSite = {
          user_id: new Realm.BSON.ObjectId(currentUser.id),
          _id: newId,
          title: `Title ${template_set_id}`,
          subtitle: "Created from the template set with id: " + template_set_id,
          description: "Created from the template set with id: " + template_set_id,
          // description: "Your Site Description",
          deleted: 0,
          image_url: "https://picsum.photos/200/300",
          site_url: "",
          status: 0,
          share_image_url: '',
          favicon_url: '',
          cname: '',
          template_colors: ["#efefee", "#a3826c", "#3e3d3d"],
          body_template: mockData,
        };
        
        const site_id: string = newSite._id.toString();
      
        try {
          const result = await site_collection.insertOne(newSite);
          console.log("Created site:", JSON.stringify(result));
    
          // updateCssStyles(["#efefee", "#a3826c", "#3e3d3d"]);
    
          navigate(`/color-palette/${site_id}`);
          console.log('Trying to naviage to editor!')
      
          // Create a new GitHub repository
          const githubRepoResponse = await axios.post(`https://api.github.com/user/repos`, {
            name: site_id,
            private: false, // Set to true if you want a private repository
          }, {
            auth: {
              username: githubUsername,
              password: githubToken,
            },
          });
      
          console.log("Created GitHub repository:", githubRepoResponse.data);
      
          // setSites((prevSites) => [...prevSites, {
          //   ...newSite,
          //   user_id: newSite.user_id.toString(),
          //   _id: site_id,
          // }]);
        } catch (error) {
          console.error("Error creating site:", error);
        }
      };

      createSite()

    } else {
      // User doesnt have an account! proceed to creating account. template_set_id is still stored in session storage.
      navigate('/signup');
    }
  }

  

  // useEffect(() => {

  //   if (currentUser?.id) {
  //     // User has account! proceed to creating template
  //     navigate('/dashboard');
  //   } else {
  //     // User doesnt have an account! proceed to creating account. template_set_id is still stored in session storage.
  //     navigate('/signup');
  //   }
  
  // }, [app]);

  const [mockBought, setMockBought] = useState(false);

  return (
    <Layout className="text-gray-400" style={{padding: 50, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Flex vertical className="my-5">
        <Title level={3} >Edit this template with Legis</Title>
        {mockBought ? <Title style={{textAlign: 'center', color: '#339'}} level={5}>Purchase succesful!</Title> : <Button onClick={() => setMockBought(true)} type='primary' className="bg-blue-500 font-semibold text-lg h-12">Buy for $0.00</Button>}
        {mockBought && <Button onClick={onClick} type='primary' className="bg-blue-500 font-semibold text-lg h-12">Click to edit</Button>}
      </Flex>
            <ScaledVisualisation data={mockData} mode='showcase' width="130vw" height="140vh" />
      </Layout>
  );
}

export default FromTemplate;
