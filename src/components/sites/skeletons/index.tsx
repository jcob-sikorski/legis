import { faker } from '@faker-js/faker';
import './s1.css';
import IFrame from '../../iFrame';
import { useEffect, useState } from 'react';
import Visualisation from '../editor/Visualisation';
import Stellar from './Stellar';

const testData = {
    heading: 'Corporate Law Experts with 10+ years experience', 
    subHeading: 'Providing exceptional services to the biggest corporations on Earth. In California. across competition law, corporate law.', 
    buttonLabel: 'Book a consultation',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gray_Wikipedia_Logo.jpg/715px-Gray_Wikipedia_Logo.jpg?20191209222645'
}

function Skeletons() {    
    const [selectedSkeletonId, setSelectedSkeletonId] = useState('SHero1');
    
    const [component, setComponent] = useState<any>();
    
    useEffect(() => {
        switch(selectedSkeletonId) {
            default:
            case 'Stellar': {setComponent(<Stellar/>); break;}
        }
    }, [selectedSkeletonId])

    const skeletonIds = [
        'Stellar'
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

export default Skeletons;