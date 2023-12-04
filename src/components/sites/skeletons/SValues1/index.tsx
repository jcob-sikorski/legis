import { CSSProperties } from 'react';
import { getUrl } from '../../../../utils';
import styles from './index.module.css'

export default function SValues1({data} : any) {

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

    return <section>
    <header>
        <h2>Feugiat consequat tempus ultrices</h2>
    </header>
    <div className="content">
        <p><strong>Etiam tristique libero</strong> eu nibh porttitor amet fermentum. Nullam venenatis erat id vehicula ultrices sed ultricies condimentum.</p>
        <ul className="feature-icons">
            <li className="icon solid fa-laptop">Consequat tempus</li>
            <li className="icon solid fa-bolt">Etiam adipiscing</li>
            <li className="icon solid fa-signal">Libero nullam</li>
            <li className="icon solid fa-cog">Blandit condimentum</li>
            <li className="icon solid fa-map-marker-alt">Lorem ipsum dolor</li>
            <li className="icon solid fa-code">Nibh amet venenatis</li>
        </ul>
        <p>Vehicula ultrices sed ultricies condimentum. Magna sed etiam consequat, et lorem adipiscing sed nulla. Volutpat nisl et tempus et dolor libero, feugiat magna tempus, sed et lorem adipiscing.</p>
    </div>
</section>
}