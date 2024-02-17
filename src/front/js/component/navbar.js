import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/SerenityScribe.png";

export const Navbar = () => {
	
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="/">
				<img src={Logo} width="30" height="30" alt="Logo"/>
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div className="ms-auto">
			{!sessionStorage.getItem("token") ? (
				<>
				<Link to="/login">
					<button className="btn btn-primary">Login</button>
				</Link>
				<Link to="/register">
					<button className="btn btn-secondary">Register</button>
				</Link>
				</>
				) : (
				<button className="btn btn-primary">Profile</button>
			)}
        	</div>
		</nav>
		)	
};
