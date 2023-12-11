// import './assets/css/main.css'

import { useState } from "react";
import { contains, getUrl, switchIcon } from "../../../../utils";

export default function Stellar({ data, template_id, setContext }: any) {
  const [editableMap, setEditableMap] = useState<any>([]);
  const [bgEditable, setBgEditable] = useState<any>(false);

  return (
    <div id="wrapper">
      {contains(template_id, "hero") && (
        <>
          <header id="header" className="alt">
            <h1
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
              {data?.superHeading ?? "The #1 Law Firm"}
            </h1>
          </header>

          <nav id="nav">
            <ul>
              <li>
                <a href="#hero" className="active">
                  Hero
                </a>
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
                <a href="#contact us">Contact Us</a>
              </li>
            </ul>
          </nav>

          {/* {contains(template_id, "hero") && ( */}
          <div id="main">
            <section id="hero" className="main">
              <div className="spotlight">
                <div className="content">
                  <header className="major">
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
                  </header>
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
                  <ul className="actions">
                    <li>
                      <a
                        // href={isDeploying}
                        className="button e"
                        onClick={() =>
                          setContext({
                            key: "button",
                            type: "button",
                            label: "Button",
                            // variantProperty: "marginInline",
                          })
                        }
                      >
                        {data?.buttonLabel || "REGISTER"}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <div style={{ height: 150 }} />
        </>
      )}

      {contains(template_id, "practice") && (
        <>
          <section id="practice areas" className="main special">
            <header className="major">
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
                  textAlign: data?.titleVariant || "center",
                }}
              >
                {data?.title || "Practice Areas"}
              </h2>
            </header>
            <ul className="features">
              {(data?.areasList ?? []).map((area: any, i: number) => (
                <li>
                  <h3
                    className=" editable"
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
                </li>
              ))}
            </ul>
          </section>
          <div style={{ height: 150 }} />
        </>
      )}

      {contains(template_id, "values") && (
        <>
          <section id="our values" className="main special">
            <header className="major">
              <h2
                style={{
                  // fontSize: "35px",
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
                {data?.title || "Our values"}
              </h2>
            </header>
            <ul className="features">
              {(typeof data?.valuesList === "object"
                ? data?.valuesList
                : []
              )?.map((value: any, i: number) => (
                <li>
                  <span
                    className={`e icon solid major style1 ${
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
                </li>
              ))}

              {/* <li>
                <span className="icon major style3 fa-handshake"></span>
                <h3>Loyalty & Trust</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
                </p>
              </li>
              <li>
                <span className="icon major style5 fa-gavel"></span>
                <h3>Integrity</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
                </p>
              </li>
              <li>
                <span className="icon solid major style1 fa-award"></span>
                <h3>Excellence</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
                </p>
              </li>
              <li>
                <span className="icon major style3 fa-user-friends"></span>
                <h3>Collaboration</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
                </p>
              </li> */}
            </ul>
          </section>
          <div style={{ height: 150 }} />
        </>
      )}

      {contains(template_id, "team") && (
        <>
          <section id="our team" className="main special">
            <header className="major">
              <h2
                style={{
                  // fontSize: "35px",
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
              </h2>
            </header>
            <ul className="features">
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
                    </li>
                  </>
                );
              })}
            </ul>
          </section>
          <div style={{ height: 150 }} />
        </>
      )}

      {contains(template_id, "reviews") && (
        <>
          <section id="reviews and testimonials" className="main special">
            <header className="major">
              <h2
                className="e"
                style={{
                  // fontSize: "35px",
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
              </h2>
            </header>
            <section className="features">
              {(data?.reviews ?? []).map((obj: any, i: number) => (
                <article>
                  <h3
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
          </section>
          <div style={{ height: 150 }} />
        </>
      )}

      {contains(template_id, "about") && (
        <>
          {" "}
          <section id="about us" className="main special">
            <header className="major">
              <h2
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
                  textAlign: data?.titleVariant || "center",
                  pointerEvents: "auto",
                  // fontSize: "35px",
                }}
              >
                {data?.title || "About us"}
              </h2>
              <p
                className="editable"
                style={{ textAlign: data?.paragraphVariant || "center" }}
                onClick={() =>
                  setContext({
                    key: "paragraph",
                    type: "textarea",
                    label: "paragraph",
                    variantProperty: "textAlign",
                  })
                }
              >
                {data?.paragraph || "[Paragraph here]"}
              </p>
            </header>
          </section>
          <div style={{ height: 150 }} />
        </>
      )}

      {contains(template_id, "contact") && (
        <>
          <section id="contact us" className="main special">
            <header className="major">
              <h2
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
                  // fontSize: "35px",
                  textAlign: data?.titleVariant || "center",
                  pointerEvents: "auto",
                }}
              >
                {data?.title || "Contact us"}
              </h2>
            </header>
            <footer className="major">
              <ul className="actions special">
                <li>
                  <a
                    className="button primary e"
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
                  >
                    {data?.buttonLabel || "Send Message"}
                  </a>
                </li>
              </ul>
            </footer>
          </section>
          <p
            className="copyrightx"
            style={{ paddingTop: 32, paddingBottom: 32, textAlign: "center" }}
          >
            Made by <a href="https://www.legis.live">Legis</a>.
          </p>
        </>
      )}
    </div>
  );
}
