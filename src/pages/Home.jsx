import React, { useEffect, useState } from "react";
import boyChar from "../Images/BoysChar.png";
import Icon from "../Images/LogoIcon.png";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";

function Home() {

  const [showOfferBox, setShowOfferBox] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <>
      {!isLoggedIn && showOfferBox && (
        <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-md mx-4 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              📚 Welcome to BrainAcademy! We're offering
              <span className="font-bold text-blue-500"> free tests</span>,
              <span className="font-bold text-blue-500">
                {" "}
                personalized courses
              </span>
              , and
              <span className="font-bold text-blue-500">
                {" "}
                24/7 doubt solving
              </span>
              . Sign up today to make your learning easier!
            </p>
            <button
              className="text-blue-500 hover:text-blue-700 font-bold text-lg ml-4"
              onClick={() => setShowOfferBox(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
      <Header />

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
        <div className="font-aladin lg:mb-20 text-center md:text-left md:mr-8 mb-8 md:mb-0">
          <h1 className="text-3xl tracking-widest md:text-5xl text-black mb-4">
            MAKE YOUR
          </h1>
          <h1 className="text-3xl tracking-widest md:text-5xl text-black mb-4">
            LEARNING <span className="text-blue-500">MORE</span>
          </h1>
          <h1 className="text-3xl tracking-widest md:text-5xl text-black mb-12">
            EASIER WITH
          </h1>
          <div className="flex items-center justify-center md:justify-start mb-8">
            <img className="h-10 w-10" src={Icon} alt="Icon" />
            <span className="text-xl ml-3 tracking-widest md:text-3xl text-black">
              BRAINACADEMY
            </span>
          </div>
          <div className="flex space-x-4 justify-center md:justify-start">
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-8 py-2 rounded lg:mr-20">
                Signup
              </button>
            </Link>
            <Link to="/signin">
              <button className="bg-white text-blue-600 border border-blue-600 px-8 py-2 rounded">
                Signin
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:ml-10">
          <img
            src={boyChar}
            alt="Animated character jumping with excitement"
            className="w-64 md:w-96"
            width="400"
            height="400"
          />
        </div>
      </div>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              24/7 Doubt Solving
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Got a question? Our mentors and community are here to help you out
              at any time.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-comments text-blue-500 text-3xl mr-4"></i>
                <h3 className="text-xl font-semibold text-gray-800">
                  Live Chat Support
                </h3>
              </div>
              <p className="text-gray-600">
                Reach out to a mentor or peer instantly through our live chat
                system for quick doubt solving.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-users text-blue-500 text-3xl mr-4"></i>
                <h3 className="text-xl font-semibold text-gray-800">
                  Community Discussion
                </h3>
              </div>
              <p className="text-gray-600">
                Post your doubts in our discussion forums and get answers from
                fellow learners and mentors.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-video text-blue-500 text-3xl mr-4"></i>
                <h3 className="text-xl font-semibold text-gray-800">
                  One-on-One Sessions
                </h3>
              </div>
              <p className="text-gray-600">
                Schedule personalized sessions with mentors to dive deep into
                your queries and resolve complex doubts.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link to="/ask-doubt">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300">
                Start Solving Doubts Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="p-4 md:p-8">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold">Test</h1>
          <div className="flex-grow border-t-4 border-blue-600 ml-4"></div>
        </div>

        <div className="flex flex-col md:flex-row p-4 md:p-8 rounded-lg shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A child wearing headphones and giving a thumbs up while using a laptop"
            className="rounded-lg w-full md:w-1/2 mb-4 md:mb-0 md:mr-8"
          />
          <div className="w-full md:w-1/2">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
              You Want To Know Where You Stand?
            </h2>
            <p className="text-gray-800 mb-4">
              Attempt{" "}
              <Link to="/test" className="text-blue-600">
                A Free Test
              </Link>{" "}
              Now To Check Your Capabilities, That Helps You To Identify The
              Areas Of Strength And Weakness, Which Can Help Guide Further
              Study.
            </p>
            <Link to="/practice">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Attempt Test
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <h1 className="text-2xl md:text-4xl font-bold">About Us</h1>
            <div className="flex-grow border-t-4 border-blue-600 ml-4"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center mt-10 px-5">
            <div className="max-w-md text-center md:text-left md:mr-8">
              <h2 className="text-xl font-bold mb-4">Who We Are</h2>
              <p className="text-gray-600 mb-4">
                BrainAcademy is committed to making learning easier and more
                accessible for students from various classes.
              </p>
              <p className="text-gray-600 mb-4">
                We offer comprehensive courses, resources, and one-on-one
                support to help students achieve their academic goals.
              </p>
              <Link to="/about">
                <button className="bg-purple-700 text-white py-2 px-4 rounded">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="mt-8 md:mt-0">
              <img
                className="h-64 w-84 object-cover rounded shadow-md"
                src="https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Academy image"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
