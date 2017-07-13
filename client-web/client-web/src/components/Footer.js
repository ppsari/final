import React from 'react';
import './Footer.css';

const Footer = (props) => {
  return (
    <div className="Footer">
      <div className="footer">
        <div className="container">
          <footer className="footer-distributed">
          <div className="footer-left">
            <h3>Jual Rumah</h3>
            <p className="footer-links">
              <a href="#">Home</a>
              ·
              <a href="#">Blog</a>
              ·
              <a href="#">Pricing</a>
              ·
              <a href="#">About</a>
              ·
              <a href="#">Faq</a>
              ·
              <a href="#">Contact</a>
            </p>
            <p className="footer-company-name">Company Name &copy; 2017</p>
            <div className="footer-icons">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-linkedin"></i></a>
              <a href="#"><i className="fa fa-github"></i></a>
            </div>
          </div>
          <div className="footer-right">
            <p>Contact Us</p>
            <form action="#" method="post">
              <input type="text" name="email" placeholder="Email" />
              <textarea name="message" placeholder="Message"></textarea>
              <button>Send</button>
            </form>
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
