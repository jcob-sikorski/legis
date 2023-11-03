import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../menu';

// Window Components
// import Interface from './Interface';
// import Visualisation from './Visualisation';

const SiteSettigns: React.FC = () => {
  return (
    <Layout hasSider style={{minHeight: '100vh'}}>
        <Sidebar/>
      {/* <Visualisation data={data} />
      <Interface setJson={setJson} json={json} processJson={processJson} /> */}
    </Layout>
  );
};

export default SiteSettigns;