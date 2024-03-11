import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ssLogo from "../../img/SerenityScribe.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="content-wrapper h-100">
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row">
        <div className="col-12">
          <div className="text-center">
          <h1 className="blue-text"><b>Serenity Scribe</b></h1>
            <p>
              <img src={ssLogo} className="img-fluid" alt="Responsive image" />
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Cards Section */}
      <div className="row">
        <div className="col-md-4 my-3">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Janet Smith</h5>
              <p className="card-text">

                "Love the analytics to see where my well being has been at
                lately. Definately a great tool to have. I have been telling my friends and family about it."
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Marko Guiterez</h5>
              <p className="card-text">
              "This site is the most a fantastic part of my day."
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Sally Brown</h5>
              <p className="card-text">
                "Serenity Scribe has been very helpful to me. Being able to keep
                a digital journal in an easy format is great, much better than
                my old pen and paper method"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
