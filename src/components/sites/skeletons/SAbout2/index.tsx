import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'

import { useEffect } from 'react';

export default function SAbout2({data} : any) {

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
            image: {
                borderRadius: 0,
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
            image: {
                borderRadius: 15,
            }
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
            image: {
                borderRadius: 50,
            }
        }
    ]
    
    const skeletonIndex = 0; // narazie recznie zmieniaj, albo napisz jakas funkcje do ui
    const s = sArray[skeletonIndex%3]

    return <section className={i("section")}>
    <div className={i("wrapper")}>
      <div
        style={{ width: '100vw', maxWidth: '1200px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <div>
          <img className={i("image")} src={`${data?.cdnUUID ? getUrl(data?.cdnUUID) : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gray_Wikipedia_Logo.jpg/715px-Gray_Wikipedia_Logo.jpg?20191209222645'}`} alt="About Us" />
        </div>
        <div className={i("content")}>
          <div className={i("title")}>
            <h1>About Us</h1>
          </div>
          <div className={i("paragraph")}>
            <p>Legal Legacy is your reliable partner on the path to legal success. Whether you require assistance with business law, family law, estate planning, or any other legal matter.Legal Legacy is your reliable partner on the path to legal success. Whether you require assistance with business law, family law, estate planning, or any other legal matter.Legal Legacy is your reliable partner on the path to legal success. Whether you require assistance with business law, family law, estate planning, or any other legal matter.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

}