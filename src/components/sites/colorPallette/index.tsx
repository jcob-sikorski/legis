import { Layout, Card, Row, Col, Button, List } from 'antd';

function ColorPallette() {
  const groups = ['Work Ethic', 'Clarity & Problem-solvers', 'Expert & Authority', 'Accessible', 'Gritty', 'Passionate', 'Compassionate & strong', 'Fearless', 'Reliability', 'Loyalty & trust', 'Integrity', 'Excellence', 'Collaboration & working together'];

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color1 = '#';
    let color2 = '#';
    let color3 = '#';
    for (let i = 0; i < 6; i++) {
      color1 += letters[Math.floor(Math.random() * 16)];
      color2 += letters[Math.floor(Math.random() * 16)];
      color3 += letters[Math.floor(Math.random() * 16)];
    }
    return `linear-gradient(to right, ${color1} 33%, ${color2} 33%, ${color2} 66%, ${color3} 66%)`;
  }

  // Create an array of random colors
  const colors = Array.from({length: 8*2*4*groups.length}, getRandomColor);

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
              {[...Array(2)].map((_, i) => (
                <Row gutter={16} key={i} justify={"center"}>
                  {[...Array(4)].map((_, j) => (
                    <Col key={j}>
                      <Button style={{ 
                          width: 80, 
                          height: 20, 
                          borderRadius: 30, 
                          margin: 10,
                          background: colors[index*8*2*4 + i*4 + j], 
                          border: 'none'
                      }} />
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
