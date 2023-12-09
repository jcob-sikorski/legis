export default function ParadigmShift() {
  return (  
    <div className="is-preload">

      {/* Wrapper */}
      <div id="wrapper">

        {/* Intro */}
        <section className="intro">
          <header>
            <h1>Larry & Cooper</h1>
            <p>We are committed to excellence and have a deep understanding of the law. Our aim is to provide you with practical solutions.</p>
          </header>
          <div className="content">
            <span className="image fill" data-position="center"><img src="https://www.sebastiangibsonlaw.com/wp-content/uploads/2016/06/shutterstock_91899863.jpg" alt="" /></span>
          </div>
        </section>

        {/* Section */}
        <section id="first">
          <header>
            <h2>Practice Areas</h2>
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

        {/* Section */}
        <section>
          <header>
            <h2>Our Values</h2>
          </header>
          <div className="content">
            <ul className="feature-icons">
              <li className="icon solid fa-shield-alt">Reliability</li>
              <li className="icon solid fa-handshake">Loyalty & Trust</li>
              <li className="icon solid fa-gavel">Integrity</li>
              <li className="icon solid fa-award">Excellence</li>
              <li className="icon solid fa-user-friends">Collaboration</li>
            </ul>
          </div>
        </section>

        {/* Section */}
        <section>
          <header>
            <h2>Our Team</h2>
          </header>
          <div className="content">
            <ul className="team-cards">
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
        </section>

        <section>
          <header>
            <h2>Reviews and Testimonials</h2>
          </header>
          <div className="content">
            <div className="testimonials">
				    	<section style={{ all: 'unset' }}>
				    		<h2>Colgate</h2>
				    		<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
				    	</section>
				    	<section style={{ all: 'unset' }}>
				    		<h2>Bradley & Co</h2>
				    		<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
				    	</section>
				    	<section style={{ all: 'unset' }}>
				    		<h2>Alex Hayet & Adams</h2>
				    		<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
				    	</section>
				    </div>
          </div>
        </section>

        <section>
          <header>
            <h2>About Us</h2>
          </header>
          <div className="content">
				    <p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
          </div>
        </section>

        {/* Section */}
        <section>
          <header>
            <h2>Contact Us</h2>
          </header>
          <div className="content">
            <strong>Proin tempus feugiat sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore.</strong>
            <ul className="actions">
              <li><a href="#" className="button primary large">Get Started</a></li>
            </ul>
          </div>
        </section>
      	<div className="copyright">Made by <a href="https://www.legis.live">Legis</a>.</div>
      </div>
    </div>
  );
}
