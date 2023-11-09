export default function TPracticeAreas1({data} : any) {
    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
        Practice Areas
      </h1>

      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      {((data?.areasList ?? []).map((area: any) => 
            <div className="p-4 md:w-1/3 flex">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                {/* {JSON.stringify(area)} */}
            </div>
            <div className="flex-grow pl-6">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{area?.PracticeAreaTitle}</h2>
            <p className="leading-relaxed text-base">
                {area?.PracticeAreaDescription}
            </p>
            {/* <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </a> */}
            </div>
        </div>
       ))}
      </div>
    </div>
  </section>);
}