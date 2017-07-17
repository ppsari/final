import React from 'react';
import './Footer.css';

const Footer = (props) => {
  return (
    <div className="Footer">
      <div className="footer">
        <div className="container">
          <footer className="footer-distributed">
          <div className="footer-left">
            <h3>Home360</h3>
            <div className="row">
              <div className="col-6">
                <p className="footer-links">
                  <a>Home</a>
                  <a>Blog</a>
                  <a>Pricing</a>
                </p>
              </div>
              <div className="col-6">
                <p className="footer-links">
                  <a>About</a>
                  <a>Faq</a>
                  <a>Contact</a>
                </p>
              </div>
            </div>
            <p className="footer-company-name">Gray Fox Hactiv8 &copy; 2017</p>
            <div className="footer-icons">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-twitter"></i></a>
              <a><i className="fa fa-linkedin"></i></a>
              <a><i className="fa fa-github"></i></a>
            </div>
          </div>
          <div className="footer-right">
            <h4 className="m-b-20 text-right text-white">Contact Us</h4>
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
