import { Radio } from 'antd';

import Questionnaire from '../../../models/Questionnaire';

export function FirmRepresentation ({ page, fields, fieldValues, updateField }: any) {
  return (
    <div>
      <div style={{ fontSize: '30px', fontWeight: 'bolder' }}>Which of these statements best represents your law firm?</div>
      <Radio.Group 
        className="custom-radio" 
        value={fieldValues?.FirmRepresentation}
        onChange={(e) => updateField(fields[page] as keyof Questionnaire, e.target.value)}
      >
        <Radio value="Gritty - We aren’t afraid to get our hands dirty" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
          Gritty - We aren’t afraid to get our hands dirty
        </Radio>
        <Radio value="Passionate - We are going to do everything to make sure our client is happy" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
          Passionate - We are going to do everything to make sure our client is happy
        </Radio>
        <Radio value="Compassionate & Strong - we look after our clients always, especially when things get rough" style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
          Compassionate & Strong - we look after our clients always, especially when things get rough
        </Radio>
        <Radio value="Fearless - We aren’t afraid to take on big challenges. We take them head on." style={{ display: 'flex', alignItems: 'center', fontSize: 20, marginTop: 20, marginBottom: 20 }}>
          Fearless - We aren’t afraid to take on big challenges. We take them head on.
        </Radio>
      </Radio.Group>
    </div>
  );
}