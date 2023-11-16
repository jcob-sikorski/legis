import { faker } from "@faker-js/faker";

import './inteo/styles/global.css';

import heroImage from './inteo/images/hero-image.png'
import getInTouchImage from './inteo/images/cta-button.svg';
import { getUrl } from "../../utils";

function THero2({data} : any) {
    return ( <section id={'section-' + data?.section_id} className="text-gray-600 body-font">
    <div className="container mx-auto">
        <div className="flex flex-col xl:px-32 items-center text-center gap-6 py-20">
          <h1 className="font-display md:text-display-2xl text-display-lg">
            {data?.heading}
          </h1>
          <p className="col-span-8 md:text-body-xl text-body-lg font-light text-neutral-700 max-w-[800px]">
          {data?.subHeading}
          </p>
        </div>
      </div>
      <div className="relative">
        <img src={data?.cdnUUID ? getUrl(data?.cdnUUID): heroImage} alt="Hero Image" />
        <a href="/">
          <img
            src={getInTouchImage}
            alt="Get in touch"
            className="absolute xl:left-28 lg:left-[44%] md:left-[42%] left-[35%] -top-16"
          />
        </a>
      </div>
  </section> );
}

export default THero2;