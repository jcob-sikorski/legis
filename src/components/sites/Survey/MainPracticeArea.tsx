import { Select } from 'antd';

import Questionnaire from '../../../models/Questionnaire';

const { Option } = Select;

export function MainPracticeArea ({ page, fields, fieldValues, updateField }: any) {
  return (
    <div>
      <div style={{ fontSize: '30px', fontWeight: 'bolder' }}>What is your main practice area? (e.g., Family Law)</div>
      <div className="custom-select">
        <Select 
          placeholder="Select your main practice area" 
          value={fieldValues?.MainPracticeArea ? fieldValues?.MainPracticeArea.toString() : ''}
          onChange={(value: string) => updateField(fields[page] as keyof Questionnaire, value)}
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
  </div>
  );
}