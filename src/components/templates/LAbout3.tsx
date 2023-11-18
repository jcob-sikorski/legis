import { faker } from "@faker-js/faker";

export default function LAbout3({data}: any) {
    return <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative">
            <div className="overflow-hidden aspect-square sm:aspect-video rounded-2xl lg:rounded-3xl group">
                <img 
                className="object-cover w-full h-full transition-all duration-200 group-hover:scale-110" 
                src={"https://loremflickr.com/cache/resized/65535_53022043472_b52e98bb28_h_640_800_nofilter.jpg"} 
                alt="" />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 to-transparent rounded-2xl lg:rounded-3xl opacity-80"></div>
            <div className="absolute bottom-0 w-full px-4 py-8 text-center -translate-x-1/2 left-1/2 lg:p-12">
                <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">ABOUT US</p>
            </div>
        </div>

        <div className="gap-12 mt-12 text-center  sm:mt-16">
            <p className="text-lg font-medium leading-8 text-gray-900">
                {data?.paragraph ?? ""}
            </p>
        </div>
    </div>
</section>
}


