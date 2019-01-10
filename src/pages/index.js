import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BackgroundImageGallery from '../components/BackgroundImageGallery'
import Style from '../components/gallery-style.less'

export default class IndexPage extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			backgroundGalleryImages: [],
			currentBackgroundGalleryImage: ''
		}
	}

	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark
		let backgroundGalleryImages = []
		let currentBackgroundGalleryImage = ''
		backgroundGalleryImages = posts.map(({ node: post }) => (`url(${'img/' + post.frontmatter.projectImage.relativePath})`))
		console.log(this.state.backgroundGalleryImages)

		return (
			<Layout>
				<section className="section">
					<div className="names-image-container">
						<div className="background-image-container">
							<div
								className="gallery-image"
								// key={post.id}
								style={{backgroundImage:backgroundGalleryImages[0]}}
							>
							</div>
							// <BackgroundImageGallery backgroundGalleryImages={this.state.backgroundGalleryImages} />
						</div>

						<div className="student-names-flex-container">
							<ul className="names--unordered-list">
								{posts
									.map(({ node: post }) => (
										<li className="studentName" key={post.id} >
											{post.frontmatter.studentName}
										</li>
									))}
							</ul>
						</div>
					</div>
				</section>
			</Layout>

		// <Layout>
		// 	<section className="section">
		// 		<div className="container">
		// 			{posts
		// 				.map(({ node: post }) => (
		// 					<div
		// 						className="content"
		// 						style={{ }}
		// 						key={post.id}
		// 					>
		// 						<p>
		// 							<Link className="has-text-primary" to={post.fields.slug}>
		// 								{post.frontmatter.title}
		// 							</Link>
		// 							<span> &bull; </span>
		// 							<small>{post.frontmatter.date}</small>
		// 						</p>
		// 						<p>
		// 							{post.excerpt}
		// 							<br />
		// 							<br />
		// 							<Link className="button is-small" to={post.fields.slug}>
		//                 Keep Reading →
		// 							</Link>
		// 						</p>
		// 					</div>
		// 				))}
		// 		</div>
		// 	</section>
		// </Layout>
		)
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
