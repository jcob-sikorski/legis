import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export default function LReviews2({ data, setContext }: any) {
  // const list = data?.reviews ?? [];
  // console.log("TReviews: ", JSON.stringify(data));

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-black"
      style={{ fontFamily: "var(--legis-font-main)" }}
    >
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center">
          <h2
            onClick={() =>
              setContext({
                section_id: data?.section_id,
                key: "title",
                type: "text",
                label: "Title",
                variantProperty: "textAlign",
                placeholder: "See what our clients are saying",
              })
            }
            className="py-4 editable text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj"
            style={{ textAlign: data?.titleVariant || "center" }}
          >
            {data?.title || "See what our clients are saying"}
          </h2>
        </div>

        <div className="grid break-all grid-cols-1 gap-16 mt-12 lg:grid-cols-1 xl:grid-cols-2 md:mt-16 lg:gap-y-20">
          {(data?.reviews ?? []).map((obj: any, i: number) => (
            <div className="sm:flex sm:items-start">
              <img
                className="editable flex-shrink-0 object-cover w-24 h-24 rounded-full"
                onClick={() =>
                  setContext({
                    cdnUUID: obj?.cdnUUID,
                    collection: "reviews",
                    seriableLabel: "review",
                    key: "cdnUUID",
                    type: "image",
                    ratio: 1,
                    label: "Profile Picture",
                    index: i,
                  })
                }
                src={
                  obj?.cdnUUID
                    ? getUrl(obj.cdnUUID)
                    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                }
                alt=""
              />
              <div className="mt-6 sm:ml-6 sm:mt-0">
                <blockquote>
                  <p
                    onClick={() =>
                      setContext({
                        collection: "reviews",
                        seriableLabel: "review",
                        key: "testimonial",
                        label: "Review",
                        type: "textarea",
                        index: i,
                      })
                    }
                    className="editable font-sans text-xl font-normal text-opacity-50 text-white"
                  >
                    {obj?.testimonial || "[Client Review here...]"}
                  </p>
                </blockquote>
                <p
                  className="editable mt-6 font-sans text-2xl font-normal text-white"
                  onClick={() =>
                    setContext({
                      collection: "reviews",
                      seriableLabel: "review",
                      key: "clientName",
                      label: "Review",
                      type: "text",
                      index: i,
                    })
                  }
                >
                  {obj?.clientName || "[Client name here...]"}
                </p>
                {/* <p className="mt-1.5 text-white text-sm font-sans font-normal text-opacity-50">Director at Lorem Ipsum</p> */}
              </div>
            </div>
          ))}

          {/* <div className="sm:flex sm:items-start">
               <img className="flex-shrink-0 object-cover w-24 h-24 rounded-full" src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-female-1.png" alt="" />
               <div className="mt-6 sm:ml-6 sm:mt-0">
                   <blockquote>
                       <p className="font-sans text-xl font-normal text-opacity-50 text-white">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque.</p>
                   </blockquote>
                   <p className="mt-6 font-sans text-2xl font-normal text-white">Ruveyda Crutzen</p>
                   <p className="mt-1.5 text-white text-sm font-sans font-normal text-opacity-50">Project Manager at Lorem Ipsum</p>
               </div>
           </div>

           <div className="sm:flex sm:items-start">
               <img className="flex-shrink-0 object-cover w-24 h-24 rounded-full" src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-female-2.png" alt="" />
               <div className="mt-6 sm:ml-6 sm:mt-0">
                   <blockquote>
                       <p className="font-sans text-xl font-normal text-opacity-50 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie.</p>
                   </blockquote>
                   <p className="mt-6 font-sans text-2xl font-normal text-white">Sophie Lambert</p>
                   <p className="mt-1.5 text-white text-sm font-sans font-normal text-opacity-50">CEO at Lorem Ipsum Dolor</p>
               </div>
           </div>

           <div className="sm:flex sm:items-start">
               <img className="flex-shrink-0 object-cover w-24 h-24 rounded-full" src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-male-2.png" alt="" />
               <div className="mt-6 sm:ml-6 sm:mt-0">
                   <blockquote>
                       <p className="font-sans text-xl font-normal text-opacity-50 text-white">Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque, adipiscing metus id.</p>
                   </blockquote>
                   <p className="mt-6 font-sans text-2xl font-normal text-white">Robert S. McCully</p>
                   <p className="mt-1.5 text-white text-sm font-sans font-normal text-opacity-50">Employee at Lorem Ipsum</p>
               </div>
           </div> */}
        </div>
      </div>
    </section>
  );
}
