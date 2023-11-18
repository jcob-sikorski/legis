import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export default function LContact3({data} : any) {
    return ( <section className="py-12 bg-gray-50 sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36">
            <div className="flex flex-col self-stretch justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Contact Us</h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">Clarity gives you the blocks & components you need to create a truly professional website.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:mt-auto">
                    <div>
                        <h3 className="text-xs font-medium tracking-widest text-[var(--legis-color-2)] uppercase">OFFICE Hours</h3>
                        <p className="mt-5 text-base font-medium text-gray-900">
                            {data?.officeHours ?? "MON-FRI 8:00-16:00"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-medium tracking-widest text-[var(--legis-color-2)] uppercase">Our Address</h3>
                        <p className="mt-5 text-base font-medium text-gray-900">
                        {data?.addressLine1 ?? "Address Line 1"}<br />{data?.addressLine2 ?? "Address Line 2"} 
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-medium tracking-widest text-[var(--legis-color-2)] uppercase">E-mail</h3>
                        <p className="mt-5 text-base font-medium text-gray-900">
                            {data?.email ?? "example@example.com"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-medium tracking-widest text-[var(--legis-color-2)] uppercase">Phone</h3>
                        <p className="mt-5 text-base font-medium text-gray-900">
                            {data?.phone ?? "+1-234-567-7890"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl">
                <div className="p-6 sm:p-10">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="text-base font-medium text-gray-900"> Your name </label>
                            <div className="mt-2">
                                <input type="text" name="fullName" id="fullName" placeholder="Enter your full name" className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--legis-color-3)] focus:ring-1 focus:ring-[var(--legis-color-3)]" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--legis-color-3)] focus:ring-1 focus:ring-[var(--legis-color-3)]" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="text-base font-medium text-gray-900"> Write your message </label>
                            <div className="mt-2">
                                <textarea
                                    name="email"
                                    id="email"
                                    placeholder="Write us your question here..."
                                    // rows="4"
                                    className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 resize-y rounded-xl focus:outline-none focus:border-[var(--legis-color-3)] focus:ring-1 focus:ring-[var(--legis-color-3)]"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-[var(--legis-color-2)] border border-transparent rounded-xl hover:bg-[var(--legis-color-2)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--legis-color-3)]"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
);
}