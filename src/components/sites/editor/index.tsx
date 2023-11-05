import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { DEV_START_JSON } from './const';

// Window Components
import Interface from './Interface';
import Visualisation from './Visualisation';
import { useParams } from 'react-router-dom';
import ChooseTemplateModal from './modals/ChooseTemplateModal';


import { v4 as uuidv4 } from 'uuid';


const Editor: React.FC = () => {

  const { site_id } = useParams();
  console.warn("site_id editor", site_id);

  

  const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState<any[]>([]);

  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const [isAddingNewSection, setIsAddingNewSection] = useState<boolean>(false);

  function processJson(json: string) {
    // If is able to parse json, then parse it and set to data. If not, display error in console, but don't crash app.
    try {
        setData(JSON.parse(json))
    } catch {
        console.warn("Custom Error: JSON Formatting Error!")
    }
  }

  function processData(data: any[]) {
    // If is able to parse json, then parse it and set to data. If not, display error in console, but don't crash app.
    try {
      if (json != JSON.stringify(data))
        setJson(JSON.stringify(data))
    } catch {
        console.warn("Custom Error: JSON Parsing Error!")
    }
  }

  // shared functions

  function onAddSection() {
    setIsAddingNewSection(true);
  }

  function onTemplateSelected(template_id: string) {
    const section_id = uuidv4()
    setData([
      ...data, 
      { 
        template_id,
        section_id,
      }
    ]);
    setSelectedSectionId(section_id);
    setSelectedTemplateId(template_id);
  }

  function checkIfNoSections() {
    return data && data.length === 0;
  }

  

  // useEffect(() => {
  //   if (json) processJson(json)
  // }, [json])

  useEffect(() => {
    if (data) processData(data)
  }, [data])

  return (
    <Layout hasSider style={{minHeight: '100vh'}}>
      <Visualisation 
        data={data} 
        functions={{
          onAddSection,
          checkIfNoSections,
          setSelectedSectionId,
          setSelectedTemplateId
        }} 
        // setSelectedTemplateId={setSelectedTemplateId}
        variables={{
          selectedSectionId,
          selectedTemplateId,
        }} 
      />
      <Interface 
        setJson={setJson} 
        json={json}
        data={data}
        setData={setData}
        processJson={processJson} 
        functions={{
          onAddSection,
          setSelectedSectionId,
          setSelectedTemplateId,
        }}
        variables={{
          selectedSectionId,
          selectedTemplateId,
        }} 
      />
      <ChooseTemplateModal onTemplateSelected={onTemplateSelected} open={isAddingNewSection} setOpen={setIsAddingNewSection} />
    </Layout>
  );
};

export default Editor;