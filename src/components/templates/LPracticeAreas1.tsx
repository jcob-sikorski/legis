export default function LPracticeAreas1({data, setContext}: any) {
    return <section className="py-12 bg-white sm:py-16 lg:py-20 bg-[var(--legis-color-1)]x">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center text-black">
            <h2 onClick={() => setContext({key: 'title', type: 'text', label: 'Section Title'})} className="editable text-3xl font-bold text-whitex sm:text-4xl xl:text-5xl font-pj">
                {data?.title || "Our practice areas"}
            </h2>
        </div>

        {/* <div className="mt-8 sm:mt-12">
            <svg className="w-auto h-4 mx-auto text-gray-600" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
            </svg>
        </div> */}

        <div className="grid grid-cols-1 mt-16 text-center sm:text-left gap-y-12 gap-x-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
            
            
            {((data?.areasList ?? []).map((area: any, i:number) => 
                <div className="relative lg:px-14">
                    {i!==0&& <div className="absolute top-0 left-0 hidden w-px h-16 bg-[var(--legis-color-3)]x lg:block"></div>}
                
                <p onClick={() => setContext({collection: 'areasList', key: 'practiceAreaName', label: 'Practice Area Name', type: 'text', index: i})} className="editable text-5xl font-bold text-whitex text-black font-pj">
                    {area?.practiceAreaName}
                </p>
                <p onClick={() => setContext({collection: 'areasList', key: 'practiceDescription', label: 'Practice Area Description', type: 'textarea', index: i})} className="editable mt-5 text-lg font-normal text-gray-700">
                    {area?.practiceDescription}
                </p>
            </div>
        ))}

            {/* <div className="relative lg:px-14">
                <p className="text-5xl font-bold text-white font-pj">1.5M</p>
                <p className="mt-5 text-lg font-normal text-gray-300">Lorem ipsum dolor sit amet, consect etur adipis elit. Sit enim nec.</p>
            </div>

            <div className="relative lg:px-14">
                <div className="absolute bottom-0 left-0 hidden w-px h-16 bg-gray-600 lg:block"></div>
                <p className="text-5xl font-bold text-white font-pj">41%</p>
                <p className="mt-5 text-lg font-normal text-gray-300">Lorem ipsum dolor sit amet, consect etur adipis elit. Sit enim nec.</p>
            </div>

            <div className="relative lg:px-14">
                <div className="absolute bottom-0 left-0 hidden w-px h-16 bg-gray-600 lg:block"></div>
                <p className="text-5xl font-bold text-white font-pj">3964+</p>
                <p className="mt-5 text-lg font-normal text-gray-300">Lorem ipsum dolor sit amet, consect etur adipis elit. Sit enim nec.</p>
            </div> */}
        </div>
    </div>
</section>

}