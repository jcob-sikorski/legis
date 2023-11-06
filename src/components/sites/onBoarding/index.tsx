import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import { useParams } from 'react-router-dom';

// Window Components
// import VisualGuide from './VisualGuide';
import Survey from './Survey';

const OnBoarding: React.FC = () => {
  // const { site_id } = useParams();
  
  return (
    <Layout>
      {/* <VisualGuide/> */}
      <Survey/>
    </Layout>
  )
};

export default OnBoarding;