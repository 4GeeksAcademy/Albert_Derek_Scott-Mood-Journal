import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  );
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h1>HERO SECTION</h1>
            <p>
              <img
                src={rigoImageUrl}
                className="img-fluid"
                alt="Responsive image"
              />
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
                "This site is the most a fantastic part of my day."
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
                "Love the analytics to see where my well being has been at
                lately"
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
                a digital journal in an easy form at is great, much better than
                my old pen and paper method"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
