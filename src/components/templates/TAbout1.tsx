export default function TAbout1({data} : any) {
    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">About Us</h1>
        <p className="mb-8 leading-relaxed">
            {data?.paragraph ?? "[NO PARAGRAPH DATA]"}
        </p>
      </div>
    </div>
  </section>);
}