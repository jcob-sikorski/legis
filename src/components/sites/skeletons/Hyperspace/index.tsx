

export default function Hyperspace() {
    
  // console.log('ABC: ', ABC)
  
  return (  
      <div className="is-preload">
        {/* Sidebar */}
      <section id="sidebar">
        <div className="inner">
          <nav>
            <ul>
              <li><a href="#intro">Hero</a></li>
              <li><a href="#practice areas">Practice Areas</a></li>
              <li><a href="#our values">Our Values</a></li>
              <li><a href="#our team">Our Team</a></li>
              <li><a href="#reviews and testimonials">Testimonials</a></li>
              <li><a href="#contact us">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </section>
  
      {/* Wrapper */}
      <div id="wrapper">
  
          {/* Intro */}
          <section id="intro" className="wrapper style1 fullscreen fade-up">
            <div className="inner">
              <h1>Hyperspace</h1>
              <p>Just another fine responsive site template designed by <a href="http://html5up.net">HTML5 UP</a><br />
              and released for free under the <a href="http://html5up.net/license">Creative Commons</a>.</p>
              <ul className="actions">
                <li><a href="#one" className="button primary">Learn more</a></li>
              </ul>
            </div>
          </section>
  
          {/* One */}
          <section id="one" className="wrapper style2 spotlights">
            <section id="practice areas" className="wrapper spotlight style3">
              <div className="inner">
                <div className="content">
                  <h1 style={{ fontSize: '35px' }}>Practice Areas</h1>
                  <section className="team-cards">
                    <article>
                      <h3 className="major">Sed feugiat lorem</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                    </article>
                    <article>
                      <h3 className="major">Sed feugiat lorem</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                    </article>
                    <article>
                      <h3 className="major">Sed feugiat lorem</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                    </article>
                    <article>
                      <h3 className="major">Sed feugiat lorem</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                    </article>
                  </section>
                </div>
              </div>
            </section>
            <section id="our values">
              <div className="content">
                <div className="inner">
                  <h1 style={{ fontSize: '35px' }}>Our Values</h1>
                  <p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus.</p>
                  <div className="features">
                    <section>
                      <span className="icon solid major fa-shield-alt"></span>
                      <h3>Reliability</h3>
                      <p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
                    </section>
                    <section>
                      <span className="icon solid major fa-handshake"></span>
                      <h3>Loyalty & Trust</h3>
                      <p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
                    </section>
                    <section>
                      <span className="icon solid major fa-gavel"></span>
                      <h3>Integrity</h3>
                      <p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
                    </section>
                    <section>
                      <span className="icon solid major fa-award"></span>
                      <h3>Excellence</h3>
                      <p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
                    </section>
                    <section>
                      <span className="icon solid major fa-user-friends"></span>
                      <h3>Collaboration</h3>
                      <p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
                    </section>
                </div>
                </div>
              </div>
            </section>
            <section id="our team">
              <div className="content">
                <div className="inner">
                  <h1 style={{ fontSize: '35px' }}>Our Team</h1>
                  <ul className="photoshoot">
                    <li>
                      <img style={{ borderRadius: '2%', height: '300px', width: '100%', objectFit: 'cover' }} src="https://headshots-inc.com/wp-content/uploads/2022/07/attorny-headshot-example-1.jpg"></img>
                      <h2>Clarence Damon</h2>
                      <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                    </li>
                    <li>
                      <img style={{ borderRadius: '2%', height: '300px', width: '100%', objectFit: 'cover' }} src="https://headshots-inc.com/wp-content/uploads/2022/08/attorney-headshot-photography-examples-1.jpg"></img>
                      <h2>Almanda Li</h2>
                      <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                    </li>
                    <li>
                      <img style={{ borderRadius: '2%', height: '300px', width: '100%', objectFit: 'cover' }} src="https://www.bethesdaheadshots.com/wp-content/uploads/2022/05/attorney-professional-headshot-photographer-3.jpg"></img>
                      <h2>James Pontiac</h2>
                      <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </section>

          {/* Two */}
          <section id="reviews and testimonials" className="wrapper style3 fade-up">
            <div className="inner">
              <div className="content">
                <h1 style={{ fontSize: '35px' }}>Reviews and Testimonials</h1>
                <section className="testimonials">
                  <article>
                    <i style={{ color: 'black' }} className="fas fa-quote-left"></i>
                    <h3 className="major">Sed feugiat lorem</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  </article>
                  <article>
                    <i style={{ color: 'black' }} className="fas fa-quote-left"></i>
                    <h3 className="major">Sed feugiat lorem</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  </article>
                  <article>
                    <i style={{ color: 'black' }} className="fas fa-quote-left"></i>
                    <h3 className="major">Sed feugiat lorem</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  </article>
                  <article>
                    <i style={{ color: 'black' }} className="fas fa-quote-left"></i>
                    <h3 className="major">Sed feugiat lorem</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  </article>
                </section>
              </div>
            </div>
          </section>


          {/* Three */}
          <section id="contact us" className="wrapper style4 fade-up">
             <div className="inner">
              <h1 style={{ fontSize: '35px' }}>Contact Us</h1>
              <p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
              <div className="split style1">
                <section>
                  <form method="post" action="#">
                    <ul className="actions">
                        <li><a href="" className="button submit">Send Message</a></li>
                    </ul>
                  </form>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
}
