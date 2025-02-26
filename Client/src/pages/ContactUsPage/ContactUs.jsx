import "./ContactUs.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="contactUs">
        <div className="contactUsContent">
          <div className="contactUShead">
            <b>Contact Us</b>
          </div>
          <div className="contactUsDetails">
            <b>
              We would love to hear from you! Whether you have questions,
              suggestions, or collaboration ideas, feel free to reach out.
            </b>
          </div>
        </div>
        <div className="contactUsImg"></div>
      </div>
      <div className="contactUsForm">
        <div className="locationInfo">
          <div className="manageInfoDiv">
            <div className="manageInfo">
              <div className="icons">
                <FaLocationDot />
              </div>
              <div className="infos">
                <div className="infoHead">
                  <b>Address</b>
                </div>
                <div className="infoDetails">Sallaghari,Bhaktapur</div>
              </div>
            </div>
            <div className="manageInfo">
              <div className="icons">
                <FaPhoneAlt />
              </div>
              <div className="infos">
                <div className="infoHead">
                  <b>Phone</b>
                </div>
                <div className="infoDetails">9800000000</div>
              </div>
            </div>
            <div className="manageInfo">
              <div className="icons">
                <MdEmail />
              </div>
              <div className="infos">
                <div className="infoHead">
                  <b>Email</b>
                </div>
                <div className="infoDetails">blog@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="followUS">
            <div className="followUsHead"> Follow Us </div>
            <div className="manageIcons">
              <div className="icons">
                <RiInstagramFill />
              </div>
              <div className="icons">
                <FaFacebook />
              </div>
              <div className="icons">
                <FaSquareXTwitter />
              </div>
            </div>
          </div>
        </div>
        <div className="letTalkForm">
          <div className="letTalkFormHead">Lets Talk</div>
          <div>
            <form className="letTalkMainForm">
              <div>
                <label htmlFor="name">FullName</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter the subject"
                  required
                />
              </div>
              <div className="messageTeaxtArea">
                <label htmlFor="message"> Comment or Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <div className="submitBtn">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
