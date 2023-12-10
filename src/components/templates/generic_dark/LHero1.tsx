import { faker } from "@faker-js/faker";
import { getUrl } from "../../../utils";
import { useState } from "react";
import { DEFAULT_IMAGE_URL } from "../../sites/dashboard/SiteCard";

export const LOGO_WIDTH = 120;
export const LOGO_HEIGHT = 50;

export function LHero1({data, setContext, isDeploying} : {data: any, setContext: Function, isDeploying: boolean}) {

    // let data = {...mockData, blockVariant: 'center', buttonVariant: 'center', headingVariant: 'center', subHeadingVariant: 'center' };

    const [bgEditable, setBgEditable] = useState(true);
    // const [showNavBar, setShowNavBar] = useState(true);

    // <script>
    //     function toggleDiv() {
    //         var div = document.getElementById("myDiv");
    //         if (div.style.display === "none") {
    //             div.style.display = "block";
    //         } else {
    //             div.style.display = "none";
    //         }
    //     }
    // </script>



    return ( <div id='home' style={{fontFamily: 'var(--legis-font-main)'}}>
        
    <div className="py-4 bg-black sm:py-6" x-data="{expanded: false}">
        <div className="px-4 mx-auto max-w-7xlx sm:px-6 lg:px-8">
            
            {/* NavBar */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-black" style={isDeploying ? {} : {}}>
                <div className="shrink-0">
                    <a href="#" title="" className="flex text-white font-black">
                        {/* {data?.logo} */}
                        {data?.logo_cdnUUID
                        ? <img 
                            onClick={() => setContext({key: 'logo_cdnUUID', inputSize: [120 * 2, 50 * 2], cdnUUID: data?.logo_cdnUUID, type: 'image', ratio: LOGO_WIDTH/LOGO_HEIGHT, label: 'Logo image'})}  
                            className="editable"
                            style={{
                                width: LOGO_WIDTH, height: LOGO_HEIGHT
                            }}
                            src={data?.logo_cdnUUID ? getUrl(data?.logo_cdnUUID) : "___"}
                            // style={{fontWeight: 700, fontSize: 28}} 
                            alt='your logo'
                        />
                        : <h1 className="editable" 
                        onClick={() => setContext({key: 'logo_cdnUUID', inputSize: [120 * 2, 50 * 2], cdnUUID: data?.logo_cdnUUID, type: 'image', ratio: LOGO_WIDTH/LOGO_HEIGHT, label: 'Logo image'})} 
                        // onClick={() => setContext({key: 'logo', type: 'text', label: 'Heading', variantProperty: 'textAlign'})} 
                        style={{fontWeight: 700, fontSize: 28}}>
                            {data?.logo ? data.logo?.length < 16 ? data.logo : "Your logo" : "Your logo"}
                        </h1>
                        }
                        

                        
                            
                            {/* {"Bazzinga & Joe Law Partners"} */}
                        {/* <img className="w-auto h-9" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg" alt="" /> */}
                    </a>
                </div>

                <div className="hidden">
                    <button type="button" className="text-white">
                        <span x-show="!expanded" aria-hidden="true">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </span>

                        <span x-show="expanded" aria-hidden="true">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>
                </div>

                <nav className="hidden md:inline md:grid-cols-2 sm:hidden ml-10  mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:items-center md:justify-start md:mx-0 md:ml-2">
                    <a href="#home" style={{margin: 3}} title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Home </a>
                    <a href="#practice-areas" style={{margin: 3}} title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Practice Areas </a>
                    <a href="#our-values" title="" style={{margin: 3}} className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Our Values </a>
                    <a href="#our-team" title="" style={{margin: 3}} className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Our Team </a>
                    <a href="#about-us" title="" style={{margin: 3}} className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> About Us</a>
                    {/* <a href="#contact-us" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Contact Us</a> */}
                </nav>

                <div className="relative sm:inline-flex md:items-center md:justify-center md:inline-flex group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-3)] group-hover:shadow-lg group-hover:shadow-[#fff]/50"></div>
                    <a href="#contact-us" title="" className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normalx text-black font-black bg-blackx border border-transparent rounded-full" style={{minWidth: 150}} role="button">Contact Us</a>
                </div>
            </div>

            {/* <nav x-show="expanded" x-collapse>
                <div className="flex flex-col pt-8 pb-4 space-y-6">
                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>

                    <div className="relative inline-flex items-center justify-center group">
                        <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                        <a href="#" title="" className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Start free trial </a>
                    </div>
                </div>
            </nav> */}
        </div>
    </div>
    

    <section 
    className={`${bgEditable && 'editable'} relative overflow-hidden bg-cover bg-no-repeat py-12 bg-blackx sm:pb-16 lg:pb-20 xl:pb-24`} 
    onClick={() => bgEditable ?  setContext({key: '_', type: 'image', cdnUUID: data?.cdnUUID, inputSize: [140 * 1.8, 80 * 1.8], ratio: 14/8, label: 'Hero Image'}) : () => {}}  
    style={{
        backgroundPosition: '50%',
        backgroundImage: `url('${data?.cdnUUID ? getUrl(data?.cdnUUID) : DEFAULT_IMAGE_URL}')`,
        height: '500px',
        // ...(isDeploying ? {marginTop: 100} : {})
    }}> 
        {/* <div className="relative overflow-hidden bg-cover bg-no-repeat" style={{
        }}>
            Hello
        </div> */}

        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
            <div className="px-4 mx-auto relativea h-full sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-centerx h-full items-center" style={{justifyContent: data?.blockVariant || 'center'}}>
                    <div className="flex bg-yellow-500x flex-col" style={{width: '60vw'}}>
                        <h1  
                            onMouseEnter={() => setBgEditable(false)}
                            onMouseLeave={() => setBgEditable(true)}
                            className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl editable"
                            onClick={() => setContext({key: 'heading', type: 'text', label: 'Heading', variantProperty: 'textAlign'})} 
                            style={{textAlign: data?.headingVariant || 'center', pointerEvents: 'auto'}}
                        >
                            {data?.heading ?? ""}
                        </h1>
                        <p 
                        onMouseEnter={() => setBgEditable(false)}
                        onMouseLeave={() => setBgEditable(true)}
                        style={{textAlign: data?.subHeadingVariant || 'center'}}
                        onClick={() => setContext({key: 'subHeading', type: 'textarea', label: 'Sub-Heading', variantProperty: 'textAlign'})} 
                        className="mt-4 text-lg font-normal text-gray-400 sm:mt-8 editable">
                            {data?.subHeading ?? ""}
                        </p>
                        <div className='flex' 
                        // style={{justifyContent: data?.buttonVariant || 'center'}}
                        >
                            <a 
                            style={{marginInline: data?.buttonVariant || 'auto auto', color: '#000'}}  
                            href={isDeploying ? data?.buttonLink || "#" : '#hero'}>
                            <button
                             onMouseEnter={() => setBgEditable(false)}
                             onMouseLeave={() => setBgEditable(true)}
                             className="editable mt-6 p-3 px-6 rounded-full -inset-px  text-lg bg-gradient-to-r bg-[var(--legis-color-2)]"
                             style={{fontWeight: 600}}
                             onClick={() => setContext({key: 'button', type: 'button', label: 'Button', variantProperty: 'marginInline'})}
                             >
                                {data?.buttonLabel || "REGISTER"}
                            </button>
                                 </a>
                        </div>
                        {/* <form action="#" method="POST" className="relative mt-8 rounded-full sm:mt-12"> */}
                            {/* <div className="relative"> */}
                                
                                {/* <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    </div>
                                    <input type="email" name="" id="" placeholder="Try Java Developer, React Dev etc." className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" />
                                </div> */}
                            {/* </div> */}
                            {/* <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0"> */}
                                {/* <button type="submit" className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90">Find A Developer</button> */}
                            {/* </div> */}
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
 </div>);
}




// {/* <header className="pb-6 bg-white lg:pb-0">
//             <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                 {/* <!-- lg+ --> */}
//                 <nav className="flex items-center justify-between h-16 lg:h-20">
//                     <div className="flex-shrink-0">
//                         <a href="#" title="" className="flex">
//                             <img className="w-auto h-8 lg:h-10" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" />
//                         </a>
//                     </div>

//                     <button id='myDiv' type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
//                         {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
//                         <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
//                         </svg>

//                         {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
//                         <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>

//                     <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
//                         <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>

//                         <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Solutions </a>

//                         <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Resources </a>

//                         <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Pricing </a>
//                     </div>

//                     <a href="#" title="" className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button"> Get started now </a>
//                 </nav>

//                 {/* <!-- xs to lg --> */}
//                 <nav id='hero-navbar' onClick={() => setShowNavBar(true)} className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
//                     <div className="flow-root">
//                         <div className="flex flex-col px-6 -my-2 space-y-1">
//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>

//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Solutions </a>

//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Resources </a>

//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Pricing </a>
//                         </div>
//                     </div>

//                     <div className="px-6 mt-6">
//                         <a href="#" title="" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700" role="button"> Get started now </a>
//                     </div>
//                 </nav>
//             </div>
//         </header> */}