import { faker } from "@faker-js/faker";
import { getUrl } from "../../../utils";
import { useRef, useState } from "react";

export default function LTeam1({ data, setContext }: any) {
  // const list = data?.lawyerDetails ?? [];
  // console.log("TTeam: ", JSON.stringify(data), " list: ", list);

  // so that the template knows if
  const [bgEditable, setBgEditable] = useState(true);

  const [editableMap, setEditableMap] = useState<{ [key: number]: boolean }>(
    {}
  );

  return (
    <section
      id="our-team"
      className="py-12 bg-black text-gray-100 sm:py-16 lg:py-20 xl:py-24"
      style={{ fontFamily: "var(--legis-font-main)" }}
      onClick={
        bgEditable
          ? () =>
              setContext({
                isSection: true,
                collection: "lawyerDetails",
                seriableLabel: "lawyer",
              })
          : () => {}
      }
      // onClick={() => bgEditable ? alert("asdasd") : () => {}}
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm font-bold tracking-widest uppercase">
            <span
              style={{ marginInline: data?.superTitleVariant || "auto auto" }}
              onClick={() =>
                setContext({
                  key: "superTitle",
                  type: "text",
                  label: "Super-Title",
                })
              }
              className="editable text-transparent bg-clip-text bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]"
            >
              {data?.superTitle ?? "Learn more about..."}
            </span>
          </p>
          <h2
            style={{ textAlign: data?.titleVariant || "center" }}
            onClick={() =>
              setContext({
                key: "title",
                type: "text",
                label: "title",
                variantProperty: "textAlign",
              })
            }
            className="editable mt-6 text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj"
          >
            {data?.title || "Our Team"}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mt-12 space-y-12 sm:mt-16 lg:mt-20 ">
          {/* {bgEditable ? 'yes' : 'no'} */}
          {(data?.lawyerDetails ?? []).map((person: any, i: number) => {
            // checks which element is currently hovered at and should be editable.
            let parentEditable = true;
            try {
              parentEditable = editableMap[i];
            } catch {}

            // adds indexed value to the map.
            function setEditable(val: boolean) {
              setEditableMap({ ...editableMap, [i]: val });
            }

            return (
              <>
                {/* {parentEditable ? 'yes' : 'no'} */}
                {i !== 0 && (
                  <div className="w-full h-px bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]"></div>
                )}
                <div
                  onMouseEnter={() => setBgEditable(false)}
                  onMouseLeave={() => setBgEditable(true)}
                  onClick={() =>
                    parentEditable
                      ? setContext({
                          seriableId: person?.id,
                          isGroup: true,
                          cdnUUID: person?.cdnUUID,
                          collection: "lawyerDetails",
                          seriableLabel: "lawyer",
                          index: i,
                        })
                      : () => {}
                  }
                  className="editable items-start sm:flex"
                >
                  {/* {person?.id || "No id"} */}
                  <img
                    className="editable object-cover rounded-full w-44 h-44 shrink-0"
                    onMouseEnter={() => setEditable(false)}
                    onMouseLeave={() => setEditable(true)}
                    onClick={() =>
                      setContext({
                        cdnUUID: person?.cdnUUID,
                        collection: "lawyerDetails",
                        seriableLabel: "lawyer",
                        key: "cdnUUID",
                        type: "image",
                        ratio: 1,
                        label: "Profile Picture",
                        index: i,
                      })
                    }
                    src={
                      person?.cdnUUID
                        ? getUrl(person.cdnUUID)
                        : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    }
                    alt=""
                  />
                  <div className="mt-6 sm:ml-10">
                    <div className="sm:items-center sm:flex">
                      <p
                        onMouseEnter={() => setEditable(false)}
                        onMouseLeave={() => setEditable(true)}
                        onClick={() =>
                          setContext({
                            collection: "lawyerDetails",
                            seriableLabel: "lawyer",
                            key: "name",
                            label: "Lawyer name",
                            type: "text",
                            index: i,
                          })
                        }
                        className="editable break-all text-2xl font-normal text-white"
                      >
                        {person?.name || "[Lawyer Name here]"}
                      </p>
                      <p
                        onMouseEnter={() => setEditable(false)}
                        onMouseLeave={() => setEditable(true)}
                        onClick={() =>
                          setContext({
                            collection: "lawyerDetails",
                            seriableLabel: "lawyer",
                            key: "role",
                            label: "Role",
                            type: "text",
                            index: i,
                          })
                        }
                        // className="editable break-all text-2xl font-normal text-white">
                        className="editable mt-2 text-base font-normal text-gray-400 sm:mt-0 sm:ml-4"
                      >
                        {person?.role || "Team member"}
                      </p>
                    </div>
                    <p
                      onMouseEnter={() => setEditable(false)}
                      onMouseLeave={() => setEditable(true)}
                      onClick={() =>
                        setContext({
                          collection: "lawyerDetails",
                          seriableLabel: "lawyer",
                          key: "description",
                          label: "Lawyer Description",
                          type: "textarea",
                          index: i,
                        })
                      }
                      className="editable break-all mt-5 text-base font-normal text-gray-400"
                    >
                      {person?.description || "[Lawyer description here]"}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
