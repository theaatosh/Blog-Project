import "./AboutUs.css";

const AboutsUs = () => {
  return (
    <>
      <div>
        <div className="aboutsUsHeading">
          <div className="aboutUshead">About Us</div>
          <div className="aboutsUsContent">
            Welcome to our blog! Your go-to source for fashion, lifestyle, and
            tech insights
          </div>
        </div>
        <div className="aboutsUsContainer">
          <div className="ourStory">
            <div className="ourStoryContent">
              <div>Our Story</div>
              <div>
                <p className="explanation">
                  We started this blog with the vision to create a platform
                  where enthusiasts can explore trends, tips, and reviews in
                  fashion, lifestyle, and tech. Our goal is to provide
                  insightful and engaging content that keeps you informed about
                  the latest styles, innovative gadgets, and everyday lifestyle
                  hacks.
                </p>
              </div>
              <div>
                <p className="explanation">
                  Join us on this journey as we explore new trends, share expert
                  recommendations, and bring you honest reviews to help you make
                  informed choices. Stay tuned for fresh content, exciting
                  discussions, and a space where passion and innovation come
                  together!
                </p>
              </div>
            </div>
            <div className="maindiv">
              <div className="imgDiv"> img</div>
            </div>
          </div>
          <div className="whatWeCover">
            <div className="wwcImg">
              <div className="wwcImg1">
                <div className="wwcImg2"></div>
              </div>
            </div>

            <div className="whatWeCoverContent">
              <div className="whatWeCoverHead">What we cover</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div className="explanation">
                  <b>Fashion:</b> Stay ahead of the latest fashion trends, get
                  expert styling tips, and explore outfit inspirations for every
                  occasion.
                </div>
                <div className="explanation">
                  <b> Lifestyle:</b> Discover wellness hacks, productivity tips,
                  and self-care routines to elevate your daily life.{" "}
                </div>
                <div className="explanation">
                  <b>Tech:</b> Get the latest updates on groundbreaking
                  innovations, in-depth gadget reviews, and software
                  recommendations.
                </div>
                <div className="explanation">
                  <b>Travel:</b> Explore breathtaking destinations, travel
                  itineraries, and budget-friendly tips for your next adventure.
                </div>
                <div className="explanation">
                  <b> Entertainment:</b> Stay updated on the latest movies, TV
                  shows, music, and gaming trends.
                </div>
              </div>
            </div>
          </div>
          <div className="meetOurTeam">
            <div className="motHead">Meet Our Team</div>
            <div className="motDiv">
              <div className="items">
                <div className="motImg"></div>
                <div className="motContent">
                  <div className="motName">John Doe</div>
                  <div className="motRole">Founder</div>
                </div>
              </div>
              <div className="items">
                <div className="motImg"></div>
                <div className="motContent">
                  <div className="motName">John Doe</div>
                  <div className="motRole">Founder</div>
                </div>
              </div>
              <div className="items">
                <div className="motImg"></div>
                <div className="motContent">
                  <div className="motName">John Doe</div>
                  <div className="motRole">Founder</div>
                </div>
              </div>
            </div>
          </div>
          <div className="join">
            <div className="joinHead">Join Our Community</div>
            <div className="joinContent">
              Stay updated with the latest articles and trends.
            </div>
            <div className="joinBtn">
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutsUs;
