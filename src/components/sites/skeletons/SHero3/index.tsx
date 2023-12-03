import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'

export default function SHero3({data} : any) {

    function i(name: string) { // i stands for import class from css module.
        return ` ${styles[name]} `;
    }
    
    // mozesz sobie wybrac nazwy styli jakie polaczysz do danego elementu HTML, ale np konwencja to by nazywac tak samo jak klase
    const sArray: {[key: string] : CSSProperties}[] = 
    [
        {
            content: {
                // ... tutaj ida  WLASCIWOSCI stylu np background, color itp,
                boxShadow: '24px 24px red'
            },
            innyStyl: {
                // boxShadow: '24px -24px blue'
            },
            // ... itd
        },
        {
            content: {
                // ... tutaj ida  WLASCIWOSCI stylu np background, color itp,
                boxShadow: '24px -24px blue'
            },
            innyStyl: {
                // boxShadow: '24px -24px blue'
            },
            // ... itd
        },
        {
            content: {
                // ... tutaj ida  WLASCIWOSCI stylu np background, color itp,
                boxShadow: '-24px 24px yellow',
                color: 'cyan',
            },
            innyStyl: {
                boxShadow: '24px -24px blue'
            },
            // ... itd
        },
    ]
    
    const skeletonIndex = 2; // narazie recznie zmieniaj, albo napisz jakas funkcje do ui
    const s = sArray[skeletonIndex]

    return <section style={{...s?.main}} className={i('section') + 's1_section'}>
        <div className={i('wrapper')} >
                <div className={i('heading')}>{data?.heading}</div>
                <div  
                    className={i('image') + 'bg-photo'}
                    style ={{
                        backgroundImage: `url('${data?.cdnUUID ? getUrl(data?.cdnUUID) : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gray_Wikipedia_Logo.jpg/715px-Gray_Wikipedia_Logo.jpg?20191209222645'}')`,
                        ...(s?.innyStyl ?? {}) // syntax for appending to existing style properties in React
                    }}
                >
                    
                </div>
                <div className={i('content')} style={s?.innyStyl}>
                    <div className={i('subheading')} style={{lineHeight: 1.5, margin: '20px 0px'}}>{data?.subHeading}</div>
                    <button
                        className={i('button')}
                        >
                        {data?.buttonLabel}
                    </button>
                </div>
        </div>
    </section>
}