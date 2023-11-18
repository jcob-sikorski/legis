export default function LReviews1({data}: any) {
   
   
    const list = data?.reviews ?? [];
    console.log("TReviews: ", JSON.stringify(data));

   return <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-center text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Testimonials
        </h2>
        <div className="grid grid-cols-1 gap-12 mt-12 text-center md:grid-cols-3 sm:mt-16">
            

            {((list ?? []).map((obj: any, i: number) => 
                <div>
                    <blockquote>
                        <p className="text-lg font-medium leading-8 text-gray-900">
                            “{obj?.testimonial ?? ""}”
                        </p>
                    </blockquote>
                    <p className="mt-8 text-base font-semibold text-gray-900">{obj.clientName}</p>
                    {/* <p className="mt-1 text-sm font-normal text-gray-500">Product Manager at Jomanar</p> */}
                </div>
            ))}

            {/* <div>
                <blockquote>
                    <p className="text-lg font-medium leading-8 text-gray-900">"I didn't know designing in Webflow could be this individualized. I'd never considered it before, but Landingfolio changed my mind."</p>
                </blockquote>
                <p className="mt-8 text-base font-semibold text-gray-900">Bessie Cooper</p>
                <p className="mt-1 text-sm font-normal text-gray-500">Freelance UX Designer</p>
            </div>

            <div>
                <blockquote>
                    <p className="text-lg font-medium leading-8 text-gray-900">"We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use it."</p>
                </blockquote>
                <p className="mt-8 text-base font-semibold text-gray-900">Arlene McCoy</p>
                <p className="mt-1 text-sm font-normal text-gray-500">Product Designer at Martina.co</p>
            </div> */}
        </div>
    </div>
</section>

}