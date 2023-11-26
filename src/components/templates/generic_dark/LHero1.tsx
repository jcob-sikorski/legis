import { faker } from "@faker-js/faker";
import { getUrl } from "../../../utils";

export function LHero1({data, setContext} : {data: any, setContext: Function}) {

    // let data = {...mockData, blockVariant: 'center', buttonVariant: 'center', headingVariant: 'center', subHeadingVariant: 'center' };

    return ( <div id='home' style={{fontFamily: 'var(--legis-font-main)'}}>
        
    <div className="py-4 bg-black sm:py-6" x-data="{expanded: false}">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div className="shrink-0">
                    <a href="#" title="" className="flex text-white font-black">
                        {/* {data?.logo} */}
                        <h1 style={{fontWeight: 700, fontSize: 28}}>
                            {data?.logo ?? "Your logo"}
                        </h1>
                        {/* <img className="w-auto h-9" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg" alt="" /> */}
                    </a>
                </div>

                <div className="flex md:hidden">
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

                <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
                    <a href="#home" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Home </a>
                    <a href="#practice-areas" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Practice Areas </a>
                    <a href="#our-values" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Our Values </a>
                    <a href="#our-team" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Our Team </a>
                    <a href="#about-us" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> About Us</a>
                    {/* <a href="#contact-us" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Contact Us</a> */}
                </nav>

                <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-3)] group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <a href="#contact-us" title="" className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normalx text-black font-black bg-blackx border border-transparent rounded-full" role="button">Contact Us</a>
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

    <section className="
    relative overflow-hidden bg-cover bg-no-repeat py-12 bg-blackx sm:pb-16 lg:pb-20 xl:pb-24" style={{
        backgroundPosition: '50%',
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
        height: '500px',
    }}>
        {/* <div className="relative overflow-hidden bg-cover bg-no-repeat" style={{
        }}>
            Hello
        </div> */}

        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
            <div className="px-4 mx-auto relativea h-full sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-centerx h-full items-center" style={{justifyContent: data?.blockVariant || 'center'}}>
                    <div className="flex bg-yellow-500x flex-col" style={{width: '60vw'}}>
                        <h1  onClick={() => setContext({key: 'heading', type: 'text', label: 'Heading', variantProperty: 'textAlign'})} className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl editable"
                            style={{textAlign: data?.headingVariant || 'center'}}
                        >
                            {data?.heading ?? ""}
                        </h1>
                        <p 
                        style={{textAlign: data?.subHeadingVariant || 'center'}}
                        onClick={() => setContext({key: 'subHeading', type: 'textarea', label: 'Sub-Heading', variantProperty: 'textAlign'})} 
                        className="mt-4 text-lg font-normal text-gray-400 sm:mt-8 editable">
                            {data?.subHeading ?? ""}
                            
                        </p>
                        <div className='flex' 
                        // style={{justifyContent: data?.buttonVariant || 'center'}}
                        >
                            <button
                             className="editable mt-6 rounded-full -inset-px h-14 w-60 text-lg bg-gradient-to-r font-black bg-[var(--legis-color-2)]"
                             style={{marginInline: data?.buttonVariant || 'auto auto'}} 
                             onClick={() => setContext({key: 'button', type: 'button', label: 'Button', variantProperty: 'marginInline'})}
                             >
                                REGISTER {data?.buttonVariant}
                            </button>
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