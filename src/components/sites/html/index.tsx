import { Parser } from "html-to-react";

function Html() {
  const myHtml = data;
  return <div>{Parser().parse(myHtml)}</div>;
}

export default Html;

const data = `
<div class="ant-layout site-layout css-dev-only-do-not-override-qgg3xn" style="margin-right: 300px;">
    <main class="ant-layout-content css-dev-only-do-not-override-qgg3xn" style="max-width: 1200px; margin: 24px 16px 0; overflow: initial;">
        [selectedSectionId]:
        <!-- -->a59502fc-d651-4bc3-93c5-d3359146e6c9<br />
        [selectedTemplateId]:
        <!-- -->TContact1<br />
        <div>
            [section_id]:
            <!-- -->9b432fa4-c7da-432c-a83b-7504e8e35ed4
            <section class="text-gray-600 body-font">
                <div class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px] bg-[url(&#x27;https://tecdn.b-cdn.net/img/new/standard/city/078.jpg&#x27;)]">
                    <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.75)]">
                        <div class="flex h-full items-start mt-24 justify-start">
                            <div class="px-6 text-start text-white md:px-12">
                                <h3 class="text-lg mb-6">ON-DEMAND WEBCAST</h3>
                                <h2 class="text-4xl font-normal mb-6 tracking-tight md:text-5xl xl:text-6xl">The best offer on the market for your business</h2>
                                <p class="text-lg mb-8">The best offer on the market for your business</p>
                                <a
                                    class="mb-2 inline-block rounded-full border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 md:mr-2 md:mb-0"
                                    data-te-ripple-init="true"
                                    data-te-ripple-color="light"
                                    href="#!"
                                    role="button"
                                >
                                    REGISTER
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div style="border: 4px solid #ff6550;">
            [section_id]:
            <!-- -->a59502fc-d651-4bc3-93c5-d3359146e6c9
            <section class="text-gray-600 body-font relative">
                <div class="absolute inset-0 bg-gray-300">
                    <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        scrolling="no"
                        src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                        style="filter: grayscale(1) contrast(1.2) opacity(0.4);"
                    ></iframe>
                    ;
                </div>
                <div class="container px-5 py-24 mx-auto flex">
                    <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>
                        <p class="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
                        <div class="relative mb-4">
                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div class="relative mb-4">
                            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            ></textarea>
                        </div>
                        <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                        <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <div class="ant-flex css-dev-only-do-not-override-qgg3xn ant-flex-align-center ant-flex-justify-center" style="min-height: 100px;">
        <h1 class="ant-typography css-dev-only-do-not-override-qgg3xn" style="cursor: pointer;">+ New section</h1>
    </div>
    <footer class="ant-layout-footer css-dev-only-do-not-override-qgg3xn" style="text-align: center;">Legis - Footer</footer>
</div>
`;
