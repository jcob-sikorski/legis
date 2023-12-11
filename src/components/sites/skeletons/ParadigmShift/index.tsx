import { useState } from "react";
import { contains, getUrl, switchIcon } from "../../../../utils";
import { DEFAULT_IMAGE_URL } from "../../dashboard/SiteCard";

export default function ParadigmShift({ data, template_id, setContext }: any) {
  const [editableMap, setEditableMap] = useState<any>([]);
  const [bgEditable, setBgEditable] = useState<any>(true);

  return (
    <div className="is-preload">
      {/* Wrapper */}
      <div id="wrapper">
        {/* Intro */}
        {contains(template_id, "hero") && (
          <section className="intro">
            <header>
              <h1
                className="editable"
                onClick={() =>
                  setContext({
                    key: "heading",
                    type: "text",
                    label: "Heading",
                    variantProperty: "textAlign",
                  })
                }
                style={{
                  textAlign: data?.headingVariant || "left",
                  pointerEvents: "auto",
                  fontSize: 60
                }}
              >
                {data?.heading ?? ""}
              </h1>
              <p
                className="editable"
                style={{ textAlign: data?.subHeadingVariant || "left" }}
                onClick={() =>
                  setContext({
                    key: "subHeading",
                    type: "textarea",
                    label: "Sub-Heading",
                    variantProperty: "textAlign",
                  })
                }
              >
                {data?.subHeading ?? ""}
              </p>
            </header>
            <div className="content e">
              <span className="image fill e" data-position="center">
                <img
                  className="e"
                  onClick={() =>
                    true
                      ? setContext({
                          key: "_",
                          type: "image",
                          cdnUUID: data?.cdnUUID,
                          inputSize: [140 * 1.8, 80 * 1.8],
                          ratio: 14 / 8,
                          label: "Hero Image",
                        })
                      : () => {}
                  }
                  src={
                    data?.cdnUUID ? getUrl(data?.cdnUUID) : DEFAULT_IMAGE_URL
                  }
                  alt=""
                />
              </span>
            </div>
          </section>
        )}
        {/* Section */}
        {contains(template_id, "practice") && (
          <section id="first">
            <header>
              <h2
                onClick={() =>
                  setContext({
                    key: "title",
                    type: "text",
                    label: "Title",
                    variantProperty: "textAlign",
                  })
                }
                className="e"
                style={{
                  // fontSize: "35px",
                  textAlign: data?.titleVariant || "left",
                }}
              >
                {data?.title || "Practice Areas"}
              </h2>
            </header>
            <ul className="features">
              {(data?.areasList ?? []).map((area: any, i: number) => (
                <li>
                  <h3
                    className="e"
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
                  >
                    {area?.practiceAreaName}
                  </h3>
                  <p
                    className="e"
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
                    style={{ color: '#636363' }}
                  >
                    {area?.practiceDescription}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* Section */}
        {contains(template_id, "values") && (
          <section>
            <header>
              <h2
                style={{
                  // fontSize: "35px",
                  textAlign: data?.titleVariant || "left",
                }}
                onClick={() =>
                  setContext({
                    key: "title",
                    type: "text",
                    label: "Title",
                    variantProperty: "textAlign",
                  })
                }
                className="e"
              >
                {data?.title || "Our Values"}
              </h2>
            </header>
            <div className="content">
              <ul className="feature-icons">
                {(typeof data?.valuesList === "object"
                  ? data?.valuesList
                  : []
                )?.map((value: any, i: number) => (
                  <li
                    className={`e icon solid  ${
                      value?.icon ? value?.icon : switchIcon(value?.name ?? "")
                    }`}
                    onClick={() =>
                      setContext({
                        collection: "valuesList",
                        seriableLabel: "value",
                        key: "icon",
                        label: "Value icon",
                        type: "icon",
                        index: i,
                      })
                    }
                  >
                    <div
                      className="e"
                      onClick={() =>
                        setContext({
                          collection: "valuesList",
                          seriableLabel: "value",
                          key: "name",
                          label: "Value name",
                          type: "text",
                          index: i,
                        })
                      }
                    >
                      {value?.name || ""}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        {/* Section */}
        {contains(template_id, "team") && (
          <section>
            <header>
              <h2
                style={{
                  textAlign: data?.titleVariant || "left",
                }}
                className="e"
                onClick={() =>
                  setContext({
                    key: "title",
                    type: "text",
                    label: "title",
                    variantProperty: "textAlign",
                  })
                }
              >
                {data?.title || "Our Team"}
              </h2>
            </header>
            <div className="content">
              <ul className="team-cards">
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
                      {/* {parentEditable ? "yes" : "no"} */}
                      <li
                        className="e"
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
                      >
                        <img
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
                          className="e"
                          style={{
                            borderRadius: "2%",
                            height: "300px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={getUrl(person?.cdnUUID ?? "")}
                        ></img>
                        <h2
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
                          className="e"
                        >
                          {person?.name || ""}
                        </h2>
                        <p
                          className="e"
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
                          style={{ color: '#636363' }}
                        >
                          {person?.description || ""}
                        </p>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
        {contains(template_id, "reviews") && (
          <section>
            <header>
              <h2
                className="e"
                style={{
                  textAlign: data?.titleVariant || "left",
                }}
                onClick={() =>
                  setContext({
                    section_id: data?.section_id,
                    key: "title",
                    type: "text",
                    label: "Title",
                    variantProperty: "textAlign",
                    placeholder: "Reviews and Testimonials",
                  })
                }
              >
                {data?.title || "Reviews and Testimonials"}
              </h2>
            </header>
            <div className="content">
              <div className="testimonials">
                {(data?.reviews ?? []).map((obj: any, i: number) => (
                  <section style={{ all: "unset" }}>
                    <h2
                      className="major e"
                      onClick={() =>
                        setContext({
                          collection: "reviews",
                          seriableLabel: "review",
                          key: "clientName",
                          label: "Client Name",
                          type: "text",
                          index: i,
                        })
                      }
                    >
                      {obj?.clientName || ""}
                    </h2>
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
                      className="e"
                      style={{ color: '#636363' }}
                    >
                      {obj?.testimonial || ""}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </section>
        )}
        {contains(template_id, "about") && (
          <section>
            <header>
              <h2
                onClick={() =>
                  setContext({
                    key: "title",
                    type: "text",
                    label: "Title",
                    variantProperty: "textAlign",
                  })
                }
                className="e majorx"
                style={{
                  textAlign: data?.titleVariant || "left",
                  pointerEvents: "auto",
                }}
              >
                {data?.title || "About Us"}
              </h2>
            </header>
            <div className="content">
              <p
                className="editable"
                style={{ 
                  textAlign: data?.paragraphVariant || "left", 
                  color: '#636363'
                }}
                onClick={() =>
                  setContext({
                    key: "paragraph",
                    type: "textarea",
                    label: "paragraph",
                    variantProperty: "textAlign",
                  })
                }
              >
                {data?.paragraph || ""}
              </p>
            </div>
          </section>
        )}
        {/* Section */}{" "}
        {contains(template_id, "contact") && (
          <section>
            <header>
              <h2
                onClick={() =>
                  setContext({
                    key: "title",
                    type: "text",
                    label: "Title",
                    variantProperty: "textAlign",
                  })
                }
                className="e"
                style={{
                  textAlign: data?.titleVariant || "left",
                  pointerEvents: "auto",
                }}
              >
                {data?.title || "Contact Us"}
              </h2>
            </header>
            <div className="content">
              {/* <strong>
                Proin tempus feugiat sed varius enim lorem ullamcorper dolore
                aliquam aenean ornare velit lacus, ac varius enim lorem
                ullamcorper dolore.
              </strong> */}
              <ul className="actions">
                <li>
                  <a
                    role="link"
                    style={{
                      marginInline: data?.buttonVariant || "auto auto",
                      color: "#000",
                    }}
                    onClick={() =>
                      setContext({
                        key: "button",
                        type: "button",
                        label: "Button",
                        variantProperty: "marginInline",
                      })
                    }
                    href="#"
                    className="button primary large"
                  >
                    {data?.buttonLabel || "Send Message"}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        )}
        {contains(template_id, "footer") && (
          <div className="copyright">
            Made by <a href="https://www.legis.live">Legis</a>.
          </div>
        )}
      </div>
    </div>
  );
}
