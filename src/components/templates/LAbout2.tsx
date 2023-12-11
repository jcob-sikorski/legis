import { faker } from "@faker-js/faker";

export default function LAbout2({data}: any) {
    return <section className="py-12 sm:py-16 lg:py-20 bg-black">
    <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center">
            
        </div>

        <div className="relative my-12">
            <div className="max-w-5xl mx-auto">
                <div className="overflow-hidden rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        <div className="lg:col-span-2">
                            <img 
                                className="object-cover w-full h-64 lg:h-full sm:h-72 md:h-96" 
                                src={"https://loremflickr.com/cache/resized/65535_53022043472_b52e98bb28_h_640_800_nofilter.jpg"} 
                                alt="" 
                            />
                        </div>

                        <div className="flex flex-col p-6 lg:col-span-3 bg-dark-gray sm:px-10 sm:py-12">
                            <h2 className="tracking-tighter text-white">
                                <span className="block font-serifx text-5xl"> About Us </span>
                            </h2>
                                
                            <p className="font-sans mt-8 text-lg font-normal text-white">
                                {data?.paragraph ?? ""}
                            </p>

                            {/* <div className="mt-5 lg:mt-auto">
                                <p className="font-sans text-lg font-normal md:text-2xl text-white">Ruveyda Crutzen</p>
                                <p className="mt-2 font-sans text-sm font-normal text-opacity-50 text-white">Project Manager at Lorem Ipsum</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="absolute left-0 hidden transform -translate-y-1/2 top-1/2 xl:block"> */}
                {/* <button type="button" className="inline-flex items-center justify-center w-12 h-12 transition-all duration-200 rounded-full bg-dark-gray hover:bg-white hover:bg-opacity-10 text-white">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.4249 5.59168C11.0999 5.26668 10.5749 5.26668 10.2499 5.59168L6.4249 9.41668C6.0999 9.74168 6.0999 10.2667 6.4249 10.5917L10.2499 14.4167C10.5749 14.7417 11.0999 14.7417 11.4249 14.4167C11.7499 14.0917 11.7499 13.5667 11.4249 13.2417L8.19157 10L11.4249 6.76668C11.7499 6.44168 11.7416 5.90835 11.4249 5.59168Z"
                        />
                    </svg>
                </button> */}
            {/* </div> */}

            {/* <div className="absolute right-0 hidden transform -translate-y-1/2 top-1/2 xl:block"> */}
                {/* <button type="button" className="inline-flex items-center justify-center w-12 h-12 transition-all duration-200 rounded-full bg-dark-gray hover:bg-white hover:bg-opacity-10 text-white">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.0917 14.4167C8.4167 14.7417 8.9417 14.7417 9.2667 14.4167L13.0917 10.5917C13.4167 10.2667 13.4167 9.74168 13.0917 9.41668L9.2667 5.59168C8.9417 5.26668 8.4167 5.26668 8.0917 5.59168C7.7667 5.91668 7.7667 6.44168 8.0917 6.76668L11.325 10.0083L8.0917 13.2417C7.7667 13.5667 7.77503 14.1 8.0917 14.4167Z"
                        />
                    </svg>
                </button> */}
            {/* </div> */}
        </div>

        {/* <div className="flex items-center justify-center mt-8 space-x-2 md:mt-12 xl:hidden">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral"></div>
        </div> */}
    </div>
</section>

}


