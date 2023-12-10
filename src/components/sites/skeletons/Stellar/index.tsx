// import './assets/css/main.css'

export default function Stellar() {
    return (  <div id="wrapper">
    <header id="header" className="alt">
      <h1>The #1 Law Firm in Los</h1>
      <h1>Angeles, CA</h1>
    </header>

    <nav id="nav">
      <ul>
        <li><a href="#hero" className="active">Hero</a></li>
        <li><a href="#practice areas">Practice Areas</a></li>
        <li><a href="#our values">Our Values</a></li>
        <li><a href="#our team">Our Team</a></li>
        <li><a href="#reviews and testimonials">Testimonials</a></li>
        <li><a href="#about us">About Us</a></li>
        <li><a href="#contact us">Contact Us</a></li>
      </ul>
    </nav>

    <div id="main">
      <section id="hero" className="main">
        <div className="spotlight">
          <div className="content">
            <header className="major">
              <h2>Ipsum sed adipiscing</h2>
            </header>
            <p>Sed lorem ipsum dolor sit amet nullam consequat feugiat consequat magna
            adipiscing magna etiam amet veroeros. Lorem ipsum dolor tempus sit cursus.
            Tempus nisl et nullam lorem ipsum dolor sit amet aliquam.</p>
            <ul className="actions">
              <li><a className="button">Learn More</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div style={{ height: 150 }} />

    <section id="practice areas" className="main special"> 
      <header className="major">
        <h2>Pratice Areas</h2>
      </header>
      <ul className="features">
        <li>
          <h3>Ipsum consequat</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
        <li>
          <h3>Amed sed feugiat</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
        <li>
          <h3>Dolor nullam</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
      </ul>
    </section>

    <div style={{ height: 150 }} />

    <section id="our values" className="main special">
      <header className="major">
        <h2>Our Values</h2>
      </header>
      <ul className="features">
        <li>
          <span className="icon solid major style1 fa-shield-alt"></span>
          <h3>Reliability</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
        <li>
          <span className="icon major style3 fa-handshake"></span>
          <h3>Loyalty & Trust</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
        <li>
          <span className="icon major style5 fa-gavel"></span>
          <h3>Integrity</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
        <li>
          <span className="icon solid major style1 fa-award"></span>
          <h3>Excellence</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
        <li>
          <span className="icon major style3 fa-user-friends"></span>
          <h3>Collaboration</h3>
          <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
        </li>
      </ul>
    </section>

    <div style={{ height: 150 }} />

    <section id="our team" className="main special">
      <header className="major">
        <h2>Our Team</h2>
      </header>
      <ul className="features">
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
    </section>

    <div style={{ height: 150 }} />

    <section id="reviews and testimonials" className="main special">
      <header className="major">
        <h2>Reviews and Testimonials</h2>
      </header>
      <section className="features">
        <article>
					<h3  className="major">Sed feugiat lorem</h3>
					<p >Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
				</article>
				<article>
					<h3  className="major">Sed feugiat lorem</h3>
					<p >Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
				</article>
        <article>
					<h3  className="major">Sed feugiat lorem</h3>
					<p >Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
				</article>
      </section>
    </section>

    <div style={{ height: 150 }} />

    <section id="about us" className="main special">
      <header className="major">
        <h2>About Us</h2>
        <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
        posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
      </header>
    </section>

    <div style={{ height: 150 }} />

    <section id="contact us" className="main special">
      <header className="major">
        <h2>Contact Us</h2>
      </header>
      <footer className="major">
        <ul className="actions special">
          <li><a className="button primary">Get Started</a></li>
        </ul>
      </footer>
      <p className="copyright">Made by <a href="https://www.legis.live">Legis</a>.</p>
    </section>
  </div>
    );
}
