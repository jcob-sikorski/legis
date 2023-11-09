export default function TReviews1({data} : any) {

    const list = typeof data?.reviews === "string" ? mock.trim()?.split(";") : data?.reviews;

    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
        <h1 className="text-2xl font-bold title-font mb-4 text-gray-900 tracking-widest">TESTIMONIALS</h1>
      </div>
      <div className="flex flex-wrap -m-4">
      {((list ?? []).map((value: any) => 
      <>
                <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center">
                  <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://dummyimage.com/302x302" />
                  <p className="leading-relaxed">"{value?.replaceAll("\"", "").trim()}"</p>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">SATISFIED CLIENT</h2>
                  {/* <p className="text-gray-500">{JSON.stringify(list)}</p> */}
                </div>
              </div>
              </>
        ))}
        
        
      </div>
    </div>
  </section> );
}

const mock = `
"\"Jessica Savory was a true legal maestro in handling my case. Her expertise in food consumer law is unmatched, and her dedication to securing a favorable outcome left me completely satisfied.\"; \"David Nutshell's attention to detail and thorough understanding of the complexities in food regulations were instrumental in resolving my legal issues. A lawyer who not only knows the law but also ensures it serves justice.\"; \"Olivia Tastemaker is a legal genius! Her innovative approach and genuine concern for her clients set her apart. With her on my side, navigating the legal intricacies of the food industry became a surprisingly smooth experience.\""
`.trim();