import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'

export default function SValues2({data} : any) {

    function i(name: string) { // i stands for import className from css module.
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

    return <section style={{...s?.main}} className={i('section')}>
    <div className={i('wrapper')} >
        <div className={i('heading')}>Our</div>
        <div className={i('heading')}>Values</div>
        <div className={i('subheading')}>Our board-certified family law attorneys work to achieve a fair and timely resolution of the legal issues in your case.</div>
        <div className={i('circle-row')}>
          <div className={('value')}>
            <div className={i('circle')}/>
            <p className={i('circle-headline')}>Gravida</p>
            <p className={i('circle-subheadline')}>Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam tempor dui lacinia accumsan vivamus. Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam tempor dui lacinia
accumsan vivamus.</p>
          </div>
          <div className={('value')}>
            <div className={i('circle')}/>
            <p className={i('circle-headline')}>Gravida</p>
            <p className={i('circle-subheadline')}>Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam tempor dui lacinia accumsan vivamus. Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam tempor dui lacinia
accumsan vivamus.</p>
          </div>
          <div className={('value')}>
            <div className={i('circle')}/>
            <p className={i('circle-headline')}>Gravida</p>
            <p className={i('circle-subheadline')}>Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam tempor dui lacinia accumsan vivamus. Gravida dis placerat lectus ante vel nunc euismod est turpis sodales. Diam tempor dui lacinia
accumsan vivamus.</p>
          </div>
        </div>
    </div>
</section> /* SHero3 */

}