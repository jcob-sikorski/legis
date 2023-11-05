import { Flex, Layout, Space } from 'antd';
import { BAR_WIDTH } from './const';

// Templates
import TContact1 from '../../templates/TContact1';
import TContact2 from '../../templates/TContact2';
import TContact3 from '../../templates/TContact3';
import THero1 from '../../templates/THero1';
import Title from 'antd/es/typography/Title';

const { Content, Footer } = Layout;

function Visualisation({
    data, // if anything arrives here in this data prop it's already "sanitized" and is an object structure. NOT a JSON! (You can access its values like data?.email or data?.phone, etc., but you can't change it here)
    functions,
    variables,
} : any) {

    const { onAddSection, checkIfNoSections, setSelectedSectionId, setSelectedTemplateId } = functions;
    const { selectedSectionId, selectedTemplateId, isDevMode } = variables;

    const hasNoSections = checkIfNoSections();

    async function onSectionClick(section: any) {
        setSelectedSectionId((_: string) => section.section_id);
        setSelectedTemplateId((_: string) => section.template_id);
    }

    function switchTemplate(data: any) {
        switch(data.template_id) {
            default: case 'THero1':
                return <THero1 data={data} />
            case 'TContact1':
                return <TContact1 data={data} />
            case 'TContact2':
                return <TContact2 data={data} />
            case 'TContact3':
                return <TContact3 data={data} />
        }
      }

    const selectedSectionStyle = {outline: '4px solid #ff000077', outlineOffset: '-2px'}

    return ( <Layout className="site-layout" style={{ marginRight: BAR_WIDTH }}>
    <Content style={{ maxWidth: '1200px', margin: '24px 16px 0', overflow: 'initial' }}>
        {isDevMode && <>
            [selectedSectionId]: {selectedSectionId}<br/>
            [selectedTemplateId]: {selectedTemplateId}<br/>
        </>}
        {data && data.map((s: any) => <div onClick={() => onSectionClick(s)} style={selectedSectionId === s.section_id ? selectedSectionStyle : {}}>
            {isDevMode && <>
                [section_id]: {s.section_id}
            </>}
            {switchTemplate(s)}
        </div>)}
    </Content>
    <Flex align='center' justify='center' style={{minHeight: hasNoSections ? '360px' : '100px'}}>
        <Title style={{cursor:'pointer'}} onClick={onAddSection}>+ New section</Title>
    </Flex>
    <Footer style={{ textAlign: 'center' }}>Legis - Footer</Footer>
  </Layout> );
}

export default Visualisation;