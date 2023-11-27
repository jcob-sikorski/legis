import { faker } from "@faker-js/faker";
import { getUrl } from "../../../utils";

export default function LTeam1({data,  setContext} : any) {

    // const list = data?.lawyerDetails ?? [];
    // console.log("TTeam: ", JSON.stringify(data), " list: ", list);

    return <section id='our-team' className="py-12 bg-black text-gray-100 sm:py-16 lg:py-20 xl:py-24" style={{fontFamily: 'var(--legis-font-main)'}}>
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto text-center">
            <p className="text-sm font-bold tracking-widest uppercase">
                <span
                style={{marginInline: data?.superTitleVariant || 'auto auto'}}  
                onClick={() => setContext({key: 'superTitle', type: 'text', label: 'Super-Title'})} 
                className="editable text-transparent bg-clip-text bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]">
                    {data?.superTitle ?? "Learn more about..."}
                </span>
            </p>
            <h2 
            
            style={{textAlign: data?.titleVariant || 'center'}}
            onClick={() => setContext({key: 'title', type: 'text', label: 'title', variantProperty: 'textAlign'})} 
            className="editable mt-6 text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj">
                {data?.title || "Our team"}
            </h2>
        </div>

        <div className="max-w-2xl mx-auto mt-12 space-y-12 sm:mt-16 lg:mt-20">
            
            {((data?.lawyerDetails ?? []).map((person: any, i: number) => 
                <>
                    {i !== 0 && <div className="w-full h-px bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]"></div>}
                    <div className="items-start sm:flex">
                        <img className="object-cover rounded-full w-44 h-44 shrink-0" 
                        
                        // onClick={() => setContext({key: '_', type: 'image', ratio: 14/8, label: 'Hero Image'}) }  
                        src={person?.cdnUUID ? getUrl(person.cdnUUID) : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} 
                        alt="" 
                        />
                        <div className="mt-6 sm:ml-10">
                            <div className="sm:items-center sm:flex">
                                <p
                                onClick={() => setContext({collection: 'lawyerDetails', seriableLabel: 'lawyer', key: 'name', label: 'Lawyer name', type: 'text', index: i})} 
                                className="editable break-all text-2xl font-normal text-white">
                                    {person?.name || "[Lawyer Name here]"}
                                </p>
                                <p 
                                onClick={() => setContext({collection: 'lawyerDetails', seriableLabel: 'lawyer', key: 'role', label: 'Role', type: 'text', index: i})} 
                                // className="editable break-all text-2xl font-normal text-white">
                                className="editable mt-2 text-base font-normal text-gray-400 sm:mt-0 sm:ml-4">
                                    {person?.role || "Team member"}
                                </p>
                            </div>
                            <p 
                            
                            onClick={() => setContext({ collection: 'lawyerDetails', seriableLabel: 'lawyer', key: 'description', label: 'Lawyer Description', type: 'textarea', index: i})} 
                            className="editable break-all mt-5 text-base font-normal text-gray-400">
                                {person?.description || "[Lawyer description here]"}
                            </p>
                        </div>
                    </div>
                </>
            ))}

            

            {/* <div className="items-start sm:flex">
                <img className="object-cover rounded-full w-44 h-44 shrink-0" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/team/3/team-member-2.png" alt="" />
                <div className="mt-6 sm:ml-10">
                    <div className="sm:items-center sm:flex">
                        <p className="text-2xl font-normal text-white">Jacob Jones</p>
                        <p className="mt-2 text-base font-normal text-gray-400 sm:mt-0 sm:ml-4">Co-Founder, CTO</p>
                    </div>
                    <p className="mt-5 text-base font-normal text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu sodales id bibendum quis aliquam, quisque rhoncus. Dolor iaculis a vitae, at imperdiet. Aliquam sed quam blandit volutpat elementum, scelerisque consequat malesuada. Magna eget enim sem pellentesque.
                    </p>
                </div>
            </div> */}
        </div>
    </div>
</section>

}