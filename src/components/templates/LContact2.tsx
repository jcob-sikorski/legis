import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export default function LContact2({data} : any) {
    return ( <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-36">
            <div>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Love to hear from you, Get in touch</h2>
                {/* <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">Clarity gives you the blocks and components you need to create a truly professional website, landing page or admin panel for your SaaS and gives the blocks.</p> */}
            </div>

            <div>
                <img className="object-cover w-full rounded-2xl" src="https://landingfoliocom.imgix.net/store/collection/saasui/images/contact/7/man-talking-on-phone.png" alt="" />
            </div>
        </div>

        <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-12 sm:mt-16 lg:mt-20">
            <div className="border-gray-300 sm:px-14">
                <p className="text-xs font-semibold tracking-widest text-[var(--legis-color-2)] uppercase">Our Address</p>
                <p className="mt-5 text-base font-medium text-gray-900">
                {data?.officeHours ?? "MON-FRI 8:00-16:00"}
                </p>
            </div>

            {/* <div className="w-20 h-px bg-gray-300 sm:hidden"></div> */}

            <div className="border-gray-300 sm:border-l sm:px-14">
                <p className="text-xs font-semibold tracking-widest text-[var(--legis-color-2)] uppercase">Our Address</p>
                <p className="mt-5 text-base font-medium text-gray-900">
                {data?.addressLine1 ?? "Address Line 1"}<br />{data?.addressLine2 ?? "Address Line 2"}    
                </p>
            </div>

            {/* <div className="w-20 h-px bg-gray-300 sm:hidden"></div>

            <div className="border-gray-300 lg:border-l lg:px-8 xl:px-14">
                <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase">Canada Office Hours</p>
                <p className="mt-5 text-base font-medium text-gray-900">8502 Preston Rd. Ingle, <br />Maine 98380, USA</p>
            </div> */}

            {/* <div className="w-20 h-px bg-gray-300 sm:hidden"></div> */}

            <div className="border-gray-300 sm:border-l sm:pl-14 lg:pl-8 xl:pl-14">
                <p className="text-xs font-semibold tracking-widest text-[var(--legis-color-2)] uppercase">E-MAIL</p>
                <p className="mt-5 text-base font-medium text-gray-900">
                    {data?.email ?? "example@example.com"}
                </p>
            </div>

            <div className="border-gray-300 sm:border-l sm:pl-14 lg:pl-8 xl:pl-14">
                <p className="text-xs font-semibold tracking-widest text-[var(--legis-color-2)] uppercase">Phone number</p>
                <p className="mt-5 text-base font-medium text-gray-900">
                    {data?.phone ?? "+1-234-567-7890"}
                </p>
            </div>
        </div>
    </div>
</section>);
}