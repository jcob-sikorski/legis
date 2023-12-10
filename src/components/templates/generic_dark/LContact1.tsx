import { faker } from "@faker-js/faker";
import { getUrl } from "../../../utils";

export default function LContact1({ data, setContext }: any) {
  return (
    <section
      id="contact-us"
      className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24"
      style={{ fontFamily: "var(--legis-font-main)" }}
    >
      <div className="absolute bottom-0 transform -translate-x-1/2 translate-y-96 left-1/2">
        <svg
          className="blur-3xl filter"
          style={{ filter: "blur(64px)" }}
          width="643"
          height="408"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M183.151 216.787C86.498 123.868-62.309 137.493 30.03 41.445c92.337-96.049 494.126-6.876 590.779 86.043 96.652 92.919-148.432 154.396-240.769 250.445-92.338 96.048-100.237-68.228-196.889-161.146Z"
            fill="url(#c)"
          />
          <defs>
            <linearGradient
              id="c"
              x1="663.766"
              y1="168.785"
              x2="303.65"
              y2="469.667"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" style={{ stopColor: "var(--legis-color-1)" }} />
              <stop
                offset="100%"
                style={{ stopColor: "var(--legis-color-2)" }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full opacity-50"
          src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
          alt=""
        />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-sm mx-auto text-center">
          {/* <h2 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl">Contact us</h2> */}
          <h2
            style={{
              textAlign: data?.headingVariant || "center",
              pointerEvents: "auto",
            }}
            onClick={() =>
              setContext({
                key: "title",
                type: "text",
                label: "Title",
                variantProperty: "textAlign",
              })
            }
            className="editable mt-6 text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj"
          >
            {data?.title || "Contact us"}
          </h2>
          {/* <p className="mt-4 text-base font-normal text-gray-400 sm:text-lg sm:mt-6"></p> */}
        </div>

        <div className="grid max-w-md grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  mx-auto mt-8 overflow-hidden text-center bg-black border border-gray-900 bg-opacity-80 md:text-left sm:mt-12 lg:mt-16  rounded-xl filter backdrop-blur-lg md:max-w-none md:mx-0">
          <div className="">
            <div className="p-8 lg:p-12 xl:p-16 sm:items-center sm:items-center sm:flex-col">
              <svg
                className="w-12 h-12 mx-auto md:mx-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                  stroke="url(#c31)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="c31"
                    x1="3"
                    y1="5"
                    x2="22.9157"
                    y2="8.70639"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "var(--legis-color-1)" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "var(--legis-color-2)" }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              <p className="mt-8 text-xl font-normal text-white lg:mt-12 lg:text-2xl">
                Email Address
              </p>
              <p
                onClick={() =>
                  setContext({ key: "email", type: "text", label: "email" })
                }
                className="editable mt-5 text-base font-normal"
              >
                <a
                  href="#contact-us"
                  title=""
                  className="text-gray-400 hover:text-white"
                >
                  {data?.email ?? "example@example.com"}
                </a>
              </p>
              {/* <p className="text-base font-normal mt-0.5">
                        <a href="#" title="" className="text-gray-400 hover:text-white"> contact@example.com </a>
                    </p> */}
            </div>
          </div>

          <div className="border-t border-gray-900 md:border-l md:border-t-0">
            <div className="p-8 lg:p-12 xl:p-16 p-8 lg:p-12 xl:p-16 sm:items-center sm:items-center sm:flex-col">
              <svg
                className="w-12 h-12 mx-auto md:mx-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                  stroke="url(#c32)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="c32"
                    x1="3"
                    y1="3"
                    x2="23.1826"
                    y2="5.92138"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "var(--legis-color-1)" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "var(--legis-color-2)" }}
                    />
                  </linearGradient>
                </defs>
              </svg>

              <p className="mt-8 text-xl font-normal text-white lg:mt-12 lg:text-2xl ">
                Call Us
              </p>
              <p
                onClick={() =>
                  setContext({
                    key: "phone",
                    type: "text",
                    label: "Phone number",
                  })
                }
                className="mt-5 text-base font-normal editable"
              >
                <a
                  href="#contact-us"
                  title=""
                  className="text-gray-400 hover:text-white"
                >
                  {data?.phone || "1-234-567-7890"}{" "}
                </a>
              </p>
              {/* <p className="text-base font-normal mt-0.5">
                        <a href="#" title="" className="text-gray-400 hover:text-white"> +1 (252) 555-0356 </a>
                    </p> */}
            </div>
          </div>

          <div className="border-t border-gray-900 md:border-l md:border-t-0">
            <div className="p-8 lg:p-12 xl:p-16 p-8 lg:p-12 xl:p-16 sm:items-center sm:items-center sm:flex-col">
              <svg
                className="w-12 h-12 mx-auto md:mx-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003C9.26234 19.576 7.34159 17.6553 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z"
                  stroke="url(#c33)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
                  stroke="url(#c34)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="c33"
                    x1="4"
                    y1="3"
                    x2="22.0563"
                    y2="5.16519"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "var(--legis-color-1)" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "var(--legis-color-2)" }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="c34"
                    x1="4"
                    y1="3"
                    x2="22.0563"
                    y2="5.16519"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "var(--legis-color-1)" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "var(--legis-color-2)" }}
                    />
                  </linearGradient>
                </defs>
              </svg>

              <p className="mt-8 text-xl font-normal text-white lg:mt-12 lg:text-2xl">
                Location
              </p>
              <p className="mt-5 text-base font-normal">
                <a
                  href="#contact-us"
                  title=""
                  onClick={() =>
                    setContext({
                      key: "address",
                      type: "text",
                      label: "Address",
                    })
                  }
                  className="editable text-gray-400 hover:text-white"
                >
                  {data?.address || "Address, A1 234BC"}
                  {/* {data?.addressLine1 ?? "Address Line 1"}<br />{data?.addressLine2 ?? "Address Line 2"} */}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
