import { Layout, Card, Row, Col, Button, List } from 'antd';

import { valueColorMappping, colorHexMapping } from './colorMappings.tsx'
import { useState, useEffect } from 'react';
import Visualisation from '../editor/Visualisation.tsx';
import { config } from '../../../config.tsx';
import { useParams } from 'react-router-dom';

import * as Realm from "realm-web";

function ColorPallette() {

  const {site_id} = useParams();

  const app = new Realm.App({ id: config.appId });
  const currentUserID = app.currentUser!.id;
  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  const [data, setData] = useState<any>();
  const [buttonColor, setButtonColor] = useState("");

  const groups = ['Work Ethic', 'Clarity & Problem-solvers', 'Expert & Authority', 'Accessible', 'Gritty', 'Passionate', 'Compassionate & strong', 'Fearless', 'Reliability', 'Loyalty & trust', 'Integrity', 'Excellence', 'Collaboration & working together'];

  // Function to generate a random color
  const getColor = (group: string, buttonNumber: number, i: number, j: number) => {
    let basicColors = valueColorMappping[group];

    let color1 = colorHexMapping[basicColors[0]][buttonNumber];
    let color2 = colorHexMapping[basicColors[1]][buttonNumber];
    let color3 = colorHexMapping[basicColors[2]][buttonNumber];

    document.documentElement.style.setProperty('--legis-color-1', `${color1}`);
    document.documentElement.style.setProperty('--legis-color-2', `${color2}`);
    document.documentElement.style.setProperty('--legis-color-3', `${color3}`);

    return `linear-gradient(to right, ${color1} 33%, ${color2} 33%, ${color2} 66%, ${color3} 66%)`;
  }

  const handleClick = (color: string) => {
    setButtonColor(color);
  };

  useEffect(() => {
    if (buttonColor) {
      const regex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
      const matches = buttonColor.match(regex);
      const uniqueMatches = Array.from(new Set(matches));
      console.log(uniqueMatches);
    }
  }, [buttonColor]);

  useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({ _id: new Realm.BSON.ObjectId(site_id) });
  
        if (result.length > 0 && result[0].hasOwnProperty("bodyTemplate")) {
            console.log("Found a site with bodyTemplate:", result[0].bodyTemplate);
            setData(result[0].bodyTemplate);
          }
        else {
          console.log("Site doesn't have the bodyTemplate yet.");
        }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
    }
  
    getData();
  }, []); // Include site_id in the dependency array if it may change

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#262627', maxWidth: '1000px', width: '100%' }}>
        Hello
        <Visualisation data={data} mode='showcase' />
        {/* <img src="https://ucarecdn.com/194ed0d0-5921-4684-8ae1-02bfd645d41c/_d65e891a18e343b9bccb0adb2a065aca.jpeg" alt="Your description" style={{ width: '100%', maxHeight: '100vh' }} /> */}
      </div>
      <List
        style={{ flex: '1', overflowY: 'scroll', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        dataSource={groups}
        renderItem={(group, index) => (
          <List.Item>
            <Card title={group} style={{ width: "100%", backgroundColor: 'transparent', border: 'none' }}>
              {[...Array(3)].map((_, i) => (
                <Row gutter={16} key={i} justify={"center"}>
                  {[...Array(4)].map((_, j) => (
                    <Col key={j}>
                      <Button 
                        onClick={() => handleClick(getColor(group, i * 4 + j, i, j))}
                        style={{ 
                            width: 80, 
                            height: 20, 
                            borderRadius: 30, 
                            margin: 10,
                            background: getColor(group, i * 4 + j, i, j),
                            border: 'none'
                        }} 
                      />
                    </Col>
                  ))}
                </Row>
              ))}
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  );
}

export default ColorPallette;
