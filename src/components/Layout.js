import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'

const TemplateWrapper = ({ children, currentPageIndicator }) => (
	<div className="complete-wrapper">
		<Helmet>
			<title>Design at York Gallery</title>
			<meta
				name="Description"
				content="A Gallery of Work created by Students enrolled in Design at York."
			/>
			<meta charSet="utf-8" />
		</Helmet>
		<Navbar currentPageIndicator={currentPageIndicator} />
		<div>{children}</div>
	</div>
)

export default TemplateWrapper
