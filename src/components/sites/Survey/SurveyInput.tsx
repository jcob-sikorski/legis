import { Input } from 'antd';

import Questionnaire from '../../../models/Questionnaire';

export function SurveyInput ({ question, value, page, fields, fieldValues, updateField }: any) {
  return (
    <div>
      <div style={{ fontSize: '30px', fontWeight: 'bolder' }}>{question}</div>
      <div style={{ borderBottom: "2px solid black" }}>
        <Input
          value={fieldValues[value]}
          onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
          style={{
            backgroundColor: "transparent",
            color: "black",
            borderColor: "transparent",
            fontSize: 20
          }}
          bordered={false}
        />
      </div>
    </div>
  );
}