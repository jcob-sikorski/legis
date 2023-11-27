import { getUrl } from '../../../utils';
import './assets/css/editorial.module.css';
import pic10 from './images/pic01.jpg'

export default function EHero1({data, setContext}: any) {
    return(<>
        {/* <!-- Header --> */}
								<header id="header">
									<a href="index.html" className="logo"><strong>Editorial</strong> by HTML5 UP</a>
									<ul className="icons">
										<li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
										<li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
										<li><a href="#" className="icon brands fa-snapchat-ghost"><span className="label">Snapchat</span></a></li>
										<li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
										<li><a href="#" className="icon brands fa-medium-m"><span className="label">Medium</span></a></li>
									</ul>
								</header>

							{/* <!-- Banner --> */}
								<section id="banner">
									<div className="content">
										<header>
											<h1
                                            className='editable'
                                            onClick={() => setContext({key: 'heading', type: 'text', label: 'Heading', variantProperty: 'textAlign'})} 
                                            >
                                                {data?.heading || "[Your heading]"}
                                            </h1>
										</header>
										<p 
                                        className='editable'
                                        onClick={() => setContext({key: 'subHeading', type: 'textarea', label: 'Sub-Heading', variantProperty: 'textAlign'})} >
                                            {data?.subHeading || "[Your heading]"}
                                        </p>
										<ul className="actions">
											<li>
                                                <a  
                                                onClick={() => setContext({key: 'button', type: 'button', label: 'Button', variantProperty: 'marginInline'})}
                                                href="#" className="editable button big">
                                                {data?.button || "Learn more"}                                             
                                            </a></li>
										</ul>
									</div>
									<span className="image object">
										<img 
                                        className='editable'
                                        onClick={() => setContext({key: '_', type: 'image', ratio: 14/8, label: 'Hero Image'})}
                                         alt=""
                                         src={data?.cdnUUID ? getUrl(data?.cdnUUID) : 'https://mdbcdn.b-cdn.net/img/new/slides/146.webp'}
                                        />
									</span>
								</section>
    </>);
}