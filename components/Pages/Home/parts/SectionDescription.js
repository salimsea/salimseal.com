import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { UserProfileDummy } from "assets";
import Image from "next/image";
import {
  FaBehanceSquare,
  FaArrowRight,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaRegClock,
  FaTwitter,
} from "react-icons/fa";
import {
  URLBEHANCE,
  URLCV,
  URLDRIBBLE,
  URLFACEBOOK,
  URLGITHUB,
  URLINSTAGRAM,
  URLLINKEDIN,
  URLTWITTER,
} from "helpers/common";

const jsonDExperiences = [
  {
    id: 0,
    company: "Sellaris Studio",
    worktype: "Full-Time",
    dateFrom: "May 2026",
    dateEnd: "Present",
    techstack: "Express.js, Next.js, MySQL, POS & ERP Systems",
    role: "Software Engineer",
  },
  {
    id: 1,
    company: "PT Berlian Sistem Informasi",
    worktype: "Full-Time",
    dateFrom: "Oct 2025",
    dateEnd: "Present",
    techstack: ".NET 9/10, CQRS, DDD, SQL Server, Containerization (NEW DNET Platform for Mitsubishi)",
    role: "Software Engineer",
  },
  {
    id: 2,
    company: "PT Tower Bersama Infrastructure, Tbk",
    worktype: "Full-Time",
    dateFrom: "May 2025",
    dateEnd: "Oct 2025",
    techstack: ".NET Framework 4.8, VB.NET, Balanced Scorecard App",
    role: "IT Developer",
  },
  {
    id: 3,
    company: "PT Sinergi Informatika Semen Indonesia",
    worktype: "Full-Time",
    dateFrom: "Jul 2024",
    dateEnd: "May 2025",
    techstack: ".NET, SAP Integration, Web Applications",
    role: "Programmer .NET",
  },
  {
    id: 4,
    company: "PT Sawerigading Multi Kreasi",
    worktype: "Full-Time",
    dateFrom: "Apr 2019",
    dateEnd: "Jul 2024",
    techstack: "C#, React.js, React Native, API Integration, DevOps, Jenkins, Docker, Git, GCP, Nginx",
    role: "Software Engineer & Junior Programmer (Apr 2019 - Apr 2021 & May 2021 - Jul 2024)",
  },
  {
    id: 5,
    company: "Indonesia Investment Coordinating Board (BKPM)",
    worktype: "Part-Time",
    dateFrom: "Jan 2023",
    dateEnd: "Dec 2023",
    techstack: "C#, Gatsby.JS, PostgreSQL (Potensi Investasi Daerah / PIR App)",
    role: "Software Engineer",
  },
  {
    id: 6,
    company: "Dropshipedia",
    worktype: "Part-Time",
    dateFrom: "Jan 2019",
    dateEnd: "Dec 2023",
    techstack: "Laravel, Vue.js, PHP, MySQL",
    role: "Fullstack Developer",
  },
];

