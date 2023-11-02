import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { DEV_START_JSON } from './const';

// Window Components
import Interface from './Interface';
import Visualisation from './Visualisation';

const Editor: React.FC = () => {

  const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState([]);

  function processJson(json: string) {
    // If is able to parse json, then parse it and set to data. If not, display error in console, but don't crash app.
    try {
        setData(JSON.parse(json))
    } catch {
        console.warn("Custom Error: JSON Formatting Error!")
    }
  }

  useEffect(() => {
    if (json) processJson(json)
  }, [json])

  return (
    <Layout hasSider style={{minHeight: '100vh'}}>
      <Visualisation data={data} />
      <Interface setJson={setJson} json={json} processJson={processJson} />
    </Layout>
  );
};

export default Editor;