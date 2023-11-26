import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export default function LHero2({data, setContext} : any) {

    let heading = data?.heading ?? "";

    let allButLastWord = "";
    let lastWord = "";

    if (heading) {
        let str = heading;
        let words = str.split(" ");
        allButLastWord = words.slice(0, -1).join(" ") + " ";
        lastWord = words[words.length - 1];
    }

    return <div className="bg-gradient-to-b bg-white " style={{fontFamily: 'ui-sans-serif, system-ui', transition: '0.5s'}}>
    <header className="">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
                <div className="flex-shrink-0 ">
                    <a href="#" title="" className="flex">
                        {/* <img className="w-auto h-8" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/logo.svg" alt="" /> */}
                        <h1 style={{fontWeight: 700, fontSize: 28}}>
                            {data?.logo ?? "Your logo"}
                        </h1>
                    </a>
                </div>

                <button type="button" className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                    {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                    <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>

                    {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                    <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                    <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Features </a>

                    <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Solutions </a>

                    <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Resources </a>

                    <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Pricing </a>

                    {/* <div className="w-px h-5 bg-black/20"></div>

                    <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Log in </a>

                    <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white" role="button"> Try for free </a> */}
                </div>
            </div>
        </div>
    </header>

    <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <h1 onClick={() => setContext({key: 'heading', type: 'text', label: 'Heading'})} className="editable text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                        {allButLastWord}
                        <div className="relative inline-flex">
                            <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[var(--legis-color-2)]"></span>
                            <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">{lastWord}</h1>
                        </div>
                    </h1>

                    <p onClick={() => setContext({key: 'subHeading', type: 'textarea', label: 'Sub-Heading'})} className="editable mt-8 text-base text-black sm:text-xl">
                        {data?.subHeading ?? ""} 
                    </p>

                    <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                        <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 color-3" role="button"> Contact Us</a>

                        {/* <a href="#" title="" className="inline-flex items-center mt-6 text-base font-semibold transition-all duration-200 sm:mt-0 hover:opacity-80">
                            <svg className="w-10 h-10 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path fill="#F97316" stroke="#F97316" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch video
                        </a> */}
                    </div>
                </div>

                <div>
                    <img 
                    onClick={() => setContext({key: '_', type: 'image', ratio: 8/10, label: 'Hero Image'})}  
                    className="editable w-full rounded-xl"
                    src={data?.cdnUUID ? getUrl(data?.cdnUUID) : "https://loremflickr.com/cache/resized/65535_52623052755_338d4ebf43_c_640_480_nofilter.jpg"}
                     alt="" />
                </div>
            </div>
        </div>
    </section>
</div>
}