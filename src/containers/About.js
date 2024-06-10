import { Link } from "react-router-dom";

import Config from "../utility/config";

import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header-images">
        <img
          className="about-profile"
          src={Config.S3_URL_PREFIX + "army2.jpg"}
          alt="Boston University"
        />
        <img
          className="about-profile"
          src={Config.S3_URL_PREFIX + "microsoft-min.jpg"}
          alt="Boston University"
        />
      </div>
      <div>
        <div className="about-title">Dennis Kim</div>
        <div className="about-content">
          I'm currently a graduate student in Boston University's Online
          Master's of Science in Computer Information Systems with a
          concentration in Web Application Development. I am deeply passionate
          about learning and effectively leveraging technology and I am always
          looking for new ways to grow as a professional in this dynamic field.
        </div>
        <div className="about-content">
          Following high school, I served in the US Army and deployed overseas
          with the 82nd Airborne Division. After my military service, I
          completed my undergraduate studies at Georgia State University where I
          studied Computer Information Systems. Since then I've worked at
          Accenture, Microsoft, and most recently Booz Allen Hamilton. During
          this time, I developed a specialization in application development for
          the public sector, helping to bring modernized technical solutions to
          meet the federal government's growing need for timely and relevant
          data.
        </div>
        <div className="about-content">
          I currently live in Northern Virginia and enjoy puzzles, running, and
          playing with my two beautiful grehounds Saquon and JJ!
        </div>
      </div>
      <div className="about-dog-images">
        <img
          className="about-dogs"
          src={Config.S3_URL_PREFIX + "jj-min.jpg"}
          alt="Image of my dog JJ"
        />
        <div className="about-contact-container">
          <div className="about-contact">Professional Contact</div>
          <Link
            className="contact-linkedin"
            to="https://www.linkedin.com/in/denniskim-1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/denniskim-1
          </Link>
          <a
            className="contact-email"
            href="mailto:dkim56@bu.com&subject=BU Planning App"
          >
            dkim56@bu
          </a>
          <a
            className="contact-email"
            href="mailto:kim_dennis@bah.com&subject=BU Planning App"
          >
            kim_dennis@bah.com
          </a>
        </div>
        <img
          className="about-dogs"
          src={Config.S3_URL_PREFIX + "saquon.jpg"}
          alt="Image of my dog Saquon"
        />
      </div>
    </div>
  );
};

export default About;
