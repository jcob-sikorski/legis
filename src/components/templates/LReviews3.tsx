import { faker } from "@faker-js/faker";

export default function LReviews3({data}: any) {
   
   
    const list = data?.reviews ?? [];
    console.log("TReviews: ", JSON.stringify(data));

   return <section className="py-10 bg-white sm:py-16 lg:py-24">
   <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
       
        <h2 className="mb-16 text-center text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Testimonials
        </h2>
        
       <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3">
           
            {((list ?? []).map((obj: any, i: number) => 
                <div className="flex flex-col bg-white border border-gray-200 rounded-md">
                <div className="flex flex-col justify-between flex-1 p-8">
                    <div className="flex-1">
                        <blockquote>
                            <p className="text-lg text-gray-800">
                            “{obj?.testimonial ?? ""}”
                            </p>
                        </blockquote>
                    </div>
 
                    <div className="mt-8">
                        <div className="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                        <div className="flex items-center">
                            <img 
                                className="flex-shrink-0 object-cover w-10 h-10 rounded-full" 
                                src={"https://loremflickr.com/cache/resized/65535_52263219211_a888bd0f39_z_640_480_nofilter.jpg"} 
                                alt="" 
                            />
                            <div className="min-w-0 ml-3">
                                <p className="text-base font-semibold text-gray-800 truncate">{obj?.clientName ?? ""}</p>
                                {/* <p className="text-base text-gray-500 truncate">Marketing Coordinator</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
           
        
       </div>
   </div>
</section>



}