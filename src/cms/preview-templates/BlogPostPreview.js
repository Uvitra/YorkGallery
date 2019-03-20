import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => (
	<BlogPostTemplate
		content={widgetFor('body')}
		description={entry.getIn(['data', 'description'])}
		studentName={entry.getIn(['data', 'studentName'])}
		projectName={entry.getIn(['data', 'projectName'])}
		// images={entry.getIn(['data', 'projectImage'])}
		tags={entry.getIn(['data', 'tags'])}
		title={entry.getIn(['data', 'title'])}
	/>
)

BlogPostPreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	}),
	widgetFor: PropTypes.func
}

export default BlogPostPreview
