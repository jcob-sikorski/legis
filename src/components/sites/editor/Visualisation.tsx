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
import THero2 from '../../templates/THero2';
import TNavBar2 from '../../templates/TNavBar2';
import TPracticeAreas2 from '../../templates/TPracticeAreas2';
import TValues2 from '../../templates/TValues2';
import TTeam2 from '../../templates/TTeam2';
import TReviews2 from '../../templates/TReviews2';
import TAbout2 from '../../templates/TAbout2';
import TContact4 from '../../templates/TContact4';
import THero3 from '../../templates/THero3';
import TNavBar3 from '../../templates/TNavBar3';
import TPracticeAreas3 from '../../templates/TPracticeAreas3';
import TValues3 from '../../templates/TValues3';
import { LHero1 } from '../../templates/generic_dark/LHero1';
import LHero2 from '../../templates/LHero2';
import LHero3 from '../../templates/LHero3';
import LPracticeAreas1 from '../../templates/LPracticeAreas1';
import LPracticeAreas2 from '../../templates/generic_dark/LPracticeAreas2';
import LPracticeAreas3 from '../../templates/LPracticeAreas3';
import LValues1 from '../../templates/LValues1';
import LValues2 from '../../templates/generic_dark/LValues2';
import LValues3 from '../../templates/LValues3';
import LTeam1 from '../../templates/generic_dark/LTeam1';
import LTeam2 from '../../templates/LTeam2';
import LTeam3 from '../../templates/LTeam3';
import LReviews1 from '../../templates/generic_dark/LReviews1';
import LReviews2 from '../../templates/LReviews2';
import LReviews3 from '../../templates/LReviews3';
import LAbout1 from '../../templates/generic_dark/LAbout1';
import LContact1 from '../../templates/generic_dark/LContact1';
import LContact2 from '../../templates/LContact2';
import LContact3 from '../../templates/LContact3';
import LAbout2 from '../../templates/LAbout2';
import LAbout3 from '../../templates/LAbout3';
import EHero1 from '../../templates/editorial/EHero1';
import EPracticeAreas1 from '../../templates/editorial/EPracticeAreas1';
import { updateCssStyles } from '../../../utils';
import { SHero1 } from '../skeletons';
import SHero2 from '../skeletons/SHero2';
// import { delay } from '../../../utils';

const { Content, Footer } = Layout;

function Visualisation({
    data, // if anything arrives here in this data prop it's already "sanitized" and is an object structure. NOT a JSON! (You can access its values like data?.email or data?.phone, etc., but you can't change it here)
    functions,
    variables,
    mode = '',
} : any) {

    const { onAddSection, checkIfNoSections, setSelectedSectionId, setSelectedTemplateId, setData, setContext }
     = mode === "showcase" || mode === "preview"
     ? {
        onAddSection: () => {},
        checkIfNoSections: () => {},
        setSelectedSectionId: () => {},
        setSelectedTemplateId: () => {},
        setData: () => {},
        setContext: () => {},
    } : functions;
    const { selectedSectionId, selectedTemplateId, isDevMode, isDeploying, dummyRef, containerRef, colors } 
     = mode === "showcase" || mode === "preview"
     ? {
        selectedSectionId: "",
        selectedTemplateId: "",
        isDevMode: false,
        isDeploying: true,
        dummyRef: null,
        containerRef: null,
        colors: [],
     } : variables;

     
     const [removedSectionId, setRemovedSectionId] = useState<string>("");
     const [followedSectionId, setFollowedSectionId] = useState<string>("");
     const [followingDirection, setFollowingDirection] = useState<"up" | "down">("down");
     const [followingCount, setFollowingCount] = useState<number>(0);

     if (mode === 'preview') {
        document.documentElement.style.setProperty('--legis-editable-outline', `0`);
     }
     
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
                yAfterMoving - betweenHeight * 0.5 * 4; // might need to make more precise later
                // *   
                // (followingDirection === "up" ? 1 : -1);

            // containerRef.current.scrollTo({top: finalY, behavior: 'smooth'})
            console.log("yAfterMoving: ", yAfterMoving);
            console.log("clientHeight: ", clientHeight);
            console.log("betweenHeight: ", betweenHeight);
                // alert("yAfterMoving " + yAfterMoving);
        }
     }, [followedSectionId, followingCount])

    const hasNoSections = checkIfNoSections();

    function scrollToSection(section: any) {
        setFollowedSectionId(section.section_id);
        setFollowingCount(followingCount + 1);
    }

    async function onSectionClick(section: any) {

        // setContext({});

        setSelectedSectionId((_: string) => section.section_id);
        setSelectedTemplateId((_: string) => section.template_id);
        
        scrollToSection(section);
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
            scrollToSection(sectionToDuplicate);
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

            scrollToSection(sectionToMove);
            // setFollowedSectionId(sectionToMove.section_id);
            // setFollowingDirection(direction);
            // setFollowingCount(followingCount + 1);

           

            // containerRef.current.scrollBy({ top: -500, behavior: 'smooth' });
            // window.scrollBy({ top: 500, behavior: 'smooth' });
        }
    }

    function switchTemplate(data: any) {

        const setContextMiddleware = (obj: any) => {
            setContext({...obj, section_id: data?.section_id});
        }

        switch(data.template_id) {
            // Hero
            case 'LHero1':
                return <SHero2 data={data} s={{}}/>
            case 'LHero2':
                return <LHero2 data={data} setContext={setContextMiddleware} />
            case 'LHero3':
                return <LHero3 data={data} setContext={setContextMiddleware} />
            // PracticeAreas
            case 'LPracticeAreas1':
                return <LPracticeAreas1 data={data} setContext={setContextMiddleware} />
            case 'LPracticeAreas2':
                return <LPracticeAreas2 data={data} setContext={setContextMiddleware} />
            case 'LPracticeAreas3':
                return <LPracticeAreas3 data={data} setContext={setContextMiddleware} />
            // Values
            case 'LValues1':
                return <LValues1 data={data} setContext={setContextMiddleware} />
            case 'LValues2':
                return <LValues2 data={data} setContext={setContextMiddleware} />
            case 'LValues3':
                return <LValues3 data={data} setContext={setContextMiddleware} />
            // Team
            case 'LTeam1':
                return <LTeam1 data={data} setContext={setContextMiddleware} />
            case 'LTeam2':
                return <LTeam2 data={data} setContext={setContextMiddleware} />
            case 'LTeam3':
                return <LTeam3 data={data} setContext={setContextMiddleware} />
            // Reviews
            case 'LReviews1':
                return <LReviews1 data={data} setContext={setContextMiddleware} />
            case 'LReviews2':
                return <LReviews2 data={data} setContext={setContextMiddleware} />
            case 'LReviews3':
                return <LReviews3 data={data} setContext={setContextMiddleware} />
            // About
            case 'LAbout1':
                return <LAbout1 data={data} setContext={setContextMiddleware} />
            case 'LAbout2':
                return <LAbout2 data={data} setContext={setContextMiddleware} />
            case 'LAbout3':
                return <LAbout3 data={data} setContext={setContextMiddleware} />
            // Contact
            case 'LContact1':
                return <LContact1 data={data} setContext={setContextMiddleware} />
            case 'LContact2':
                return <LContact2 data={data} setContext={setContextMiddleware} />
            case 'LContact3':
                return <LContact3 data={data} setContext={setContextMiddleware} />
            // No template ID matched
            default:
                return <TNoTemplate data={data} setContext={setContextMiddleware} /> 
        }
      }

    const selectedSectionStyle = isDeploying 
    ? {} 
    : { outline: '4px dotted #0000ff77', outlineOffset: '-2px' }

    const contentStyle: any = isDeploying 
    ? {} 
    : { 
        // position: 'absolute', 
        // minHeight: '100vh',
        // top: 0, 
        // margin: '24px 12px 0', 
        // overflow: 'initial', 
        width: '100%',
        // transform: 'scale(1)',
        // marginLeft: 'calc(-50% - 10px)', 
        // transformOrigin: 'top',
        scroll: 'smooth',
    }

    function calculateScale() {
        var viewportWidth = window.innerWidth;
        if (viewportWidth >= 1600) {
            let newVal = 1 + 0.5 * ((viewportWidth - 1600) / (2000 - 1600));
            console.log("newVal: ", newVal)
            if (newVal > 1.5) return 1.5;
            else return newVal;
         return 
        } else {
         return 1;
        }
       }

       useEffect(() => {
        document.documentElement.style.setProperty('--vw-scale', `${calculateScale()}`);
       }, [])

    window.addEventListener('resize', () => {
        document.documentElement.style.setProperty('--vw-scale', `${calculateScale()}`);
    });

    useEffect(() => {
        if (colors?.length > 0) {
          updateCssStyles(colors);
        }
       }, [colors])

    const layoutStyle = isDeploying || mode === 'preview'
    ? { marginInline: 'auto', scroll: 'smooth' }
    : { 
        // background: '#f00',
        // padding: 10, 
        // minHeight: '100vh',
        // transform: 'scale(var(--vw-scale))', 
        // transformOrigin: 'top',
        // width: '100vw',
    }

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
                onClick={() => mode === 'showcase' ? {} : onSectionClick(s)} 
                style={{
                    position: 'relative',
                    opacity: 1,
                    ...(selectedSectionId === s.section_id ? selectedSectionStyle : {})
                }}
            >
            {!isDeploying && <div 
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
                        // {
                        //     label: 'Edit section',
                        //     icon: <EditFilled />,
                        //     onClick: () => onSectionClick(s),
                        // },
                        {
                            label: 'Delete section',
                            icon: <DeleteFilled />,
                            onClick: () => onSectionDelete(s),
                        },

                    ].map(({label, icon, onClick}) => 
                    <Button style={{border: 0}} title={label} icon={icon} onClick={onClick} />)}
                </div>
                }
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
    {/* <Footer style={{ textAlign: 'center' }}>Generated with Legis &middot; 2023</Footer> */}
  </Layout> );
}

export default Visualisation;