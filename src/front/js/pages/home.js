import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5">
			{/* Hero Section */}
			<div className="row">
				<div className="col-12">
					<div className="text-center">
						<h1>HERO SECTION</h1>
						<p>
							<img src={rigoImageUrl} className="img-fluid" alt="Responsive image" />
						</p>
					</div>
				</div>
			</div>
			
			{/* Testimonial Cards Section */}
			<div className="row">
				<div className="col-md-4 my-3">
					<div className="card">
						<img src="..." className="card-img-top" alt="..."/>
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						</div>
					</div>
				</div>
				<div className="col-md-4 my-3">
					<div className="card">
						<img src="..." className="card-img-top" alt="..."/>
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						</div>
					</div>
				</div>
				<div className="col-md-4 my-3">
					<div className="card">
						<img src="..." className="card-img-top" alt="..."/>
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};