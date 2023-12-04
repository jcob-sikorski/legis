import { faker } from '@faker-js/faker';
import './s1.css';
import IFrame from '../../iFrame';
import { useEffect, useState } from 'react';
import SHero1 from './SHero1';
import SHero2 from './SHero2';
import Visualisation from '../editor/Visualisation';
import SHero3 from './SHero3';
import SPracticeAreas1 from './SPracticeAreas1';
import SPracticeAreas3 from './SPracticeAreas3';
import SValues1 from './SValues1';
import SAbout1 from './SAbout1';
import SAbout2 from './SAbout2';
import SAbout3 from './SAbout3';
import SContact1 from './SContact1';

const testData = {
    heading: 'Corporate Law Experts with 10+ years experience', 
    subHeading: 'Providing exceptional services to the biggest corporations on Earth. In California. across competition law, corporate law.', 
    buttonLabel: 'Book a consultation',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gray_Wikipedia_Logo.jpg/715px-Gray_Wikipedia_Logo.jpg?20191209222645'
}

function Skeletons() {

    const data = JSON.parse(`{
        "section_id": "c2553439-5bc8-4f02-98f6-e250fb2c7d2e",
        "template_id": "LPracticeAreas2",
        "title": "Our practice areas",
        "areasList": [
          {
            "practiceAreaName": "Contract Negotiation",
            "practiceDescription": "Our team of experienced sports law attorneys specializes in contract negotiation. We understand the intricacies of sports contracts and can help you navigate the complex legal landscape to ensure your interests are protected. Whether you're an athlete, team, or sports organization, we have the expertise to secure favorable terms and maximize your opportunities."
          },
          {
            "practiceAreaName": "Intellectual Property Issues in Sports",
            "practiceDescription": "Intellectual property is a critical aspect of the sports industry. Our firm has extensive experience in handling intellectual property issues in sports, including trademark and copyright infringement, licensing agreements, and brand protection. We can help you safeguard your intellectual property rights and ensure that your brand is protected in the competitive sports market."
          },
          {
            "practiceAreaName": "Contract Negotiation",
            "practiceDescription": "Our team of experienced sports law attorneys specializes in contract negotiation. We understand the intricacies of sports contracts and can help you navigate the complex legal landscape to ensure your interests are protected. Whether you're an athlete, team, or sports organization, we have the expertise to secure favorable terms and maximize your opportunities."
          },
          {
            "practiceAreaName": "Intellectual Property Issues in Sports",
            "practiceDescription": "Intellectual property is a critical aspect of the sports industry. Our firm has extensive experience in handling intellectual property issues in sports, including trademark and copyright infringement, licensing agreements, and brand protection. We can help you safeguard your intellectual property rights and ensure that your brand is protected in the competitive sports market."
          },
          {
            "practiceAreaName": "Athlete Endorsement Agreements",
            "practiceDescription": "Securing endorsement deals is crucial for athletes looking to maximize their earning potential. Our sports law firm has a deep understanding of the endorsement landscape and can assist athletes in negotiating favorable endorsement agreements. We work tirelessly to protect our clients' interests and ensure they receive fair compensation for their endorsements."
          }
        ]
      }`)

      const [stylesIndex, setStylesIndex] = useState<number>(0);

    const styles: any[] = [
        {
            main: {

            },
            seriable: {
                main1 : {
                    background: 'red',
                },
                main2: {
                    background: 'cyan',
                },
                main: {
                    padding: 14,
                },
                title: {
                    fontFamily: 'Oswald',
                },
                description: {
                    background: 'yellow',
                },
            },
        },
        {
            main: {

            },
            seriable: {
                main1 : {
                    background: '#eee',
                },
                main2: {
                    background: '#ddd',
                },
                main: {
                    padding: 30,
                },
                title: {
                    fontFamily: 'monospace',
                },
                description: {
                    background: '#ccc',
                },
            },
        },
        {
            main: {

            },
            seriable: {
                main1 : {
                    background: '#eee',
                },
                main2: {
                    background: '#ddd',
                },
                main: {
                    padding: 30,
                },
                title: {
                    fontFamily: 'serif',
                },
                description: {
                    background: '#ccc',
                },
            },
        },
    ]



    
    const [selectedSkeletonId, setSelectedSkeletonId] = useState('SHero1');
    
    const [component, setComponent] = useState<any>();
    
    useEffect(() => {
        switch(selectedSkeletonId) {
            default: 
            case 'SHero1': {setComponent(<SHero1 data={testData} s={{}} />); break;}
            case 'SHero2': {setComponent(<SHero2 data={testData} s={{}} />); break;}            
            case 'SHero3': {setComponent(<SHero3 data={testData} s={{}} />); break;}            
            case 'SPracticeAreas1': {setComponent(<SPracticeAreas1 data={testData} s={{}} />); break;}            
            case 'SPracticeAreas2': {setComponent(<SPracticeAreas2 data={testData} s={{}} />); break;}            
            case 'SPracticeAreas3': {setComponent(<SPracticeAreas3 data={testData} s={{}} />); break;}            
            case 'SValues1': {setComponent(<SValues1 data={testData} s={{}} />); break;}
            case 'SAbout1': {setComponent(<SAbout1 data={testData} s={{}} />); break;}
            case 'SAbout2': {setComponent(<SAbout2 data={testData} s={{}} />); break;}
            case 'SAbout3': {setComponent(<SAbout3 data={testData} s={{}} />); break;}
            case 'SContact1': {setComponent(<SContact1 data={testData} s={{}} />); break;}
        }
    }, [selectedSkeletonId])

    const skeletonIds = [
        'SHero1',
        'SHero2',
        'SHero3',
        'SPracticeAreas1',
        'SPracticeAreas2',
        'SPracticeAreas3',
        'SValues1',
        'SAbout1',
        'SAbout2',
        'SAbout3',
        'SContact1'
    ]

    return ( <div>
        
        <div
        style={{width: '75vw', marginInline: 'auto', fontStyle: 'italic'}}
        >
            <div>
                Skeletons: 
                {skeletonIds?.map((s: any, i: number) => <a style={{fontWeight: selectedSkeletonId === s ? 800 : 400}} href='#' onClick={() => setSelectedSkeletonId(s)}>
                    {' '}{s}
                </a>)}
            </div>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* SHero1 */}
            <div style={{display: 'flex'}}>
                <IFrame style={{width: '75vw', height: '95vh', marginInline: 'auto', outline: '4px solid #99f'}}>
                    {component}
                    {/* <Visualisation data={[{template_id: 'LHero1'}]} mode='showcase' /> */}
                </IFrame>
                <IFrame style={{width: 'calc(25vw - 30px)', maxHeight: '760px', height: '95vh', marginInline: 'auto', outline: '4px solid #99f'}}>
                    {component}
                </IFrame>
            </div>
        </div>
    </div> );
}

