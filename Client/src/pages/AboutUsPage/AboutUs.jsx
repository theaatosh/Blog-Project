import "./AboutUs.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const AboutsUs = () => {
  const headingRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const coverRef = useRef(null);
  const teamRef = useRef(null);
  const joinRef = useRef(null);

  const headingInView = useInView(headingRef, { margin: "-100px" });
  const storyInView = useInView(storyRef, { margin: "-100px" });
  const missionInView = useInView(missionRef, { margin: "-100px" });
  const coverInView = useInView(coverRef, { margin: "-100px" });
  const teamInView = useInView(teamRef, { margin: "-100px" });
  const joinInView = useInView(joinRef, { margin: "-100px" });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="about-us-wrapper">
      <motion.section
        ref={headingRef}
        className="aboutsUsHeading"
        variants={sectionVariants}
        initial="hidden"
        animate={headingInView ? "visible" : "hidden"}
      >
        <motion.h1 className="aboutUshead" variants={childVariants}>
          About BlogSpot
        </motion.h1>
        <motion.p className="aboutsUsContent" variants={childVariants}>
          Your ultimate destination for inspiration in fashion, tech, lifestyle, and beyond.
        </motion.p>
      </motion.section>

      <div className="aboutsUsContainer">
        <motion.section
          ref={storyRef}
          className="ourStory"
          variants={sectionVariants}
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
        >
          <motion.div className="ourStoryContent" variants={childVariants}>
            <motion.h2 variants={childVariants}>Our Journey</motion.h2>
            <motion.p className="explanation" variants={childVariants}>
              Launched in 2023, BlogSpot emerged from a passion for sharing knowledge and trends. We’re a team of creatives dedicated to delivering high-quality, engaging content that empowers our readers to live stylishly and smartly in a fast-evolving world.
            </motion.p>
            <motion.p className="explanation" variants={childVariants}>
              From fashion breakthroughs to tech innovations, we’re here to spark curiosity, offer practical advice, and build a community of like-minded enthusiasts.
            </motion.p>
          </motion.div>
          <motion.div
            className="storyImg"
            variants={childVariants}
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}
          ></motion.div>
        </motion.section>

        <motion.section
          ref={missionRef}
          className="ourMission"
          variants={sectionVariants}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
        >
          <motion.div className="missionImg" variants={childVariants}></motion.div>
          <motion.div variants={childVariants}>
            <motion.h2 className="missionHead" variants={childVariants}>
              Our Mission
            </motion.h2>
            <motion.p className="missionContent" variants={childVariants}>
              To inspire and inform through authentic storytelling, cutting-edge insights, and a commitment to celebrating diversity in style, technology, and life.
            </motion.p>
          </motion.div>
        </motion.section>

        <motion.section
          ref={coverRef}
          className="whatWeCover"
          variants={sectionVariants}
          initial="hidden"
          animate={coverInView ? "visible" : "hidden"}
        >
          <motion.div className="coverContent" variants={childVariants}>
            <motion.h2 className="coverHead" variants={childVariants}>
              What We Explore
            </motion.h2>
            <motion.div className="coverList" variants={childVariants}>
              {[
                { title: "Fashion", desc: "Latest trends, styling guides, and seasonal must-haves.", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" },
                { title: "Lifestyle", desc: "Wellness tips, home decor ideas, and daily hacks.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" },
                { title: "Tech", desc: "Gadget reviews, software tips, and future tech previews.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" },
                { title: "Travel", desc: "Destination guides, travel hacks, and cultural insights.", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" },
                { title: "Entertainment", desc: "Movie reviews, music trends, and gaming updates.", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" },
              ].map((item, index) => (
                <motion.div key={index} className="coverItem" variants={childVariants}>
                  <div className="coverItemImg" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={teamRef}
          className="meetOurTeam"
          variants={sectionVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          <motion.h2 className="teamHead" variants={childVariants}>
            Our Creative Team
          </motion.h2>
          <motion.div className="teamGrid" variants={childVariants}>
            {[
              { name: "Emma Carter", role: "Founder & Editor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { name: "Liam Hayes", role: "Tech Specialist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { name: "Sophia Patel", role: "Fashion Curator", img: "https://images.unsplash.com/photo-1517841902196-3eabf25f45e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="teamCard"
                variants={childVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="teamImg" style={{ backgroundImage: `url(${member.img})` }}></div>
                <div className="teamInfo">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          ref={joinRef}
          className="joinCommunity"
          variants={sectionVariants}
          initial="hidden"
          animate={joinInView ? "visible" : "hidden"}
        >
          <motion.h2 className="joinHead" variants={childVariants}>
            Become Part of Our Community
          </motion.h2>
          <motion.p className="joinText" variants={childVariants}>
            Subscribe for exclusive content, updates, and join a vibrant community of trendsetters.
          </motion.p>
          <motion.div className="joinActions" variants={childVariants}>
            <motion.button
              className="subscribeBtn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now
            </motion.button>
            <motion.div className="socialLinks" variants={childVariants}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutsUs;