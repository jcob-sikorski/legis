import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export function LHero1({data, setContext} : {data: any, setContext: Function}) {
    return ( <div style={{fontFamily: 'IBM Plex Sans'}}>
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
                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>
                </nav>

                <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    {/* <a href="#" title="" className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Start free trial </a> */}
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

    <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto relativea sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
                <div>
                    <h1 onClick={() => setContext({key: 'heading', type: 'text', label: 'Heading'})} className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl editable">
                        {data?.heading ?? ""}
                    </h1>
                    <p onClick={() => setContext({key: 'subHeading', type: 'textarea', label: 'Sub-Heading'})} className="mt-4 text-lg font-normal text-gray-400 sm:mt-8 editable">
                        {data?.subHeading ?? ""}
                    </p>

                    <form action="#" method="POST" className="relative mt-8 rounded-full sm:mt-12">
                        <div className="relative">
                            <div className="absolute rounded-full -inset-px bg-gradient-to-r " style={{background: ("linear-gradient(90deg, var(--legis-color-1) 0%, var(--legis-color-2) 100%)")}} >  </div>
                            {/* <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input type="email" name="" id="" placeholder="Try Java Developer, React Dev etc." className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" />
                            </div> */}
                        </div>
                        {/* <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0"> */}
                            {/* <button type="submit" className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90">Find A Developer</button> */}
                        {/* </div> */}
                    </form>

                    {/* <div className="mt-8 sm:mt-12">
                        <p className="text-lg font-normal text-white">Trusted by 50k+ users</p>

                        <div className="flex items-center mt-3">
                            <div className="flex">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />
                                </svg>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                        fill="url(#b)"
                                    />

                                </svg>
                            </div>
                            <span className="ml-2 text-base font-normal text-white"> 4.1/5 </span>
                            <span className="ml-1 text-base font-normal text-gray-500"> (14k Reviews) </span>
                        </div>
                    </div> */}
                </div>

                <div className="relative">
                    <div className="absolute inset-0">
                    </div>

                    <div className="absolute inset-0">
                        <img  className="object-cover w-full h-full opacity-50" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png" alt="" />
                    </div>

                    <img className="editable relative w-full max-w-md mx-auto rounded-xl"
                    onClick={() => setContext({type: 'image', ratio: 8/10, label: 'Hero Image'})}  
                    // src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png" 
                    src={getUrl(data?.cdnUUID)}
                    alt="" />
                </div>
            </div>
        </div>
    </section>
 </div>);
}