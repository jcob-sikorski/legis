import './assets/css/editorial.module.css';
import pic01 from './images/pic01.jpg'

export default function EPracticeAreas1({data, setContext}: any) {
    return(<>
        <section>
            <header className="major">
                <h2>{data?.title || "Our practice areas"}</h2>
            </header>
            <div className="posts">

            {((data?.areasList ?? []).map((area: any, i:number) => 
                <article>
                <a href="#" className="image"><img src={pic01} alt="" /></a>
                <h3
                className='editable'  
                onClick={() => setContext({section_id: data?.section_id, collection: 'areasList', key: 'practiceAreaName', label: 'Practice Area Name', type: 'text', index: i})}>{area?.practiceAreaName || ""}</h3>
                <p
                className='editable'
                onClick={() => setContext({section_id: data?.section_id, collection: 'areasList', key: 'practiceDescription', label: 'Practice Area Description', type: 'textarea', index: i})}
                >{area?.practiceDescription || ""}</p>
                {/* <ul className="actions">
                    <li><a href="#" className="button">More</a></li>
                </ul> */}
            </article>
            ))}
            </div>
        </section>
    </>);
}