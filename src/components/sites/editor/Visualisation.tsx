import { Button, Flex, Layout, Space } from 'antd';
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
import { ArrowDownOutlined, ArrowUpOutlined, CopyFilled, DeleteFilled, EditFilled, EditOutlined } from '@ant-design/icons';
import { v4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
// import { delay } from '../../../utils';

const { Content, Footer } = Layout;

function Visualisation({
    data, // if anything arrives here in this data prop it's already "sanitized" and is an object structure. NOT a JSON! (You can access its values like data?.email or data?.phone, etc., but you can't change it here)
    functions,
    variables,
    mode = '',
} : any) {

    const { onAddSection, checkIfNoSections, setSelectedSectionId, setSelectedTemplateId, setData }
     = mode === "showcase" 
     ? {
        onAddSection: () => {},
        checkIfNoSections: () => {},
        setSelectedSectionId: () => {},
        setSelectedTemplateId: () => {},
        setData: () => {},
    } : functions;
    const { selectedSectionId, selectedTemplateId, isDevMode, isDeploying, dummyRef, containerRef } 
     = mode === "showcase"
     ? {
        selectedSectionId: "",
        selectedTemplateId: "",
        isDevMode: false,
        isDeploying: true,
        dummyRef: null,
        containerRef: null,
     } : variables;

     
     const [removedSectionId, setRemovedSectionId] = useState<string>("");
     const [followedSectionId, setFollowedSectionId] = useState<string>("");
     const [followingDirection, setFollowingDirection] = useState<"up" | "down">("down");
     const [followingCount, setFollowingCount] = useState<number>(0);

     useEffect(() => {
        // alert(containerRef.current);
        var wrapper = document.getElementById('wrapper-' + followedSectionId);
        // alert("containerRef.current " + element.offsetTop)
        if (wrapper) {
            // var height = element.offsetHeight * followingDirection;
            // if (followingDirection === 'down') {
            //     const y = element.getBoundingClientRect().top + containerRef.current.pro - 10;
            //     element.scrollTo({ behavior: 'smooth', top: y });
            // }
            // var wrapper = document.getElementById('wrapper-' + containerRef.current.section_id);
            // var element = document.getElementById('section-' + containerRef.current.section_id);
            const yAfterMoving = wrapper.offsetTop;
            const clientHeight = window.innerHeight;
            const wrapperHeight = wrapper.getBoundingClientRect().height;
            const betweenHeight = clientHeight - (wrapperHeight);
            const finalY = 
                yAfterMoving - betweenHeight * 0.5
                // *   
                // (followingDirection === "up" ? 1 : -1);

            containerRef.current.scrollTo({top: finalY, behavior: 'smooth'})
            console.log("yAfterMoving: ", yAfterMoving);
            console.log("clientHeight: ", clientHeight);
            console.log("betweenHeight: ", betweenHeight);
                // alert("yAfterMoving " + yAfterMoving);
        }
     }, [followedSectionId, followingCount])

    const hasNoSections = checkIfNoSections();

    async function onSectionClick(section: any) {
        setSelectedSectionId((_: string) => section.section_id);
        setSelectedTemplateId((_: string) => section.template_id);
    }

    async function onSectionDuplicate(sectionToDuplicate: any) {
        if (data?.length > 0) {
            let newData: any[] = [];
            data?.map((section: any) => {
                newData.push(section);
                if (section.section_id === sectionToDuplicate.section_id) {
                    newData.push({
                        ...sectionToDuplicate,
                        section_id: v4(),
                    });
                }
            })
            setData(newData);
        }
    }

    async function onSectionDelete(sectionToDelete: any) {
        if (data?.length > 0) {
            setData(data?.filter((section: any) => section.section_id !== sectionToDelete.section_id));
        }
    }

    async function onSectionMove(sectionToMove: any, direction: 'up' | 'down') {
        let d: any[] = JSON.parse(JSON.stringify(data));
        if (data?.length > 1) {
            const sectionIds: any[] = data?.map((s: any) => s.section_id);
            const selectedSectionIndex = sectionIds.indexOf(sectionToMove.section_id);

            let destinationIndex;
            if (direction === 'up') {
                destinationIndex = selectedSectionIndex > 0 ? selectedSectionIndex - 1 : 0;
            } else {
                destinationIndex = selectedSectionIndex < data.length - 1 ? selectedSectionIndex + 1 : data.length - 1;
            }

            // Swap elements places
            [d[destinationIndex], d[selectedSectionIndex]]
            =
            [d[selectedSectionIndex], d[destinationIndex]]

            setData(d);

            setFollowedSectionId(sectionToMove.section_id);
            setFollowingDirection(direction);
            setFollowingCount(followingCount + 1);

           

            // containerRef.current.scrollBy({ top: -500, behavior: 'smooth' });
            // window.scrollBy({ top: 500, behavior: 'smooth' });
        }
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
    : { background: '#fff', maxWidth: '1200px'}

    return ( <Layout className="site-layout" style={layoutStyle} ref={containerRef}>
    <Flex style={contentStyle} vertical>
        {(isDevMode && !isDeploying) && <>
            [selectedSectionId]: {selectedSectionId}<br/>
            [selectedTemplateId]: {selectedTemplateId}<br/>
        </>}
        {data && data.map((s: any) => 
            <div 
                className={`hover-parent ${s.section_id === removedSectionId ? "animate__bounceOut" : ''}`}
                key={s.section_id} 
                id={'wrapper-' + s.section_id} 
                onClick={() => onSectionClick(s)} 
                style={{
                    position: 'relative',
                    opacity: 1,
                    ...(selectedSectionId === s.section_id ? selectedSectionStyle : {})
                }}
            >

                <div 
                className='hover-child'
                style={{
                    background: '#fff', 
                    width: '', 
                    right: 0, 
                    padding: 4,
                    borderRadius: 4,
                    marginTop: 8,
                    marginRight: 8,
                    position: 'absolute', 
                    top: 0, 
                    zIndex: 10,
                }}>
                    {[
                        {
                            label: 'Duplicate section',
                            icon: <CopyFilled />,
                            onClick: () => onSectionDuplicate(s),
                        },
                        {
                            label: 'Move section up',
                            icon: <ArrowUpOutlined />,
                            onClick: () => onSectionMove(s, "up"),
                        },
                        {
                            label: 'Move section down',
                            icon: <ArrowDownOutlined />,
                            onClick: () => onSectionMove(s, "down"),
                        },
                        {
                            label: 'Edit section',
                            icon: <EditFilled />,
                            onClick: () => onSectionClick(s),
                        },
                        {
                            label: 'Delete section',
                            icon: <DeleteFilled />,
                            onClick: () => onSectionDelete(s),
                        },

                    ].map(({label, icon, onClick}) => 
                    <Button style={{border: 0}} title={label} icon={icon} onClick={onClick} />)
                    }
                </div>
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