const SectionDescription = ({ styles }) => {
  const [isTab, setIsTab] = useState(2);
  return (
    <section className={styles["description"]}>
      <div className="container">
        <div className={styles["card_description"]}>
          <div className="row">
            <div
              className={`col-md-6 ${styles["card-profile"]}`}
              data-aos="fade-right"
            >
              <div className={styles["profile-creator"]} data-aos="fade-right">
                <div className="row">
                  <div className="col-md-3">
                    <div>
                      <Image
                        src={UserProfileDummy}
                        width={100}
                        height={100}
                        className={styles["img-fluid"]}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-9 align-self-center">
                    <h4>SALIM SEGAF ALQOSAM</h4>
                    <span
                      onClick={() => (window.location = URLLINKEDIN)}
                      className="me-2"
                    >
                      <FaLinkedinIn color="#FFFFFF" size={20} />
                    </span>
                    <span
                      onClick={() => (window.location = URLGITHUB)}
                      className="me-2"
                    >
                      <FaGithub color="#FFFFFF" size={20} />
                    </span>
                    <span
                      onClick={() => (window.location = URLFACEBOOK)}
                      className="me-2"
                    >
                      <FaFacebook color="#FFFFFF" size={20} />
                    </span>
                    <span
                      onClick={() => (window.location = URLINSTAGRAM)}
                      className="me-2"
                    >
                      <FaInstagram color="#FFFFFF" size={20} />
                    </span>
                    <span
                      onClick={() => (window.location = URLTWITTER)}
                      className="me-2"
                    >
                      <FaTwitter color="#FFFFFF" size={20} />
                    </span>
                    <span
                      onClick={() => (window.location = URLDRIBBLE)}
                      className="me-2"
                    >
                      <FaDribbble color="#FFFFFF" size={20} />
                    </span>
                    <span
                      onClick={() => (window.location = URLBEHANCE)}
                      className="me-2"
                    >
                      <FaBehanceSquare color="#FFFFFF" size={20} />
                    </span>
                  </div>
                </div>
              </div>
              <p>
                Hai, my name Salim Segaf Alqosam, I am from Indonesia and a
                software engineer, I have experience in making mobile
                applications and websites, I can solve problems in difficulty,
                have a willingness to learn new technology, and can work with a
                team.
                <br />
                <br />
                Techstack i like to use: .NET (5–10), C#, PHP (Laravel/CodeIgniter), JavaScript, React (JS/Native), Next.js, HTML/CSS, GCP, Docker, Jenkins, SQL Server, PostgreSQL, MySQL.
              </p>
              <div className="mt-5">
                <button
                  onClick={() => (window.location = URLCV)}
                  className="btn btn-costum-primary-outline px-5 mb-3 btn-block"
                >
                  DOWNLOAD RESUME
                </button>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <div>
                <Nav className={styles["card-academic-experience"]} tabs>
                  <NavItem>
                    <NavLink
                      className={isTab === 1 ? "active" : ""}
                      onClick={() => setIsTab(1)}
                    >
                      ACADEMIC
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={isTab === 2 ? "active" : ""}
                      onClick={() => setIsTab(2)}
                    >
                      EXPERIENCE
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={`${isTab}`}
                  className={styles["tabcontent-academic-experience"]}
                >
                  <TabPane tabId="1">
                    <ul>
                      <li>
                        <div className="bulet">
                          <FaArrowRight color="#FFFFFF" size={15} />
                        </div>
                        <p>
                          2019 : (
                          <a href="https://www.dicoding.com/">Dicoding</a>)
                          Course ID CAMP, Making applications using JAVA
                        </p>
                      </li>
                      <li>
                        <div className="bulet">
                          <FaArrowRight color="#FFFFFF" size={15} />
                        </div>
                        <p>
                          2019 : (<a href="youtube.com">YouTube</a>) Mentor
                          Prawito Hudoro, Gojek application clone using React
                          Native
                        </p>
                      </li>
                      <li>
                        <div className="bulet">
                          <FaArrowRight color="#FFFFFF" size={15} />
                        </div>
                        <p>
                          2019 - 2020 : (
                          <a href="https://buildwithangga.com/">
                            BuildWithAngga
                          </a>
                          ) Mentor Prawito Hudoro, Create a My Doctor mobile
                          application, using React Native & Firebase
                        </p>
                      </li>
                      <li>
                        <div className="bulet">
                          <FaArrowRight color="#FFFFFF" size={15} />
                        </div>
                        <p>
                          2020 : (<a href="youtube.com">YouTube</a>) Mentor
                          Prawito Hudoro, Made web application using REACT JS
                        </p>
                      </li>
                      <li>
                        <div className="bulet">
                          <FaArrowRight color="#FFFFFF" size={15} />
                        </div>
                        <p>
                          2021 - 2022 : ({" "}
                          <a href="https://buildwithangga.com/">
                            BuildWithAngga
                          </a>
                          ) Mr. Angga mentor, slicing / Creating a web front-end
                          with the follow SKETCH
                        </p>
                      </li>
                    </ul>
                  </TabPane>
                  <TabPane tabId="2">
                    <ul>
                      {jsonDExperiences.map((v, i) => {
                        return <ItemExperience key={i} data={v} />;
                      })}
                    </ul>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ItemExperience = ({ data }) => {
  return (
    <li>
      <div className="bulet">
        <FaArrowRight color="#FFFFFF" size={15} />
      </div>
      <p>
        <a href="#">{data.company}</a>
        <br />
        <small>
          <FaRegClock color="#2C2C2C" /> ({data.worktype}) {data.dateFrom} -{" "}
          {data.dateEnd}
        </small>
        <br />
        Role Position: {data.role}
        <br />
        Working with tech stacks: {data.techstack}.
      </p>
    </li>
  );
};

export default SectionDescription;
