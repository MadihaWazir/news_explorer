import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <img src="" alt="" className="about__image" />
        <div className="about__text-container">
          <h1 className="about__title">About the Author</h1>
          <p className="about__description">
            Hi! I’m Madiha Wazir, a Software Engineering graduate from
            TripleTen. I’m passionate about creating dynamic, responsive, and
            user-friendly web applications that make everyday tasks simpler and
            more engaging. Throughout my journey at TripleTen, I gained hands-on
            experience with both front-end and back-end technologies. I’ve
            developed strong skills in HTML, CSS, JavaScript, React, Node.js,
            and working with APIs. I enjoy building clean, reusable components,
            integrating data from servers, and ensuring that every project
            follows modern development practices.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
