import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'
import { faker } from '@faker-js/faker';

export default function SPracticeAreas1({data} : any) {

    function i(name: string) { // i stands for import class from css module.
        return ` ${styles[name]} `;
    }
    
    // mozesz sobie wybrac nazwy styli jakie polaczysz do danego elementu HTML, ale np konwencja to by nazywac tak samo jak klase
    const sArray: {[key: string] : CSSProperties}[] = 
    [
        {
            card: {
                borderRadius: 0

            },
            button: {
                borderRadius: 0,
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'black'
            },
            main: {},
            main1: {},
            main2: {},
        },
        {
            card: {
                borderRadius: 10

            },
            button: {
                borderRadius: 5,
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'black'
            },
        },
        {
            card: {
                borderRadius: 30
            },
            button: {
                borderRadius: 40,
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'black'
            },
        }
    ]
    
    const skeletonIndex = 4; // narazie recznie zmieniaj, albo napisz jakas funkcje do ui
    const s = sArray[skeletonIndex%3]

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
                    ...(s?.card || {}),
                    ...((condition ? s?.card1 : s?.card2) || {})
                }}
            >
                <div className='s1_title' style={s?.cardTitle || {}}>
                    {area?.practiceAreaName || "Practice Area " + String(i + 1)}
                </div>
                <div className='s1_description' style={s?.cardDescription || {}}>
                    {area?.practiceDescription || "Pracitce Area Description here " + faker.lorem.words(25)}
                </div>
            </div>
        })}

    </div>
    
</section>
}