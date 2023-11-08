import { AlignCenterOutlined } from '@ant-design/icons';
import { Layout, Card, Row, Col, Button } from 'antd';
// import React from 'react';

// import "./ColorPallette.css";

function ColorPallette() {
  const groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color1 = '#';
    let color2 = '#';
    for (let i = 0; i < 6; i++) {
      color1 += letters[Math.floor(Math.random() * 16)];
      color2 += letters[Math.floor(Math.random() * 16)];
    }
    return `linear-gradient(to right, ${color1} 33%, ${color2} 33%, ${color2} 66%, ${color1} 66%)`;
  }

  // Create an array of random colors
  const colors = Array.from({length: 3*32}, getRandomColor);

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#262627' }}>
        <img src="https://ucarecdn.com/194ed0d0-5921-4684-8ae1-02bfd645d41c/_d65e891a18e343b9bccb0adb2a065aca.jpeg" alt="Your description" style={{ width: '100%', maxHeight: '100vh' }} />
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        {groups.map((group, index) => (
          <Card title={group} style={{ width: "80%", backgroundColor: 'transparent', border: 'none' }} key={index}>
            {[...Array(2)].map((_, i) => (
              <Row gutter={16} key={i} justify={"center"}>
                {[...Array(4)].map((_, j) => (
                  <Col key={j}>
                    <Button style={{ 
                        width: 80, 
                        height: 20, 
                        borderRadius: 30, 
                        margin: 10,
                        background: colors[i*4+j], 
                        border: 'none'
                    }} />
                  </Col>
                ))}
              </Row>
            ))}
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default ColorPallette;
