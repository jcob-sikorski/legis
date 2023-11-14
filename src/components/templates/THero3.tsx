import { faker } from "@faker-js/faker";

import './inteo/styles/global.css';

import heroImage from './inteo/images/hero-image.png'
import getInTouchImage from './inteo/images/cta-button.svg';

export default function THero3({data} : any) {
    return ( <section id={'section-' + data?.section_id} className="text-gray-600 body-font">
    <div className="bg-white pt-0 pr-16 pb-0 pl-16">
  <div className="bg-transparent pt-16 pr-4 pb-16 pl-4 flex mr-auto ml-auto flex-col items-center relative lg:flex-row
      lg:py-32 xl:py-48 md:px-8 max-w-screen-2xl">
    <div className="flex justify-center items-center w-full h-full overflow-hidden lg:w-1/2 lg:justify-end lg:bottom-0
        lg:left-0 lg:items-center">
      <img src={faker.image.url()} className="object-contain mr-8
          object-top lg:w-auto lg:h-full w-full h-auto"/>
    </div>
    <div className="mr-auto ml-auto flex justify-end relative max-w-xl xl:pr-32 lg:max-w-screen-xl">
      <div className="mb-16 lg:pr-5 lg:max-w-lg lg:mb-0">
        <div className="mb-6 max-w-xl">
          <p className="inline-block pt-1 pr-3 pb-1 pl-3 mb-4 text-pink-200 bg-pink-500 rounded-2xl uppercase text-xs
              font-semibold tracking-wider">Law Firm</p>
          <div className="text-3xl font-bold tracking-tight text-gray-900 max-w-lg sm:text-4xl sm:leading-none mb-6">
            <p className="text-black text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
                {data?.heading}
            </p>
          </div>
          <p className="text-gray-700 text-base md:text-lg">
                {data?.subHeading}
            </p>
        </div>
        {/* <div className="flex flex-col md:flex-row">
          <input type="text" placeholder="Full Name" className="md:mr-2 focus:border-blue-700 focus:outline-none
              focus:shadow-outline flex-grow transition duration-200 appearance-none text-black bg-gray-100 font-normal
              w-full h-12 text-xs rounded-md pt-3 pr-4 pb-3 pl-4 mb-2 border-2 shadow-sm border-gray-300"/>
          <input type="text" placeholder="Email Address" className="md:mr-2 focus:border-blue-700 focus:outline-none
              focus:shadow-outline flex-grow transition duration-200 appearance-none text-black bg-gray-100 font-normal
              w-full h-12 text-xs rounded-md pt-3 pr-4 pb-3 pl-4 mb-2 border-2 shadow-sm border-gray-300"/>
        </div>
        <div className="flex items-center mt-4 mr-0 mb-0 ml-0">
          <button className="transition duration-200 hover:bg-blue-900 focus:shadow-outline focus:outline-none bg-blue-700
              text-white inline-flex font-semibold tracking-wide text-medium h-12 shadow-md items-center justify-center
              pr-6 pl-6 mr-6 rounded-lg">Get Started</button>
          <a className="inline-flex items-center text-black pt-2 pr-2 pb-2 pl-2 font-semibold transition-colors duration-200
              hover:text-blue-300">
            <p>Learn More</p>
          </a>
        </div> */}
      </div>
    </div>
  </div>
</div>
  </section> );
}