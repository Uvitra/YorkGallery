import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
// import './all.sass'
import './constants.less'
import './styles.less'

const TemplateWrapper = ({ children }) => (
	<div>
		<Helmet title="Design at York Gallery" />
		<Navbar />
		<div>{children}</div>
	</div>
)

export default TemplateWrapper
