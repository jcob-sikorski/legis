export default function LPracticeAreas3({data}: any) {
    return <section className="py-12 bg-black sm:py-16 lg:py-20 xl:py-24" style={{fontFamily: 'IBM Plex Sans'}}>
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
            <h2 className="text-3xl font-normal text-white">Practice Areas</h2>
        </div>

        <div className="max-w-5xl mx-auto mt-12 text-center">
            {/* <div className="grid grid-cols-3 border-b border-gray-900">
                <div className="py-4 pr-6 lg:pr-16 sm:py-12">
                    <p className="text-3xl font-normal sm:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> 1M+ </span>
                    </p>
                    <p className="mt-3 text-xs font-normal text-gray-400 sm:text-base lg:text-lg">Tickets Delivered This Month</p>
                </div>

                <div className="px-6 py-4 border-l border-gray-900 sm:py-12 lg:px-16">
                    <p className="text-3xl font-normal sm:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> 37K+ </span>
                    </p>
                    <p className="mt-3 text-xs font-normal text-gray-400 sm:text-base lg:text-lg">Active Customers Rate</p>
                </div>

                <div className="py-4 pl-6 border-l border-gray-900 lg:pl-16 sm:py-12">
                    <p className="text-3xl font-normal sm:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> 99% </span>
                    </p>
                    <p className="mt-3 text-xs font-normal text-gray-400 sm:text-base lg:text-lg">Customer Satisfaction Rate</p>
                </div>
            </div> */}

            <div className="grid max-w-2xl grid-cols-1 px-12 mx-auto md:px-0">

            {((data?.areasList ?? []).map((area: any, i:number) => 
                <div className="py-4 pl-6 border-gray-900 lg:pl-16 sm:py-12">
                    <p className="text-3xl font-normal sm:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-transparent text-white bg-clip-text bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]"> 
                        {area?.practiceAreaName}
                        {/* 42%  */}
                        </span>
                    </p>
                    <p className="mt-3 text-xs font-normal text-gray-400 sm:text-base lg:text-lg">
                        {area?.practiceDescription}
                        {/* Customers Retention Rate */}
                    </p>
                </div>
            ))}

                {/* <div className="py-4 pr-6 lg:pr-16 sm:py-12">
                    <p className="text-3xl font-normal sm:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> 25 </span>
                    </p>
                    <p className="mt-3 text-xs font-normal text-gray-400 sm:text-base lg:text-lg">Expert Team Members</p>
                </div>

                <div className="py-4 pl-6 border-l border-gray-900 lg:pl-16 sm:py-12">
                    <p className="text-3xl font-normal sm:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> 42% </span>
                    </p>
                    <p className="mt-3 text-xs font-normal text-gray-400 sm:text-base lg:text-lg">Customers Retention Rate</p>
                </div> */}
            </div>
        </div>
    </div>
</section>


}

