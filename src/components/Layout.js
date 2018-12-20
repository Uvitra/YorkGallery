import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
// import './all.sass'
import './constants.less'
import './gallery-style.less'

const TemplateWrapper = ({ children }) => (
	<div>
		<Helmet>
			<title>Design at York Gallery</title>
			<meta name="Description" content="A Gallery of Work created by Students enrolled in Design at York." />
			<meta charSet="utf-8" />
		</Helmet>
		<Navbar />
		<div>{children}</div>
	</div>
)

export default TemplateWrapper
