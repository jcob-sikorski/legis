import { Flex, Layout, Space } from 'antd';
import { RIGHT_BAR_WIDTH } from './const';

// Templates
import TContact1 from '../../templates/TContact1';
import TContact2 from '../../templates/TContact2';
import TContact3 from '../../templates/TContact3';
import THero1 from '../../templates/THero1';
import Title from 'antd/es/typography/Title';
import TNoTemplate from '../../templates/TNoTemplate';
import TNavBar1 from '../../templates/TNavBar1';
import TPracticeAreas1 from '../../templates/TPracticeAreas1';
import TValues1 from '../../templates/TValues1';
import TTeam1 from '../../templates/TTeam1';
import TReviews1 from '../../templates/TReviews1';
import TAbout1 from '../../templates/TAbout1';

const { Content, Footer } = Layout;

function Visualisation({
    data, // if anything arrives here in this data prop it's already "sanitized" and is an object structure. NOT a JSON! (You can access its values like data?.email or data?.phone, etc., but you can't change it here)
    functions,
    variables,
    mode = '',
} : any) {

    const { onAddSection, checkIfNoSections, setSelectedSectionId, setSelectedTemplateId }
     = mode === "showcase" 
     ? {
        onAddSection: () => {},
        checkIfNoSections: () => {},
        setSelectedSectionId: () => {},
        setSelectedTemplateId: () => {},
    } : functions;
    const { selectedSectionId, selectedTemplateId, isDevMode, isDeploying, dummyRef } 
     = mode === "showcase"
     ? {
        selectedSectionId: "",
        selectedTemplateId: "",
        isDevMode: false,
        isDeploying: true,
        dummyRef: null,
     } : variables;

    const hasNoSections = checkIfNoSections();

    async function onSectionClick(section: any) {
        setSelectedSectionId((_: string) => section.section_id);
        setSelectedTemplateId((_: string) => section.template_id);
    }

    function switchTemplate(data: any) {
        switch(data.template_id) {
            // NavBar
            case 'TNavBar1':
                return <TNavBar1 data={data} />
            // Hero
            case 'THero1':
                return <THero1 data={data} />
            // PracticeAreas
            case 'TPracticeAreas1':
                return <TPracticeAreas1 data={data} />
            // Values
                case 'TValues1':
                return <TValues1 data={data} />
            // Team
            case 'TTeam1':
                return <TTeam1 data={data} />
            // Reviews
            case 'TReviews1':
                return <TReviews1 data={data} />
            // About
            case 'TAbout1': case 'TAboutUs1':
                return <TAbout1 data={data} />
            // Contact
            case 'TContact1':
                return <TContact1 data={data} />
            case 'TContact2':
                return <TContact2 data={data} />
            case 'TContact3':
                return <TContact3 data={data} />
            // No template ID matched
            default:
                return <TNoTemplate data={data} /> 
        }
      }

    const selectedSectionStyle = isDeploying 
    ? {} 
    : { outline: '4px solid #ff000077', outlineOffset: '-2px' }

    const contentStyle = isDeploying 
    ? {} 
    : { maxWidth: '1200px', margin: '24px 12px 0', overflow: 'initial' }

    const layoutStyle = isDeploying
    ? { marginInline: 'auto' }
    : { background: '#0000'}

    return ( <Layout className="site-layout" style={layoutStyle}>
    <Flex style={contentStyle} vertical>
        {(isDevMode && !isDeploying) && <>
            [selectedSectionId]: {selectedSectionId}<br/>
            [selectedTemplateId]: {selectedTemplateId}<br/>
        </>}
        {data && data.map((s: any) => <div key={s.section_id} id={s.section_id} onClick={() => onSectionClick(s)} style={selectedSectionId === s.section_id ? selectedSectionStyle : {}}>
            {isDevMode && <>
                [section_id]: {s.section_id}
            </>}
            {switchTemplate(s)}
        </div>)}
        <div id='editor-dummy' ref={dummyRef} />
    </Flex>
    {/* {!isDeploying &&
    <Flex align='center' justify='center' style={{minHeight: hasNoSections ? '360px' : '100px'}}>
        <Title style={{cursor:'pointer'}} onClick={onAddSection}>+ New section</Title>
    </Flex>
    } */}
    <Footer style={{ textAlign: 'center' }}>Generated with Legis &middot; 2023</Footer>
  </Layout> );
}

export default Visualisation;