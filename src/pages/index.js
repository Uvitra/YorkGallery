import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, withPrefix } from 'gatsby'
import Helmet from 'react-helmet'
// import BackgroundImageGallery from '../components/BackgroundImageGallery'
import IndexStyles from '../components/gallery-style.module.less'
import logo from '../../static/img/dept_large.png'

const _ = require('lodash')

// const BackgroundImageGallery = ({ backgroundGalleryImages }) => (
// 	<div
// 		className={IndexStyles.galleryImage}
// 		// key={post.id}
// 		style={{ backgroundImage: backgroundGalleryImages[1] }}
// 	/>
// )

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark

		console.log(posts)
		{
			// const backgroundGalleryImages = posts.map(({ node: post }) =>
			// 	post.frontmatter.projectImage != null
			// 		? `url(img/${post.frontmatter.projectImage.relativePath})`
			// 		: console.warn(post)
			// )
		}

		// Tags
		let tags = []
		// Iterate through each post, putting all found tags into `tags`
		posts.forEach(edge => {
			if (_.get(edge, 'node.frontmatter.tags')) {
				tags = tags.concat(edge.node.frontmatter.tags)
			}
		})
		// Eliminate duplicate tags
		tags = _.uniq(tags)

		// Let's get those images!
		let allBackgroundImages = []
		// Iterate through each post, putting all found images relativePaths into `images`
		posts.forEach(edge => {
			if (_.get(edge, 'node.frontmatter.projectImage.relativePath')) {
				allBackgroundImages = allBackgroundImages.concat(
					edge.node.frontmatter.projectImage.relativePath
				)
			}
		})
		// Eliminate duplicate image paths
		allBackgroundImages = _.uniq(allBackgroundImages)

		console.log(allBackgroundImages)

		return (
			<main className={IndexStyles.appWrapper}>
				<Helmet>
					<title>Design at York Gallery</title>
					<meta
						name="Description"
						content="A Gallery of Work created by Students enrolled in Design at York."
					/>
					<meta charSet="utf-8" />
				</Helmet>
				<nav className={IndexStyles.navbar}>
					<div className={IndexStyles.navbarContainer}>
						<div className={IndexStyles.navbarBrand}>
							<Link to="/" className={IndexStyles.navbarItem}>
								<figure className={IndexStyles.logoImage}>
									<img src={logo} alt="Design at York" />
								</figure>
							</Link>
						</div>
						{tags.map(category => (
							<div key={category}>
								<Link
									className={IndexStyles.navbarItem}
									to={'/' + category.toString()}
								>
									{category}
								</Link>
							</div>
						))}
						<Link className={IndexStyles.navbarItem} to="/about">
							About
						</Link>
					</div>
				</nav>
				<section className={IndexStyles.section}>
					<div className={IndexStyles.namesImageContainer}>
						<div className={IndexStyles.backgroundImageContainer}>
							{allBackgroundImages.map(backgroundImage => (
								<div className={IndexStyles.galleryImage} key={backgroundImage}>
									<img src={withPrefix(`/img/${backgroundImage}`)} alt="" />
								</div>
							))}
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
			</main>
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
