// WARNING: marked for deletion

import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import IndexStyles from './gallery-style.module.less'

const TemplateWrapper = ({ children }) => (
	<div className={IndexStyles.completeWrapper}>
		<Helmet>
			<title>Design at York Gallery</title>
			<meta
				name="Description"
				content="A Gallery of Work created by Students enrolled in Design at York."
			/>
			<meta charSet="utf-8" />
		</Helmet>
		<Navbar />
		<div>{children}</div>
	</div>
)

export default TemplateWrapper
