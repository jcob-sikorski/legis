import { EditFilled } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { switchIcon } from "../../utils";

export default function TValues2({data} : any) {

    // alert(JSON.stringify(data))

    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
      <div className="bg-white pt-16 pr-4 pb-16 pl-4 md:px-24 lg:px-8 lg:py-20">
  <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl mr-auto ml-auto w-full">
    <div className="mt-0 mr-auto mb-10 ml-auto max-w-xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div className="mt-0 mr-auto mb-6 ml-auto text-3xl font-bold leading-none tracking-tight text-gray-900 max-w-lg
          font-sans sm:text-4xl md:mx-auto">
      </div>
      <div>
        <p className="inline-block pt-px pr-3 pb-px pl-3 mt-0 mr-0 mb-4 ml-0 text-xs font-semibold text-pink-200
            rounded-full bg-pink-500 tracking-wider uppercase rounded-full">OUR VALUES</p>
      </div>
      <p className="text-gray-700 text-base md:text-lg">
        {data?.description}
        </p>
    </div>
    <div className="mt-0 mr-0 mb-10 ml-0 grid gap-8 row-gap-8 lg:grid-cols-3">
      
    {((data?.valuesList ?? []).map((area: any, i: number) => 
                <div className="sm:text-center">
                <p className="text-blue-600 mt-0 mr-auto mb-4 ml-auto flex w-16 h-16 bg-blue-50 items-center justify-center
                    rounded-full sm:w-24 sm:h-24">    
                    <i className={switchIcon(area.name)} style={{fontSize: 48}}></i>      
                </p>
                <p className="leading-5 font-bold mb-2">{area.name}</p>
                <p className="text-sm text-gray-900 max-w-md sm:mx-auto mb-3">Cheese on toast airedale the big cheese. Danish
                    {area.description}</p>
                {/* <p className="inline-flex font-semibold text-purple-700 items-center transition-colors duration-200
                    hover:text-purple-800 mb-3">Learn more</p> */}
              </div>
            ))}
      
     
    </div>
  </div>
</div>
  </section>);
}
