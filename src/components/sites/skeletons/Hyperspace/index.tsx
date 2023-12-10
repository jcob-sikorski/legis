import { useState } from "react";
import { contains, getUrl, switchIcon } from "../../../../utils";
import { DEFAULT_IMAGE_URL } from "../../dashboard/SiteCard";

export default function Hyperspace({
  data,
  template_id,
  setContext,
  isDeploying,
}: {
  data: any;
  template_id?: string;
  setContext: Function;
  isDeploying?: boolean;
}) {
  // console.log('ABC: ', ABC)

  const [editableMap, setEditableMap] = useState<any>([]);
  const [bgEditable, setBgEditable] = useState<any>([]);

  return (
    <div className="is-preload">
      {/* Sidebar */}
      {contains(template_id, "nav") && (
        <section id="custom-navbar">
          <div>
            <nav>
              {/* <ul> */}
              {/* <li> */}
              <a href="#intro">Hero</a>
              {/* </li> */}
              {/* <li> */}
              <a href="#practice areas">Practice Areas</a>
              {/* </li> */}
              {/* <li> */}
              <a href="#our values">Values</a>
              {/* </li> */}
              {/* <li> */}
              <a href="#our team">Team</a>
              {/* </li> */}
              {/* <li> */}
              <a href="#reviews and testimonials">Testimonials</a>
              {/* </li> */}
              {/* <li> */}
              <a href="#contact us">Contact Us</a>
              {/* </li> */}
              {/* </ul> */}
            </nav>
          </div>
        </section>
      )}

      {/* Wrapper */}
      <div id="wrapper">
        {/* Intro */}
        {contains(template_id, "hero") && (
          <section
            id="intro"
            style={{ minHeight: "450px" }}
            className="wrapper style1 fullscreenx fade-up"
          >
            <div
              className={`inner ${
                bgEditable && "editable"
              } relative  overflow-hidden bg-cover bg-no-repeat py-12 bg-blackx  sm:pb-16 lg:pb-20 xl:pb-24`}
              onClick={() =>
                bgEditable
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
              style={{
                backgroundPosition: "50%",
                backgroundImage: `url('${
                  data?.cdnUUID ? getUrl(data?.cdnUUID) : DEFAULT_IMAGE_URL
                }')`,
                minHeight: "450px",
                // ...(isDeploying ? {marginTop: 100} : {})
              }}
            >
              <div
                className="bg-[hsla(0,0%,0%,0.75)]"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                }}
              />
              <div>
                <h1
                  onMouseEnter={() => setBgEditable(false)}
                  onMouseLeave={() => setBgEditable(true)}
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
                  }}
                >
                  {data?.heading ?? "[Heading]"}
                </h1>
                <p
                  onMouseEnter={() => setBgEditable(false)}
                  onMouseLeave={() => setBgEditable(true)}
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
                  {data?.subHeading ?? "[Subheading]"}
                </p>
                <ul className="actions">
                  <li
                    onMouseEnter={() => setBgEditable(false)}
                    onMouseLeave={() => setBgEditable(true)}
                  >
                    <a
                      onClick={() =>
                        setContext({
                          key: "button",
                          type: "button",
                          label: "Button",
                          variantProperty: "marginInline",
                        })
                      }
                      className="editable button primary"
                    >
                      {data?.buttonLabel || "REGISTER"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* One */}
        <section id="one" className="wrapper style2 spotlights">
          {contains(template_id, "practice") && (
            <section id="practice areas" className="wrapper spotlight style3">
              <div className="inner">
                <div className="content">
                  <h1
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
                      fontSize: "35px",
                      textAlign: data?.titleVariant || "center",
                    }}
                  >
                    {data?.title || "Practice Areas"}
                  </h1>
                  <section className="value-bulletpoints">
                    {(data?.areasList ?? []).map((area: any, i: number) => (
                      <article>
                        <h3
                          className="major editable"
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
                          className="editable"
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
                        >
                          {area?.practiceDescription}
                        </p>
                      </article>
                    ))}
                  </section>
                </div>
              </div>
            </section>
          )}
          {contains(template_id, "values") && (
            <section id="our values">
              <div className="content">
                <div className="inner">
                  <h1
                    style={{
                      fontSize: "35px",
                      textAlign: data?.titleVariant || "center",
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
                    {data?.title || "[Title]"}
                  </h1>
                  <p
                    style={{ textAlign: data?.descriptionVariant || "center" }}
                    onClick={() =>
                      setContext({
                        key: "description",
                        type: "text",
                        label: "Description",
                        variantProperty: "textAlign",
                      })
                    }
                    className="e"
                  >
                    {data?.description || "[Description]"}
                  </p>
                  <div className="features">
                    {(typeof data?.valuesList === "object"
                      ? data?.valuesList
                      : []
                    )?.map((value: any, i: number) => (
                      <section>
                        <span
                          className={`icon solid major ${switchIcon(
                            value?.name ?? ""
                          )}`}
                        ></span>
                        <h3
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
                          className="e"
                        >
                          {value?.name || "[Value name]"}
                        </h3>
                        <p
                          onClick={() =>
                            setContext({
                              collection: "valuesList",
                              seriableLabel: "value",
                              key: "description",
                              label: "Description",
                              type: "textarea",
                              index: i,
                            })
                          }
                          className="e"
                        >
                          {value?.description || "[Value description]"}
                        </p>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
          {contains(template_id, "team") && (
            <section id="our team">
              <div className="content">
                <div className="inner">
                  <h1
                    style={{
                      fontSize: "35px",
                      textAlign: data?.titleVariant || "center",
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
                    {data?.title || "Our team"}
                  </h1>
                  <ul className="photoshoot">
                    {/* {JSON.stringify(data?.lawyerDetails)} */}
                    {(data?.lawyerDetails ?? []).map(
                      (person: any, i: number) => {
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
                                {person?.name || "[Lawyer Name here]"}
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
                              >
                                {person?.description ||
                                  "[Lawyer description here]"}
                              </p>
                            </li>
                          </>
                        );
                      }
                    )}

                    {/* <li>
                      <img
                        style={{
                          borderRadius: "2%",
                          height: "300px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src="https://headshots-inc.com/wp-content/uploads/2022/08/attorney-headshot-photography-examples-1.jpg"
                      ></img>
                      <h2>Almanda Li</h2>
                      <p>
                        Sed lorem amet ipsum dolor et amet nullam consequat a
                        feugiat consequat tempus veroeros sed consequat.
                      </p>
                    </li>
                    <li>
                      <img
                        style={{
                          borderRadius: "2%",
                          height: "300px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src="https://www.bethesdaheadshots.com/wp-content/uploads/2022/05/attorney-professional-headshot-photographer-3.jpg"
                      ></img>
                      <h2>James Pontiac</h2>
                      <p>
                        Sed lorem amet ipsum dolor et amet nullam consequat a
                        feugiat consequat tempus veroeros sed consequat.
                      </p>
                    </li> */}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </section>

        {/* Two */}
        {contains(template_id, "reviews") && (
          <section
            id="reviews and testimonials"
            className="wrapper style3 fade-up"
          >
            <div className="inner">
              <div className="content">
                <h1
                  className="e"
                  style={{
                    fontSize: "35px",
                    textAlign: data?.titleVariant || "center",
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
                </h1>
                <section className="testimonials">
                  {(data?.reviews ?? []).map((obj: any, i: number) => (
                    <article>
                      <i
                        style={{ color: "black" }}
                        className="fas fa-quote-left"
                      ></i>
                      <h3
                        className="major e"
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
                      </h3>
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
                      >
                        {obj?.testimonial || "[Client Review here...]"}
                      </p>
                    </article>
                  ))}
                </section>
              </div>
            </div>
          </section>
        )}

        {/* Three */}
        {contains(template_id, "contact") && (
          <section id="contact us" className="wrapper style4 fade-up">
            <div className="inner">
              <h1
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
                  fontSize: "35px",
                  textAlign: data?.titleVariant || "left",
                  pointerEvents: "auto",
                }}
              >
                {data?.title || "Contact us"}
              </h1>
              <p
                style={{ textAlign: data?.paragraphVariant || "left" }}
                onClick={() =>
                  setContext({
                    key: "paragraph",
                    type: "text",
                    label: "Paragraph",
                    variantProperty: "textAlign",
                  })
                }
                className="e"
              >
                {data?.paragraph || "[paragraph]"}
              </p>
              <div className="split style1">
                <section>
                  <form method="post" action="#">
                    <ul className="actions">
                      <li>
                        <a
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
                          href={isDeploying ? data?.buttonLink || "#" : "#hero"}
                          className="button submit e"
                        >
                          {data?.buttonLabel || "Send Message"}
                        </a>
                      </li>
                    </ul>
                  </form>
                </section>
              </div>
            </div>
          </section>
        )}
        {contains(template_id, "footer") && (
          <footer id="footer" className="wrapper style1-alt">
            <div className="inner">
              <ul className="menu">
                <li>
                  Made by{" "}
                  <a href="https://legis.live" target="_blank">
                    Legis
                  </a>
                  .
                </li>
              </ul>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
