import React from 'react'
import { Link } from 'gatsby'
import logo from '../../static/img/dept_large.png'

const Navbar = () => (
	<nav className="navbar is-transparent">
		<div className="container">
			<div className="navbar-brand">
				<Link to="/" className="navbar-item">
					<figure className="logo-image">
						<img src={logo} alt="Design at York" />
					</figure>
				</Link>
			</div>
			<Link className="navbar-item" to="/interactivity">
        Interactivity
			</Link>
			<Link className="navbar-item" to="/typography">
        Typography
			</Link>
			<Link className="navbar-item" to="/motion">
        Motion
			</Link>
			<Link className="navbar-item" to="/information">
        Information
			</Link>
			<Link className="navbar-item" to="/communication">
        Communication
			</Link>
			<Link className="navbar-item" to="/3d">
        3D
			</Link>
			<Link className="navbar-item" to="/about">
				About
			</Link>
		</div>
	</nav>
)

export default Navbar