function SPracticeAreas2({data, s} : any) {
    // console.log(data.areasList);
    const defaultList = [
        {
            practiceAreaName: '',
            practiceDescription: '',
        },
        {
            practiceAreaName: '',
            practiceDescription: '',
        },
        {
            practiceAreaName: '',
            practiceDescription: '',
        },
        {
            practiceAreaName: '',
            practiceDescription: '',
        },
    ]
    const list = defaultList;

    return <section style={s.main} className='s1_section'>
        <div className='s1_seriables' style={s?.seriables || {}}>

            {list.map((area: any, i: number) => {
                const condition = (i % 3 == 0 || i % 4 == 0);
                return <div 
                    className={`s1_seriable_main ${ condition ? 's1_seriable_main_1' : 's1_seriable_main_2'}`} 
                    style={{
                        ...(s?.seriable?.main || {}),
                        ...((condition ? s?.seriable?.main1 : s?.seriable?.main2) || {})
                    }}
                >
                    <div className='s1_title' style={s?.seriable?.title || {}}>
                        {area?.practiceAreaName || "Practice Area " + String(i + 1)}
                    </div>
                    <div className='s1_description' style={s?.seriable?.description || {}}>
                        {area?.practiceDescription || "Pracitce Area Description here " + faker.lorem.words(25)}
                    </div>
                </div>
            })}

        </div>
        
    </section>
}


export default Skeletons;