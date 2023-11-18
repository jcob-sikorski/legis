import { faker } from "@faker-js/faker";

export default function LAbout1({data}: any) {
    return <section className="py-12 bg-black sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div className="md:order-last">
                <img 
                    className="object-cover w-full h-full mx-auto rounded-md lg:max-w-md" 
                    src={"https://loremflickr.com/cache/resized/65535_53022043472_b52e98bb28_h_640_800_nofilter.jpg"} 
                    alt="" 
                />
            </div>

            <div className="lg:max-w-md">
                {/* <p className="text-sm font-normal tracking-widest uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500"> FAQ </span>
                </p> */}
                <h2 className="mt-6 text-3xl font-normal text-white sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">About Us</h2>

                <ul className="mt-12 space-y-12 sm:mt-16">
                    <li>
                        {/* <h3 className="text-2xl font-normal text-white">What is Tailwind CSS?</h3> */}
                        <p className="mt-5 text-base font-normal text-gray-400">
                            {data?.paragraph ?? ""}
                        </p>
                    </li>

                    {/* <li>
                        <h3 className="text-2xl font-normal text-white">Does this work with Wordpress?</h3>
                        <p className="mt-5 text-base font-normal text-gray-400">No, our products do not work out of the box with Wordpress. You would need development experience or hire a developer with knowledge of Tailwind CSS to implement this template with Wordpress</p>
                    </li> */}
                </ul>
            </div>
        </div>
    </div>
</section>
}


