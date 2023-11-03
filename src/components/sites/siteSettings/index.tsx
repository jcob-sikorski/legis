import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd'; // Import Input and Button from 'antd'
import Sidebar from '../menu';

// Schema interface
interface SiteSettingsSchema {
  user_id: string;
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  deleted: number;
  image_url: string;
  site_url: string;
  status: number;
  share_image_url: string;
  favicon_url: string;
  action: number;
  type: string[];
  host: string[];
  target: string[];
}

const SiteSettings: React.FC = () => {
  // Placeholder values
  const defaultSiteSettings: SiteSettingsSchema = {
    user_id: 'User ID Placeholder',
    _id: 'ID Placeholder',
    title: 'Title Placeholder',
    subtitle: 'Subtitle Placeholder',
    description: 'Description Placeholder',
    deleted: 0, // Placeholder for numeric fields
    image_url: 'Image URL Placeholder',
    site_url: 'Site URL Placeholder',
    status: 0, // Placeholder for numeric fields
    share_image_url: 'Share Image URL Placeholder',
    favicon_url: 'Favicon URL Placeholder',
    action: 0, // Placeholder for numeric fields
    type: [], // Placeholder for arrays
    host: [], // Placeholder for arrays
    target: [], // Placeholder for arrays
  };

  // State to store the site settings
  const [siteSettings, setSiteSettings] = useState<SiteSettingsSchema>(defaultSiteSettings);

  // Function to update a field in the state
  const updateField = (fieldName: keyof SiteSettingsSchema, value: string | number | string[]) => {
    setSiteSettings({
      ...siteSettings,
      [fieldName]: value,
    });
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div>
        {Object.keys(siteSettings).map((fieldName) => (
          <div key={fieldName}>
            <Input
              placeholder={fieldName}
              onChange={(e) => updateField(fieldName as keyof SiteSettingsSchema, e.target.value)}
              size='large'
            />
            <Button onClick={() => updateField(fieldName as keyof SiteSettingsSchema, 'New Value')}>
              Set
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SiteSettings;
