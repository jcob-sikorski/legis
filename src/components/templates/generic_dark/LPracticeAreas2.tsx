export default function LPracticeAreas2({ data, setContext }: any) {
  return (
    <section
      id="practice-areas"
      className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24"
      style={{ fontFamily: "var(--legis-font-main)" }}
    >
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
        <svg
          className="blur-3xl filter opacity-40"
          style={{ filter: "blur(64px)" }}
          width="756"
          height="202"
          viewBox="0 0 756 202"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M434.095 21.8754C619.918 21.8754 755.509 -33.413 755.509 31.8038C755.509 97.0206 268.41 201.855 82.5876 201.855C-103.234 201.855 82.5876 97.0207 82.5876 31.8039C82.5876 -33.4129 248.273 21.8754 434.095 21.8754Z"
            fill="url(#d)"
          />
          <defs>
            <linearGradient
              id="d"
              x1="0"
              y1="201.855"
              x2="8.92305"
              y2="-28.873"
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

      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        <img
          className="object-cover w-full h-full opacity-50"
          src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
          alt=""
        />
      </div>

      <div
        className="text-center mb-14"
        style={{ maxWidth: 1200, marginInline: "auto" }}
      >
        <h2
          className="py-4 editable text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj"
          onClick={() =>
            setContext({
              key: "title",
              type: "text",
              label: "Title",
              variantProperty: "textAlign",
            })
          }
          style={{ textAlign: data?.titleVariant || "center" }}
        >
          {data?.title || ""}
        </h2>
      </div>

      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl flex justify-center items-center">
        <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 sm-grid-cols-1 gap-x-14 gap-y-12">
          {(data?.areasList ?? []).map((area: any, i: number) => (
            <div>
              <p
                style={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
                onClick={() =>
                  setContext({
                    collection: "areasList",
                    seriableLabel: "practice area",
                    key: "practiceAreaName",
                    label: "Practice Area Name",
                    type: "text",
                    index: i,
                  })
                }
                className="editable text-3xl font-normal text-white lg:text-5xl sm:text-4xl"
              >
                {area?.practiceAreaName}
              </p>
              <p
                onClick={() =>
                  setContext({
                    collection: "areasList",
                    seriableLabel: "practice area",
                    key: "practiceDescription",
                    label: "Practice Area Description",
                    type: "textarea",
                    index: i,
                  })
                }
                className="editable mt-4 text-base font-normal text-gray-400"
              >
                {area?.practiceDescription}
              </p>
              <div className="w-full h-px mt-5 bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]"></div>
              <div className="inline-flex flex-col mt-8">
                {/* <a href="#" title="" className="text-base font-normal text-white"> Read the story </a> */}
              </div>
            </div>
          ))}

          {/* <div>
                <p className="text-3xl font-normal text-white lg:text-5xl sm:text-4xl">79.14%</p>
                <p className="mt-4 text-base font-normal text-gray-400">Lorem ipsum dolor sit amet, consec tetur adipiscing elit ges aliquam.</p>
                <div className="inline-flex flex-col mt-8">
                    <a href="#" title="" className="text-base font-normal text-white"> Read the story </a>
                    <div className="w-full h-px mt-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                </div>
            </div>

            <div>
                <p className="text-3xl font-normal text-white lg:text-5xl sm:text-4xl">$299/y</p>
                <p className="mt-4 text-base font-normal text-gray-400">Lorem ipsum dolor sit amet, consec tetur adipiscing elit ges aliquam.</p>
                <div className="inline-flex flex-col mt-8">
                    <a href="#" title="" className="text-base font-normal text-white"> Read the story </a>
                    <div className="w-full h-px mt-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                </div>
            </div>

            <div>
                <p className="text-3xl font-normal text-white lg:text-5xl sm:text-4xl">34k+</p>
                <p className="mt-4 text-base font-normal text-gray-400">Lorem ipsum dolor sit amet, consec tetur adipiscing elit ges aliquam.</p>
                <div className="inline-flex flex-col mt-8">
                    <a href="#" title="" className="text-base font-normal text-white"> Read the story </a>
                    <div className="w-full h-px mt-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                </div>
            </div> */}
        </div>
      </div>
    </section>
  );
}
