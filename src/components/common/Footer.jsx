import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Company Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src="https://placehold.co/50x50" alt="BRAINACADEMY Logo" className="h-10 w-10" />
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Courses Section */}
              <div>
                <h4 className="font-semibold mb-2">COURSES</h4>
                <ul>
                  <li>
                    <Link to="/courses/programming" className="hover:underline">
                      Programming
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/data-science" className="hover:underline">
                      Data Science
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Section */}
              <div>
                <h4 className="font-semibold mb-2">RESOURCES</h4>
                <ul>
                  <li>
                    <Link to="/blog" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="hover:underline">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/tutorials" className="hover:underline">
                      Tutorials
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Academy Section */}
              <div>
                <h4 className="font-semibold mb-2">ACADEMY</h4>
                <ul>
                  <li>
                    <Link to="/about" className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="hover:underline">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="hover:underline">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Privacy Section */}
              <div>
                <h4 className="font-semibold mb-2">LEGAL</h4>
                <ul>
                  <li>
                    <Link to="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:underline">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Subscribe Form */}
            <div>
              <h4 className="font-semibold mb-2">SUBSCRIBE</h4>
              <form>
                <input type="text" placeholder="Name" className="mb-2 p-2 w-full text-black" />
                <input type="email" placeholder="Email" className="mb-2 p-2 w-full text-black" />
                <button type="submit" className="bg-green-500 text-white p-2 w-full">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <p className="mb-4 md:mb-0">© BRAINACADEMY 2024</p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" className="text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" className="text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fas fa-peace"></i>
            </a>
            <a href="https://github.com" className="text-white">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
