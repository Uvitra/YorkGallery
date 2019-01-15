import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BackgroundImageGallery from '../components/BackgroundImageGallery.js'
import '../components/gallery-style.less'

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark
		const backgroundGalleryImages = posts.map(
			({ node: post }) =>
				`url(${'img/' + post.frontmatter.projectImage.relativePath})`
		)

		return (
			<Layout>
				<section className="section">
					<div className="names-image-container">
						<div className="background-image-container">
							<BackgroundImageGallery
								backgroundGalleryImages={backgroundGalleryImages}
							/>
						</div>

						<div className="student-names-flex-container">
							<ul className="names--unordered-list">
								{posts.map(({ node: post }) => (
									<li className="studentName" key={post.id}>
										{post.frontmatter.studentName}
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</Layout>
		)
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array
		})
	})
}

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						description
						date(formatString: "MMMM DD, YYYY")
						projectName
						studentName
						projectImage {
							absolutePath
							relativePath
						}
					}
				}
			}
		}
	}
`
