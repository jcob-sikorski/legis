import { Layout, Card, Row, Col, Button, List } from 'antd';

import { valueColorMappping, colorHexMapping } from './colorMappings.tsx'
import { useState, useEffect } from 'react';

function ColorPallette() {
  const [buttonColor, setButtonColor] = useState("");

  const groups = ['Work Ethic', 'Clarity & Problem-solvers', 'Expert & Authority', 'Accessible', 'Gritty', 'Passionate', 'Compassionate & strong', 'Fearless', 'Reliability', 'Loyalty & trust', 'Integrity', 'Excellence', 'Collaboration & working together'];

  // Function to generate a random color
  const getColor = (group: string, buttonNumber: number, i: number, j: number) => {
    let basicColors = valueColorMappping[group];

    let color1 = colorHexMapping[basicColors[0]][buttonNumber];
    let color2 = colorHexMapping[basicColors[1]][buttonNumber];
    let color3 = colorHexMapping[basicColors[2]][buttonNumber];
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

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#262627' }}>
        <img src="https://ucarecdn.com/194ed0d0-5921-4684-8ae1-02bfd645d41c/_d65e891a18e343b9bccb0adb2a065aca.jpeg" alt="Your description" style={{ width: '100%', maxHeight: '100vh' }} />
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
