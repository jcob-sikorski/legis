import { Layout, Card, Row, Col, List, Flex, Button } from 'antd';

import { valueColorMapping } from './colorMappings.tsx'
import { useState, useEffect } from 'react';
import Visualisation from '../editor/Visualisation.tsx';
import { config } from '../../../config.tsx';
import { useNavigate, useParams } from 'react-router-dom';

import * as Realm from "realm-web";

const SIDE_BAR_WIDTH = 600;
const DEFAULT_COLORS = ["#5D74CF", "#8D88C7", "#4D4D4D"]

function ColorPalette() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);
  const {site_id} = useParams();

  const app = new Realm.App({ id: config.appId });

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  const [data, setData] = useState<any>();
  const [buttonColor, setButtonColor] = useState("");

  const groups = ['Monochromatic', 'Neutral', 'Bright', 'Bold'];

  function updateCssStyles(colors: string[]) {
    document.documentElement.style.setProperty('--legis-color-1', `${colors[0]}`);
    document.documentElement.style.setProperty('--legis-color-2', `${colors[1]}`);
    document.documentElement.style.setProperty('--legis-color-3', `${colors[2]}`);
  }

  const getColor = (group: string, index: number) => {
    let color1 = valueColorMapping[group][index][0];
    let color2 = valueColorMapping[group][index][1];
    let color3 = valueColorMapping[group][index][2];
    return `linear-gradient(to right, ${color1} 33%, ${color2} 33%, ${color2} 66%, ${color3} 66%)`;
  }

  const handleClick = (color: string, index: number) => {
    setSelectedButtonIndex(index);
    setButtonColor(color);
    console.log("SELECTED BUTTON INDEX: ", index);
  };

  useEffect(() => {
    if (buttonColor) {
      const regex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
      const matches = buttonColor.match(regex);
      const uniqueMatches = Array.from(new Set(matches));
      updateCssStyles(uniqueMatches);
    } else {
      updateCssStyles(DEFAULT_COLORS);
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

  const navigate = useNavigate();

  function onNext() {
    navigate(`/editor/${site_id}`);
  }

  return (
    <Layout style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      }}>
      <Flex id='visualisation-container' className='editor-scrollbar' style={{
        maxHeight: '100vh', 
        overflowY: 'scroll', 
        justifyContent: 'center', 
        width: '100%',
        marginRight: SIDE_BAR_WIDTH,
        }}>
        <Visualisation data={data} mode='showcase' />
      </Flex>
      <div style={{width: '100%', maxWidth: SIDE_BAR_WIDTH, position: 'absolute', right: 0}}>
        <Flex align='center' justify='center' style={{padding: 10}}>
          <Button onClick={onNext} style={{background: '#000', color: '#fff'}} size='large'>
            NEXT
          </Button>
        </Flex>
        <List
          style={{ 
            flex: '1', 
            // overflowY: 'scroll', 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
          }}
          dataSource={groups}
          renderItem={(group, index) => (
              <Card title={group} style={{ width: "100%", backgroundColor: 'transparent', border: 'none' }}>
                {[...Array(2)].map((_, i) => (
                  <Row gutter={16} key={i} justify={"center"}>
                    {[...Array(4)].map((_, j) => (
                      <Col key={j}>
                        <button 
                          onClick={() => handleClick(getColor(group, i*4+j), index*10 + i*4+j)}
                          style={{ 
                            width: 80, 
                            height: 20,
                            marginBottom: 10,
                            background: getColor(group, i*4+j),
                            border: index*10 + i*4+j === selectedButtonIndex ? 'thin pink' : 'none',
                            borderRadius: 5
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                ))}
              </Card>
          )}
        />
      </div>
    </Layout>
  );
}

export default ColorPalette;
