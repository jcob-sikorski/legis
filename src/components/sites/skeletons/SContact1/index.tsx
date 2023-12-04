import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'

import { useEffect } from 'react';

export default function SContact1({data} : any) {

    useEffect(() => {
      console.log("DATA: ", JSON.stringify(data));
    }, []);

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
    
    const skeletonIndex = 0; // narazie recznie zmieniaj, albo napisz jakas funkcje do ui
    const s = sArray[skeletonIndex%3]

    return <section className={i("section")}>
      <div className={i("wrapper")}>
        <div className={i("title")}>
          <h1>By settlement if possible,
by trial if not. We resolve
the most complex cases
in Family Law.</h1>
        </div>
        <button
            className={i('button')}
            style={{ color: '#fff', ...s?.button }}
            >
            Learn more
        </button>
      </div>
    </section>
}