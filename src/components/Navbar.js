import React from 'react'
import { Link } from 'gatsby'
import logo from '../../static/img/dept_large.png'

import IndexStyles from './gallery-style.module.less'

const Navbar = () => (
	<nav className={IndexStyles.navbar}>
		<div className={IndexStyles.navbarContainer}>
			<div className={IndexStyles.navbarBrand}>
				<Link to="/" className={IndexStyles.navbarItem}>
					<figure className={IndexStyles.logoImage}>
						<img src={logo} alt="Design at York" />
					</figure>
				</Link>
			</div>
			<Link className={IndexStyles.navbarItem} to="/interactivity">
				Interactivity
			</Link>
			<Link className={IndexStyles.navbarItem} to="/typography">
				Typography
			</Link>
			<Link className={IndexStyles.navbarItem} to="/motion">
				Motion
			</Link>
			<Link className={IndexStyles.navbarItem} to="/information">
				Information
			</Link>
			<Link className={IndexStyles.navbarItem} to="/communication">
				Communication
			</Link>
			<Link className={IndexStyles.navbarItem} to="/3d">
				3D
			</Link>
			<Link className={IndexStyles.navbarItem} to="/about">
				About
			</Link>
		</div>
	</nav>
)

export default Navbar
