import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'

export default function SHero1({data} : any) {

    function i(name: string) { // i stands for import class from css module.
        return ` ${styles[name]} `;
    }

    // mozesz sobie wybrac nazwy styli jakie polaczysz do danego elementu HTML, ale np konwencja to by nazywac tak samo jak klase
    const s: {[key: string] : CSSProperties} = {
        content: {
            // ... tutaj ida  WLASCIWOSCI stylu np background, color itp,
            boxShadow: '24px 24px red'
        },
        innyStyl: {
            // boxShadow: '24px -24px blue'
        },
        // ... itd
    }

    return <section style={{...s?.main}} className={i('section') + 's1_section'}>
        <div className={i('wrapper')} >
                <div
                    style={{width: '100vw', background: 'pink', maxWidth: '1200px', position: 'relative'}}
                >
                    <div  
                        className={i('right') + 'bg-photo'}
                        style ={{
                            backgroundImage: `url('${data?.cdnUUID ? getUrl(data?.cdnUUID) : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gray_Wikipedia_Logo.jpg/715px-Gray_Wikipedia_Logo.jpg?20191209222645'}')`,
                        }}
                     />
                     <div  
                        className={i('left')}
                     >
                        <div style={{fontSize: 30, fontWeight: 400}}>{data?.heading}</div>
                        <div style={{lineHeight: 1.5, margin: '20px 0px'}}>{data?.subHeading}</div>
                        <button
                            style={{padding: '15px 20px', background: '#666', color: '#fff', fontSize: 13}}
                        >
                            {data?.buttonLabel}
                        </button>
                     </div>
                </div>
        </div>
    </section>
}