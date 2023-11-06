import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import { useParams } from 'react-router-dom';

// Window Components
// import VisualGuide from './VisualGuide';
import Questions from './Questions';

const OnBoarding: React.FC = () => {
  // const { site_id } = useParams();
  
  return (
    <Layout hasSider style={{minHeight: '100vh'}}>
      {/* <VisualGuide/> */}
      <Questions/>
    </Layout>
  )
};

export default OnBoarding;