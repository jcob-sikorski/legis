import { faker } from "@faker-js/faker";
import { getUrl } from "../../../utils";

export default function LAbout1({data, setContext}: any) {
    return <section id='about-us' className="py-12 bg-black sm:py-16 lg:py-20 xl:py-24" style={{fontFamily: 'var(--legis-font-main)'}}>
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-x-16 gap-y-12">
            <div className="md:order-last">
                <img 
                onClick={() => setContext({key: '_', type: 'image', ratio: 8/10, label: 'Hero Image'})}
                    className="editable object-cover w-full h-full mx-auto rounded-md lg:max-w-md" 
                    src={data?.cdnUUID ? getUrl(data?.cdnUUID) : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/CityLife_Shopping_District_1.jpg/1024px-CityLife_Shopping_District_1.jpg'} 
                    alt="" 
                />
            </div>

            <div className="lg:max-w-md">
                {/* <p className="text-sm font-normal tracking-widest uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> FAQ </span>
                </p> */}
                <h2 
                onClick={() => setContext({ key: 'title', type: 'text', label: 'Title', variantProperty: 'textAlign'})} 
                style={{textAlign: data?.titleVariant || 'center'}}
                className="editable mt-6 text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj">
                    {data?.title}
                </h2>
                <ul className="mt-12 space-y-12 sm:mt-16">
                    <li>
                        {/* <h3 className="text-2xl font-normal text-white">What is Tailwind CSS?</h3> */}
                        <p
                        style={{textAlign: data?.paragraphVariant || 'center'}}
                        onClick={() => setContext({key: 'paragraph', type: 'text', label: 'Description', variantProperty: 'textAlign'})} 
                        className="editable mt-5 text-base font-normal text-gray-400">
                            {data?.paragraph || "[Your paragraph here]"}
                        </p>
                    </li>

                    {/* <li>
                        <h3 className="text-2xl font-normal text-white">Does this work with Wordpress?</h3>
                        <p className="mt-5 text-base font-normal text-gray-400">No, our products do not work out of the box with Wordpress. You would need development experience or hire a developer with knowledge of Tailwind CSS to implement this template with Wordpress</p>
                    </li> */}
                </ul>
            </div>
        </div>
    </div>
</section>
}


