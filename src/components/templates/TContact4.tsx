export default function TContact4({data} : any) {
    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font relative">
        <div className="container">
        <div className="col-span-6 py-10" >
            <h3 className="font-display md:text-display-lg text-display-sm font-normal pb-4">
              Kick-start your lawsuit with us
            </h3>
            <a
              href="/"
              className="font-display md:text-display-lg text-display-sm italic text-primary-600 underline">
              Send us a hi
            </a>
        </div>
        <div className="grid grid-cols-2 mb-14">
          <div className="flex justify-end col-span-6">
          <div className="col-span-6 flex flex-col gap-8" style={{width: '50%'}}>
            <div className="flex flex-col gap-2">
              <p className="text-display-xs font-display font-normal">
                Brooklyn, New York
              </p>
              <p className="text-body-sm font-light text-neutral-900">
                962 Fifth Avenue Str, 3rd Floor-Trump Building NY 10006, United
                State.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-body-sm font-light text-neutral-900">
                Email us at
              </p>
              <a
                className="text-display-xs font-display font-normal text-primary-600"
                href="mailto:hello@landify.design">
                hello@landify.design
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-body-sm font-light text-neutral-900">
                If you're hurry, quick call for us
              </p>
              <a
                className="text-display-xs font-display font-normal text-primary-600"
                href="/">
                +8(663)125-08-59
              </a>
            </div>
          </div>
          </div>
        </div>
        </div>
  </section> );
}