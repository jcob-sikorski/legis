// import './assets/css/main.css'

import { useState } from "react";
import { contains, getUrl, switchIcon } from "../../../../utils";

export default function SolidState({ data, template_id, setContext }: any) {
  const [editableMap, setEditableMap] = useState<any>([]);
  const [bgEditable, setBgEditable] = useState<any>(false);

  return (
    <div id="page-wrapper">
      {/* Header */}
      {contains(template_id, "nav") && (
        <header id="header">
          <h1>
            <a>Attoneyster</a>
          </h1>
          <nav className="links">
            <ul>
              <li>
                <a href="#main">Hero</a>
              </li>
              <li>
                <a href="#practice areas">Practice Areas</a>
              </li>
              <li>
                <a href="#our values">Our Values</a>
              </li>
              <li>
                <a href="#our team">Our Team</a>
              </li>
              <li>
                <a href="#reviews and testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#about us">About Us</a>
              </li>
              <li>
                <a href="#footer">Contact Us</a>
              </li>
            </ul>
          </nav>
        </header>
      )}
      {/* Banner */}
      {contains(template_id, "hero") && (
        <section id="main">
          <div className="inner">
            <h2
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
              className="e"
            >
              {data?.heading ?? "[Heading]"}
            </h2>
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
              {data?.subHeading ?? "[Subheading]"}
            </p>
          </div>
        </section>
      )}

      {/* Wrapper */}
      <section id="wrapper">
        {/* One */}
        {contains(template_id, "practice") && (
          <section id="practice areas" className="wrapper spotlight style1">
            <div className="inner">
              <div className="content">
                <h1
                  className="major e"
                  onClick={() =>
                    setContext({
                      key: "title",
                      type: "text",
                      label: "Title",
                      variantProperty: "textAlign",
                    })
                  }
                  style={{
                    fontSize: "35px",
                    textAlign: data?.titleVariant || "center",
                  }}
                >
                  {data?.title || "Practice Areas"}
                </h1>
                <section className="features">
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

        {/* Two */}
        {contains(template_id, "values") && (
          <section id="our values" className="wrapper style3 fade-up">
            <div className="inner">
              <h1
                className="e major"
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
              >
                {data?.title || "Our values"}
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
                      className={`e icon solid major ${
                        value?.icon
                          ? value?.icon
                          : switchIcon(value?.name ?? "")
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
          </section>
        )}

        {/* Three */}
        {contains(template_id, "team") && (
          <section id="our team" className="wrapper spotlight style3">
            <div className="inner">
              <div className="content">
                <h1
                  className="e major"
                  style={{
                    fontSize: "35px",
                    textAlign: data?.titleVariant || "center",
                  }}
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
                <section className="features">
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
                        <article
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
                            style={{
                              borderRadius: "2%",
                              height: "300px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src={getUrl(person?.cdnUUID ?? "")}
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
                            {person?.description || "[Lawyer description here]"}
                          </p>
                        </article>
                      </>
                    );
                  })}
                </section>
              </div>
            </div>
          </section>
        )}

        {/* Four */}
        {contains(template_id, "reviews") && (
          <section id="reviews and testimonials" className="wrapper alt style1">
            <div className="inner">
              <h1
                className="major e"
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
              {/* <p>
                Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam
                turpis mauris, eu ultricies erat malesuada quis. Aliquam
                dapibus, lacus eget hendrerit bibendum, urna est aliquam sem,
                sit amet imperdiet est velit quis lorem.
              </p> */}
              <div className="features">
                {(data?.reviews ?? []).map((obj: any, i: number) => (
                  <section>
                    <h2
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
                      className="e"
                    >
                      {obj?.clientName || "[Client name here...]"}
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
                    >
                      {obj?.testimonial || "[Client Review here...]"}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Three */}
        {contains(template_id, "about") && (
          <section id="about us" className="wrapper spotlight style4">
            <div className="inner">
              <div className="content">
                <h1 className="major" style={{ fontSize: "35px" }}>
                  About Us
                </h1>
                <section>
                  <p>
                    Phasellus convallis elit id ullam corper amet et pulvinar.
                    Duis aliquam turpis mauris, sed ultricies erat dapibus.
                  </p>
                </section>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        {contains(template_id, "contact") && (
          <section id="footer">
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
                className="e major"
                style={{
                  fontSize: "35px",
                  textAlign: data?.titleVariant || "left",
                  pointerEvents: "auto",
                }}
              >
                {data?.title || "Contact us"}
              </h1>
              <ul className="actions">
                <li>
                  <input
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
                    // href={isDeploying ? data?.buttonLink || "#" : "#hero"}
                    type="submit"
                    value={data?.buttonLabel || "Send Message"}
                  />
                </li>
              </ul>
            </div>
          </section>
        )}
        {contains(template_id, "footer") && (
          <ul
            className="copyright"
            style={{ paddingTop: "36px", textAlign: "center" }}
          >
            <p className="copyright">
              Made by <a href="https://www.legis.live">Legis</a>.
            </p>
          </ul>
        )}
      </section>
    </div>
  );
}
