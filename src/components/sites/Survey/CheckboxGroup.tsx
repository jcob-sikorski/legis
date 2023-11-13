import React from 'react';
import { Checkbox } from 'antd';

import Questionnaire from '../../../models/Questionnaire';

export function CheckboxGroup({ value, question, values, page, fields, fieldValues, updateField }: any) {
  return (
    <div>
      <div style={{ fontSize: '30px', fontWeight: 'bolder' }}>{question}</div>
      <div className="custom-checkbox">
        <Checkbox.Group
          value={Array.isArray(fieldValues[value]) ? fieldValues[value] : [fieldValues[value]]}
          onChange={(checkedValues) => updateField(fields[page] as keyof Questionnaire, checkedValues as string[])}
        >
          {values.map((value: string) => (
            <Checkbox
              key={value}
              value={value}
              style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}
            >
              {value}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}
