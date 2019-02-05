import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BackgroundImageGallery from '../components/BackgroundImageGallery'
import IndexStyles from '../components/gallery-style.module.less'

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark
		const backgroundGalleryImages = posts.map(({ node: post }) =>
			post.frontmatter.projectImage != null
				? `url(img/${post.frontmatter.projectImage.relativePath})`
				: console.error(post)
		)

		return (
			<Layout>
				<section className={IndexStyles.section}>
					<div className={IndexStyles.namesImageContainer}>
						<div className={IndexStyles.backgroundImageContainer}>
							<BackgroundImageGallery
								backgroundGalleryImages={backgroundGalleryImages}
							/>
						</div>

						<div className={IndexStyles.studentNamesFlexContainer}>
							<ul className={IndexStyles.namesUnorderedList}>
								{posts.map(({ node: post }) => (
									<li className={IndexStyles.studentName} key={post.id}>
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
						tags
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
