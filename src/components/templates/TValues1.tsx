export default function TValues1({data} : any) {
    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
        <h1 className="text-2xl title-font mb-4 text-gray-900 tracking-widest font-bold">Our Values</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{data?.description}</p>
      </div>

      <div className="flex flex-wrap -m-4">

        {((data?.valuesList ?? []).map((value: any) => 
                <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">{value?.name}</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">{value?.description}</p>
                    <p className="mt-3 text-indigo-500 italic inline-flex items-center">
                        "{value?.motto}"
                    </p>
                  </div>
                </div>
              </div>
        ))}

        

      </div>
    </div>
  </section> );
}