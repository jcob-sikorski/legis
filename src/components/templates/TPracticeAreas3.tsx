import { EditFilled } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

export default function TPracticeAreas3({data} : any) {

    // alert(JSON.stringify(data?.areasList))

    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
   <div className="bg-white pt-16 pr-4 pb-16 pl-4 md:px-24 lg:px-8 lg:py-20">
  <div className="mt-0 mr-auto mb-0 ml-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full">
    <div className="mt-0 mr-auto mb-10 ml-auto max-w-xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div>
        <p className="inline-block pt-px pr-3 pb-px pl-3 mt-0 mr-0 mb-4 ml-0 text-xs font-semibold text-pink-200
            rounded-full bg-pink-500 tracking-wider uppercase">PRACTICE AREAS</p>
      </div>
      <div className="mt-0 mr-auto mb-6 ml-auto font-bold leading-none text-gray-900 text-3xl max-w-lg font-sans
          tracking-tight sm:text-4xl md:mx-auto">
        {/* <div className="relative inline-block">
          <svg id="Windframe_GmZobtqHt-" viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 hidden
              w-32 -mt-8 -ml-20 text-blue-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
            <div>
              <div className="w-.135 h-.30"><circle id="Windframe_howqvGUj-C" cx="1" cy="1" r=".7"/></div>
            </div>
            <rect id="Windframe_oPerEO9_6E" fill="url(#db164e35-2a0e-4c0f-ab05-f14edc6d4d30)" className="w-52 h-24"/>
          </svg> */}
        {/* </div> */}

      </div>
      {/* <p className="text-gray-700 text-base md:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p> */}
    </div>
    <div className="grid mt-0 mr-0 mb-8 ml-0 max-w-sm gap-5 lg:grid-cols-3 sm:mx-auto lg:max-w-full">


      {((data?.areasList ?? []).map((area: any, i: number) => 
                <div className="pt-20 pr-10 pb-20 pl-10 text-center border rounded lg:px-5 lg:py-10 xl:py-20">
                {/* <p className="mb-2 text-xs font-semibold text-gray-600 tracking-wide uppercase">20 Dec 2020</p> */}
                <p className="inline-block mt-0 mr-auto mb-3 ml-auto font-extrabold text-2xl leading-7 max-w-xs transition-colors
                    duration-200 hover:text-blue-700">{area?.practiceAreaName}</p>
                <p className="mt-0 mr-auto mb-2 ml-auto text-gray-700 max-w-xs">
                    {area?.practiceDescription}
                </p>
                {/* <p className="inline-flex items-center font-semibold text-blue-700 transition-colors duration-200
                    hover:text-blue-900">Read more</p> */}
              </div>
            ))}
    
    </div>
  </div>
</div>
  </section>);
}
