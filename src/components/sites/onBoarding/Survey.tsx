import React, { useState, ReactNode } from 'react';
import { Layout, Typography, Form, Input, Select, Button, Checkbox, Radio } from 'antd';
import { useSpring, animated } from '@react-spring/web';

import './Survey.css';

const { Title } = Typography;
const { Option } = Select;

function Survey() {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [animationProps, setAnimationProps] = useState({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 220 * 4, friction: 120 / 4 },
  });

  const nextPage = () => {
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

  function AnimatedPage({ children }: { children: ReactNode }) {
    const animation = useSpring(animationProps);
  
    return (
      <animated.div style={{ ...animation }}>
        {children}
      </animated.div>
    );
  };

  return (
    <Layout style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#262627' }}>
        <img src="https://ucarecdn.com/a04c4d65-1938-45af-8370-94a7afd7712c/tempImageVBrM6v.heic" alt="Your description" style={{ width: '100%' }} />
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Form
          name="survey"
          layout="vertical"
          size='large'
          style={{ maxWidth: '80%' }}
        >
          {page === 0 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What is the name of your law firm?</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </AnimatedPage>
          )}
          {page === 1 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What is your main practice area? (e.g., Family Law)</div>
              <div className="custom-select">
                <Select 
                  placeholder="Select your main practice area" 
                  style={{
                    width: '100%', 
                    marginTop: '10px',
                    borderRadius: '4px',
                    borderColor: '#1890ff',
                  }}
                  dropdownStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Option value="Banking and Debt finance Law">Banking and Debt finance Law</Option>
                  <Option value="Charity Law">Charity Law</Option>
                  <Option value="Civil litigation dispute resolution law">
                    Civil litigation dispute resolution law
                  </Option>
                  <Option value="Commercial law">Commercial law</Option>
                  <Option value="Arbitration">Arbitration</Option>
                  <Option value="Aviation Law">Aviation Law</Option>
                  <Option value="Construction Law">Construction Law</Option>
                  <Option value="Consumer Law">Consumer Law</Option>
                  <Option value="Corporate Law">Corporate Law</Option>
                  <Option value="Criminal Law">Criminal Law</Option>
                  <Option value="Employment Law">Employment Law</Option>
                  <Option value="Environmental Law">Environmental Law</Option>
                  <Option value="Family Law">Family Law</Option>
                  <Option value="Real-estate law">Real-estate law</Option>
                  <Option value="Human Rights Law">Human Rights Law</Option>
                  <Option value="Immigration Law">Immigration Law</Option>
                  <Option value="Energy & Infrastructure Law">Energy & Infrastructure Law</Option>
                  <Option value="Insurance Law">Insurance Law</Option>
                  <Option value="Intellectual Property Law">Intellectual Property Law</Option>
                  <Option value="Personal Injury Law">Personal Injury Law</Option>
                  <Option value="Property Law">Property Law</Option>
                  <Option value="Public company & equity finance law">
                    Public company & equity finance law
                  </Option>
                  <Option value="Restructuring & insolvency law">Restructuring & insolvency law</Option>
                  <Option value="Competition Law">Competition Law</Option>
                  <Option value="Maritime Law">Maritime Law</Option>
                  <Option value="Sports Law">Sports Law</Option>
                  <Option value="Tax law">Tax law</Option>
                  <Option value="Gaming Law">Gaming Law</Option>
                </Select>
              </div>
            </AnimatedPage>
          )}
          {page === 2 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Write a one-sentence description of your law firm</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </AnimatedPage>
          )}
          {page === 3 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What smaller practice areas do you specialize in? (E.g., Divorce settlement, custody claims, drafting wills, etc)</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </AnimatedPage>
          )}
          {page === 4 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>How does your law firm stand out?</div>
              <div className="custom-checkbox">
                <Checkbox.Group>
                  <Checkbox value="Work ethic - We work harder than anyone else." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Work ethic - We work harder than anyone else.
                  </Checkbox>
                  <Checkbox value="Clarity-focused: We are problem solvers at heart." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Clarity-focused: We are problem solvers at heart.
                  </Checkbox>
                  <Checkbox value="Domain experts - We are experts at what we do." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Domain experts - We are experts at what we do.
                  </Checkbox>
                  <Checkbox value="Accessible - We make sure quality legal help reaches as many people as possible." style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Accessible - We make sure quality legal help reaches as many people as possible.
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </AnimatedPage>
          )}
          {page === 5 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Which of these statements best represents your law firm?</div>
              <Radio.Group className="custom-radio">
                <Radio value="Gritty - We aren’t afraid to get our hands dirty" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Gritty - We aren’t afraid to get our hands dirty
                </Radio>
                <Radio value="Passionate - We are going to do everything to make sure our client is happy" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Passionate - We are going to do everything to make sure our client is happy
                </Radio>
                <Radio value="Compassionate & Strong - we look after our clients always, especially when things get rough" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Compassionate & Strong - we look after our clients always, especially when things get rough
                </Radio>
                <Radio value="Fearless - We aren’t afraid to take on big challenges. We take them head on." style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
                  Fearless - We aren’t afraid to take on big challenges. We take them head on.
                </Radio>
              </Radio.Group>
            </AnimatedPage>
          )}
          {page === 6 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>What values are most important at your law firm?</div>
              <div className="custom-checkbox">
                <Checkbox.Group>
                  <Checkbox value="Reliability" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Reliability
                  </Checkbox>
                  <Checkbox value="Loyalty & Trust" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Loyalty & Trust
                  </Checkbox>
                  <Checkbox value="Integrity" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Integrity
                  </Checkbox>
                  <Checkbox value="Excellence" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Excellence
                  </Checkbox>
                  <Checkbox value="Collaboration" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                    Collaboration
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </AnimatedPage>
          )}
          {page === 7 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Name your lawyers and write a one-sentence description about your lawyer.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </AnimatedPage>
          )}
          {page === 8 && (
            <AnimatedPage>
              <div style={{ fontSize: '50px', fontWeight: 'bolder' }}>Write 3 good reviews given by your clients. Separate each review by a comma.</div>
              <div style={{ borderBottom: "2px solid black" }}>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderColor: "transparent",
                    fontSize: 40
                  }}
                  bordered={false}
                />
              </div>
            </AnimatedPage>
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
          {page !== 8 && (
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
        </div>
        </Form>
      </div>
  </Layout>
);
}

export default Survey;