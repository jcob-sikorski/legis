import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';
import Sidebar from '../menu';
import Site from '../../../models/Site';
import { useRedux } from '../../../hooks/useRedux';
import * as Realm from 'realm-web';
import { config } from '../../../config';

const SiteSettings: React.FC = () => {
  const [site] = useRedux('site');

  const [siteSettings, setSiteSettings] = useState<Site | {}>({});
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string | number | string[] }>({});

  const app = new Realm.App({ id: config.appId });

  const mongodb = app.currentUser!.mongoClient('mongodb-atlas');
  const siteCollection = mongodb.db('legis').collection('Site');

  useEffect(() => {
    if (site) {
      setSiteSettings(site);
      setFieldValues({});
      for (const key of Object.keys(site)) {
        setFieldValues((prevFieldValues) => ({
          ...prevFieldValues,
          [key]: site[key],
        }));
      }
    }
  }, [site]);

  const updateField = async (fieldName: keyof Site, value: string | number | string[]) => {
    const updatedValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(updatedValues);
  };

  const updateDBField = async (fieldName: keyof Site) => {
    try {
      const updateResult = await siteCollection.updateOne(
        { _id: new Realm.BSON.ObjectId(site!._id) },
        { $set: { [fieldName]: fieldValues[fieldName] } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);
    } catch (error) {
      console.error('Error updating document in MongoDB:', error);
    }
  }

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div>
        {Object.keys(siteSettings).map((fieldName) => (
          <div key={fieldName}>
            <Input
              placeholder={fieldName}
              value={fieldValues[fieldName] || ''}
              onChange={(e) => updateField(fieldName as keyof Site, e.target.value)}
              size="large"
            />
            <Button onClick={() => updateDBField(fieldName as keyof Site)}>
              Set
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SiteSettings;
