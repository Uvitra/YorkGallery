import React from 'react'
import Layout from '../components/Layout'

import IndexStyles from '../components/gallery-style.module.less'

export default () => (
	<Layout>
		<section className={IndexStyles.section}>
			<div className={IndexStyles.container}>
				<div className={IndexStyles.content}>
					<h1>Thank you!</h1>
					<p>This is a custom thank you page for form submissions</p>
				</div>
			</div>
		</section>
	</Layout>
)
