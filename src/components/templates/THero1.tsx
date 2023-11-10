
function THero1({data} : any) {
    return ( <section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div
    className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px] bg-[#28354f] color-1">
    <div
      className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed">
      <div className="flex h-full items-start mt-24 justify-start">
        <div className="px-6 text-start text-white md:px-12">
            <h3 className="text-lg mb-6">
                {data?.superHeading ?? 'ON-DEMAND WEBCAST'}
            </h3>
            <h2 className="text-4xl font-normal mb-6 tracking-tight md:text-5xl xl:text-6xl">
                {data?.heading ?? "The best offer on the market for your business"}
            </h2>
            <p className="text-lg mb-8">
                {data?.subHeading ?? "The best offer on the market for your business"}
            </p>
            <a className="mb-2 inline-block rounded-full border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 md:mr-2 md:mb-0"
                data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">{data?.btnLabel ?? "REGISTER"}</a>
            {/* <a className="inline-block rounded-full px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-20 hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-0 active:text-neutral-300"
                data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Learn more</a> */}
        </div>
      </div>
    </div>
  </div>
  </section> );
}

export default THero1;