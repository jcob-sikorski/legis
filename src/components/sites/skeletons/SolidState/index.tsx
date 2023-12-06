import './assets/css/main.css'

export default function SolidState() {
    return (  
  <div id="page-wrapper">
    {/* Header */}
    <header id="header">
	  	<h1><a href="index.html">Attoneyster</a></h1>
	  	<nav className="links">
	  		<ul>
	  			<li><a href="#main">Hero</a></li>
	  			<li><a href="#practice areas">Practice Areas</a></li>
          <li><a href="#our values">Our Values</a></li>
	  			<li><a href="#our team">Our Team</a></li>
	  			<li><a href="#reviews and testimonials">Reviews and Testimonials</a></li>
	  			<li><a href="#footer">Contact Us</a></li>
	  		</ul>
	  	</nav>
	  </header>

    {/* Banner */}
    <section id="main">
      <div className="inner">
        <h2>We're Group Of Certified Law Professionals</h2>
        <p>We have helped countless maritime workers and their families go up against the largest offshore companies and win.</p>
      </div>
    </section>

    {/* Wrapper */}
    <section id="wrapper">
      {/* One */}
      <section id="practice areas" className="wrapper spotlight style1">
        <div className="inner">
          <div className="content">
            <h1 className="major" style={{ fontSize: '35px' }}>Practice Areas</h1>
            <section className="features">
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

      {/* Two */}
      <section id="two" className="wrapper style3 fade-up">
						<div className="inner">
              <h1 className="major" style={{ fontSize: '35px' }}>Our Values</h1>
							<p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
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
									<span className="icon major fa-gem"></span>
									<h3>Collaboration</h3>
									<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
								</section>
							</div>
						</div>
					</section>

      {/* Three */}
      <section id="our team" className="wrapper spotlight style3">
        <div className="inner">
          <div className="content">
            <h1 className="major" style={{ fontSize: '35px' }}>Our Team</h1>
            <section className="features">
              <article>
                <img style={{ borderRadius: '2%', height: '300px', width: '100%', objectFit: 'cover' }} src="https://headshots-inc.com/wp-content/uploads/2022/07/attorny-headshot-example-1.jpg"></img>
                <h2>Clarence Damon</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
              </article>
              <article>
                <img style={{ borderRadius: '2%', height: '300px', width: '100%', objectFit: 'cover' }} src="https://headshots-inc.com/wp-content/uploads/2022/08/attorney-headshot-photography-examples-1.jpg"></img>
                <h2>Almanda Li</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
              </article>
              <article>
                <img style={{ borderRadius: '2%', height: '300px', width: '100%', objectFit: 'cover' }} src="https://www.bethesdaheadshots.com/wp-content/uploads/2022/05/attorney-professional-headshot-photographer-3.jpg"></img>
                <h2>James Pontiac</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
              </article>
            </section>
          </div>
        </div>
      </section>

      {/* Four */}
      <section id="reviews and testimonials" className="wrapper alt style1">
        <div className="inner">
          <h1 className="major" style={{ fontSize: '35px' }}>Reviews and Testimonials</h1>
					<p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
					<div className="features">
						<section>
							<h2>Colgate</h2>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<h2>Bradley & Co</h2>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<h2>Alex Hayet & Adams</h2>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
					</div>
				</div>
      </section>

    {/* Footer */}
      <section id="footer">
        <div className="inner">
            <h1 className="major" style={{ fontSize: '35px' }}>Contact Us</h1>
                <ul className="actions">
                    <li><input type="submit" value="Send Message" /></li>
                </ul>
            <ul className="copyright">
              <p className="copyright">Made by <a href="https://legis.live">Legis</a>.</p>
            </ul>
        </div>
      </section>

    </section>
  </div>
    );
}
