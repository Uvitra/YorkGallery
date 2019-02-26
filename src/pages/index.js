import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, withPrefix } from 'gatsby'
import Helmet from 'react-helmet'
import GalleryStyle from '../components/gallery-style.module.less'

const _ = require('lodash')

export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			queryArray: [],
			filteredQueryArray: [],
			text: 'text',
			allBackgroundImages: [],
			tags: [],
			selectedCategory: '',
			currentBackgroundImageID: 0,
			backgroundImageShown: '',
			highlightedName: '',
			displayFocusedImage: false,
			profileDisplay: false,
			projectEdgeSelected: -1
		}

		this.changeBackgroundImage = this.changeBackgroundImage.bind(this)
		this.studentHoverImage = this.studentHoverImage.bind(this)
		this.toggleProfile = this.toggleProfile.bind(this)
		this.handleTagFilter = this.handleTagFilter.bind(this)
	}

	componentDidMount() {
		const { edges: posts } = this.props.data.allMarkdownRemark

		// ===== Start of adding all unique Tags to State =====
		let tags = []
		// Iterate through each post, putting all found tags into `tags`
		posts.forEach(edge => {
			if (_.get(edge, 'node.frontmatter.tags')) {
				tags = tags.concat(edge.node.frontmatter.tags)
			}
		})
		// Eliminate duplicate tags
		tags = _.uniq(tags)

		// ===== End of adding all unique Tags to State =====

		// ===== Start of adding all unique images to state =====
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
		this.setState({
			allBackgroundImages: allBackgroundImages,
			tags: tags,
			queryArray: posts,
			filteredQueryArray: posts
		})

		// ===== End of adding all images to state =====

		this.timerID = setInterval(() => this.changeBackgroundImage(), 4000, true)
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	changeBackgroundImage() {
		this.setState({
			currentBackgroundImageID: Math.floor(
				Math.random() * this.state.allBackgroundImages.length
			),
			backgroundImageShown: this.state.allBackgroundImages[
				this.state.currentBackgroundImageID
			]
		})
	}

	studentHoverImage(idOfEntry, isDisplayed) {
		if (isDisplayed) {
			clearInterval(this.timerID)

			let studentIndex = _.findIndex(this.props.data.allMarkdownRemark.edges, {
				node: {
					id: idOfEntry
				}
			})
			let backgroundImageArrayIndex = _.indexOf(
				this.state.allBackgroundImages,
				this.props.data.allMarkdownRemark.edges[studentIndex].node.frontmatter
					.projectImage.relativePath
			)
			this.setState({
				currentBackgroundImageID: backgroundImageArrayIndex,
				backgroundImageShown: this.state.allBackgroundImages[
					backgroundImageArrayIndex
				],
				highlightedName: idOfEntry
			})
		} else {
			// this.timerID = setInterval(() => this.changeBackgroundImage(), 4000, true)
			this.setState({
				highlightedName: ''
			})
		}
	}

	toggleProfile(idOfClickedName) {
		let edgeIndex = _.findIndex(this.props.data.allMarkdownRemark.edges, {
			node: {
				id: idOfClickedName
			}
		})

		this.setState({
			profileDisplay: !this.state.profileDisplay,
			projectEdgeSelected: edgeIndex
		})
	}

	handleTagFilter(category) {
		console.log(category)
		console.log(this.state.queryArray)
		console.log(this.state.queryArray[5].node.frontmatter.tags)
		console.log(
			_.findIndex(this.state.queryArray[5].node.frontmatter.tags, category)
		)
		let filteredArray = []
		filteredArray = _.filter(this.state.queryArray, {
			node: {
				frontmatter: {
					tags: category
				}
			}
		})
		console.log(filteredArray)

		this.setState({
			selectedCategory: category,
			filteredQueryArray: filteredArray
		})
	}

	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark
		// console.log(posts)
		// console.log(this.state.allBackgroundImages)
		// console.log(this.state.queryArray)
		{
			// filteredArray = _.filter(this.state.queryArray, function(o) {
			// 	_.findIndex(o.frontmatter.tags, category) >= 0
			// 	? return o
			// 	: return null
			// })
		}
		return (
			<main className={GalleryStyle.appWrapper}>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Design at York Gallery</title>
					<meta
						name="Description"
						content="A Gallery of Work created by Students enrolled in Design at York."
					/>
					<link rel="canonical" href="https://gallerytest.xyz" />
				</Helmet>
				<nav className={GalleryStyle.navbar}>
					<div className={GalleryStyle.navbarContainer}>
						<Link to="/" className={GalleryStyle.navbarItem}>
							<svg
								className={GalleryStyle.yorkLogo}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 885.8 318.9"
							>
								<path
									id="path2588"
									className={GalleryStyle.whiteFill}
									d="M67.8,218.1c0,9.4-5.6,12.2-10.3,12.2s-10.3-2.3-10.3-12.2v-17.3h3.7V219c0,3.7,1.9,8,7,8
										s7-4.2,7-8v-18.3h3.7v17.3H67.8z"
								/>
								<path
									id="path2590"
									className={GalleryStyle.whiteFill}
									d="M107.6,200.7h5.2l11.7,20.1c0.5,0.9,1.4,2.8,1.9,3.7l0,0c0-0.9,0-2.3,0-3.7v-20.6h3.7v29h-5.2
										l-11.7-20.6c-0.5-0.9-1.4-2.8-1.9-3.7l0,0c0,0.9,0,2.3,0,3.7v20.6h-3.7V200.7z"
								/>
								<path
									id="path2592"
									className={GalleryStyle.whiteFill}
									d="M173.6,229.8h-3.7v-29h3.7V229.8z"
								/>
								<path
									id="path2594"
									className={GalleryStyle.whiteFill}
									d="M221.9,222.3c0.5,1.4,0.5,2.3,0.9,3.7l0,0c0.5-0.9,0.5-2.3,0.9-3.7l7-21.5h3.7l-9.8,29H220
										l-9.8-29h4.2L221.9,222.3z"
								/>
								<path
									id="path2596"
									className={GalleryStyle.whiteFill}
									d="M272,200.7h17.3v2.8h-13.6v9.4h13.1v2.8h-13.1V226h14.1v2.8H272V200.7z"
								/>
								<path
									id="path2598"
									className={GalleryStyle.whiteFill}
									d="M328.2,200.7h9.8c5.2,0,8.9,2.3,8.9,8s-3.7,7-5.2,7.5l7,13.6h-4.7l-6.1-13.1h-6.1v13.1h-3.7
										L328.2,200.7L328.2,200.7z M331.9,213.4h6.1c4.2,0,5.6-2.3,5.6-4.7c0-4.7-4.2-5.2-5.6-5.2h-5.6v9.8H331.9z"
								/>
								<path
									id="path2600"
									className={GalleryStyle.whiteFill}
									d="M388.1,222.8c0.5,1.9,2.3,4.7,6.1,4.7s5.6-2.8,5.6-5.2c0-3.3-1.9-4.2-2.8-4.7l-7-3.3
										c-2.8-1.4-4.2-3.3-4.2-6.1c0-5.6,4.7-8,8.9-8s7.5,1.4,8.9,5.2l-3.7,1.4c-0.5-2.8-3.3-3.3-5.2-3.3c-3.7,0-5.2,1.9-5.2,4.7
										s1.9,3.7,3.7,4.7l5.2,2.3c1.9,0.9,5.2,2.3,5.2,7.5c0,2.8-1.9,8-9.8,8c-6.1,0-8.9-3.7-9.4-6.1L388.1,222.8z"
								/>
								<path
									id="path2602"
									className={GalleryStyle.whiteFill}
									d="M446.2,229.8h-3.7v-29h3.7V229.8z"
								/>
								<path
									id="path2604"
									className={GalleryStyle.whiteFill}
									d="M491.6,204h-8.4v-3.3h20.6v3.3h-8.4v25.8h-3.7L491.6,204L491.6,204z"
								/>
								<path
									id="path2606"
									className={GalleryStyle.whiteFill}
									d="M540.8,200.7h17.3v2.8h-13.6v9.4h13.1v2.8h-13.1V226h14.1v2.8h-17.8V200.7z M550.2,193.3h4.2
										l-5.6,5.6h-2.8L550.2,193.3z"
								/>
								<path
									id="path2608"
									className={GalleryStyle.whiteFill}
									d="M67.8,274.7c0,9.4-5.6,12.2-10.8,12.2c-4.7,0-10.3-2.3-10.3-12.2v-17.3h3.7v18.3c0,3.7,1.9,8,7,8
										s7-4.2,7-8v-18.3h3.7v17.3H67.8z"
								/>
								<path
									id="path2610"
									className={GalleryStyle.whiteFill}
									d="M107.1,257.4h5.2l11.7,20.1c0.5,0.9,1.4,2.8,1.9,3.7l0,0c0-0.9,0-2.3,0-3.7v-20.6h3.7v29h-5.2
										l-11.7-20.6c-0.5-0.9-1.4-2.8-1.9-3.7l0,0c0,0.9,0,2.3,0,3.7V286h-3.7L107.1,257.4L107.1,257.4z"
								/>
								<path
									id="path2612"
									className={GalleryStyle.whiteFill}
									d="M173.2,286h-3.7v-29h3.7V286z"
								/>
								<path
									id="path2614"
									className={GalleryStyle.whiteFill}
									d="M220.9,279c0.5,1.4,0.5,2.3,0.9,3.7l0,0c0.5-1.4,0.5-2.3,0.9-3.7l7-21.5h3.7l-9.8,29H219l-9.8-29
										h4.2L220.9,279z"
								/>
								<path
									id="path2616"
									className={GalleryStyle.whiteFill}
									d="M271,257.4h17.3v2.8h-13.6v9.4h13.1v2.8h-13.1v10.3h14.1v2.8H271V257.4z"
								/>
								<path
									id="path2618"
									className={GalleryStyle.whiteFill}
									d="M327.2,257.4h9.8c5.2,0,8.9,2.3,8.9,8c0,5.6-3.7,7-5.2,7.5l7,13.6h-4.7l-6.1-13.1H331v13.1h-3.7
										L327.2,257.4L327.2,257.4z M331,270.1h6.1c4.2,0,5.6-2.3,5.6-4.7c0-4.7-4.2-5.2-5.6-5.2h-5.6v9.8H331z"
								/>
								<path
									id="path2620"
									className={GalleryStyle.whiteFill}
									d="M386.7,279.4c0.5,1.9,2.3,4.7,6.1,4.7c3.7,0,5.6-2.8,5.6-5.2c0-3.3-1.9-4.2-2.8-4.7l-7-3.3
										c-2.8-1.4-4.2-3.3-4.2-6.1c0-5.6,4.7-8,8.9-8c4.2,0,7.5,1.4,8.9,5.2l-3.7,1.4c-0.5-2.8-3.3-3.3-5.2-3.3c-3.7,0-5.2,1.9-5.2,4.7
										c0,2.8,1.9,3.7,3.7,4.7l5.2,2.3c1.9,0.9,5.2,2.3,5.2,7.5c0,2.8-1.9,8-9.8,8c-6.6,0-8.9-3.7-9.4-6.1L386.7,279.4z"
								/>
								<path
									id="path2622"
									className={GalleryStyle.whiteFill}
									d="M444.8,286H441v-29h3.7V286z"
								/>
								<path
									id="path2624"
									className={GalleryStyle.whiteFill}
									d="M489.7,260.7h-8.4v-3.3h20.6v3.3h-8.4v25.8h-3.7V260.7z"
								/>
								<path
									id="path2626"
									className={GalleryStyle.whiteFill}
									d="M546.4,274.3l-10.3-16.9h4.7l6.6,11.2c0.5,0.9,0.9,1.4,0.9,2.3l0,0c0.5-0.9,0.9-1.9,1.4-2.3
										l6.6-11.2h4.2l-10.3,16.9V286h-3.7L546.4,274.3L546.4,274.3z"
								/>
								<path
									id="path2628"
									className={GalleryStyle.whiteFill}
									d="M46.7,241v1.9h512.8V241H46.7z"
								/>
								<path
									id="path2630"
									className={GalleryStyle.whiteFill}
									d="M72.5,159.5h4.2c8.4,0,10.3-3.3,10.3-11.7v-26.2L55.1,64c-6.6-11.7-8.9-13.1-16.9-13.1h-1.4v-5.2
										c7,0,14.1,0.5,21.1,0.5S72,45.7,79,45.7v5.2h-2.8c-3.3,0-6.1,0.9-6.1,5.2c0,2.3,1.9,7,3.7,9.8l24.8,44.5l22.9-44
										c1.4-2.3,4.7-8.9,4.7-11.7s-1.9-3.7-6.6-3.7h-3.3v-5.2c7,0,11.2,0.5,16.4,0.5c5.6,0,11.2-0.5,16.4-0.5v5.2h-4.2
										c-7,0-8.4,2.3-13.6,11.7L102,117.8v30c0,9.8,3.7,11.7,10.3,11.7h3.3v5.2c-7,0-14.1-0.5-21.1-0.5c-7.5,0-15,0.5-21.1,0.5v-5.2H72.5z"
								/>
								<path
									id="path2632"
									className={GalleryStyle.whiteFill}
									d="M222.3,43.9c33.3,0,62.3,26.7,62.3,61.4c0,29.5-22.5,61.4-62.8,61.4c-36.1,0-61.8-27.2-61.8-60.4
										C159.6,69.6,189.5,43.9,222.3,43.9 M221.9,50.9c-23.4,0-45.4,14.5-45.4,52.9c0,27.2,17.8,56.7,46.4,56.7c30.9,0,45-22.5,45-53.4
										C267.8,80.4,250.9,50.9,221.9,50.9"
								/>
								<path
									id="path2634"
									className={GalleryStyle.whiteFill}
									d="M310.8,159.5h2.8c7.5,0,11.2-2.8,11.2-13.6V64.5c0-10.8-3.3-13.6-11.2-13.6h-2.8v-5.2
										c5.6,0,14.1,0.5,21.5,0.5c11.2,0,19.2-0.5,26.7-0.5c29.5,0,34.7,23.4,34.7,30.9c0,22-15.5,28.6-23.9,31.4l22.5,37
										c9.4,15,11.7,15.9,25.3,16.9v3.3c-3.3,0-6.1,0-9.4,0c-14.5,0-21.5-1.9-30.4-16.4l-19.7-31.8c-3.7-6.1-6.1-6.6-18.7-7v31.4
										c0,15.9,2.8,17.8,9.4,17.8h4.7v5.2c-7.5,0-14.5-0.5-21.5-0.5c-7.5,0-15.5,0.5-21.5,0.5v-4.7H310.8z M339.4,102.9
										c2.8,0.9,7,0.9,11.2,0.9c15,0,27.2-7,27.2-24.4c0-7.5-5.2-27.6-28.1-27.6c-4.2,0-7,0.5-10.3,0.5V102.9z"
								/>
								<path
									id="path2636"
									className={GalleryStyle.whiteFill}
									d="M443.4,159.5h2.8c7.5,0,11.2-2.8,11.2-13.6V64.5c0-10.8-3.3-13.6-11.2-13.6h-2.8v-5.2
										c5.6,0,14.1,0.5,21.5,0.5s14.5-0.5,21.5-0.5v5.2h-4.7c-6.6,0-9.4,1.9-9.4,17.8V108l36.5-40.7c1.9-1.9,8-8.4,8-11.7
										c0-2.8-2.3-4.2-5.6-4.2h-2.8v-5.2c6.1,0,13.1,0.5,19.7,0.5c6.6,0,13.1-0.5,19.7-0.5v5.2H545c-8,0-11.2,1.4-21.1,11.7l-32.3,33.7
										l43.1,50.6c9.4,11.2,14.1,12.6,21.1,12.6h2.3v5.2c-5.2,0-10.8-0.5-16.4-0.5c-5.2,0-10.8,0.5-16.4,0.5c-0.9-4.7-1.4-7.5-10.8-18.3
										l-34.2-39.3l-8.9,9.4v25.8c0,15.9,2.8,17.8,9.4,17.8h4.7v5.2c-7.5,0-14.5-0.5-21.5-0.5c-7.5,0-15.5,0.5-21.5,0.5v-6.1H443.4z"
								/>
								<path
									id="path2638"
									className={GalleryStyle.yorkRedFill}
									d="M772.2,255.5c-43.1,0-80.6-26.7-80.6-84.8V32.1h-96.5V286H849v-92.7
										C841.9,230.2,815.2,255.5,772.2,255.5"
								/>
								<path
									id="path2640"
									className={GalleryStyle.yorkRedFill}
									d="M772.2,203.6c22.9,0,30.4-20.1,30.4-40.3V32.1h-59v131.1C743.6,183.9,750.6,203.6,772.2,203.6"
								/>
							</svg>
						</Link>
						{this.state.tags.map((category, index) => (
							<div
								key={index}
								className={GalleryStyle.navbarItem}
								onClick={() => this.handleTagFilter(category)}
							>
								{category}
							</div>
						))}
						<Link className={GalleryStyle.navbarItem} to="/about">
							About
						</Link>
					</div>
				</nav>
				<section className={GalleryStyle.mainContainer}>
					<article className={GalleryStyle.backgroundImageContainer}>
						<img
							className={GalleryStyle.galleryImage}
							// key={uuid()}
							src={withPrefix(`/img/${this.state.backgroundImageShown}`)}
							alt=""
						/>
					</article>

					<article className={GalleryStyle.studentNamesFlexContainer}>
						<ul
							className={GalleryStyle.namesUnorderedList}
							style={
								this.state.allBackgroundImages.length > 15
									? { width: '100vw', columnCount: '4' }
									: this.state.allBackgroundImages.length > 10
										? { width: '75vw', columnCount: '3' }
										: this.state.allBackgroundImages.length > 5
											? { width: '50vw', columnCount: '2' }
											: this.state.allBackgroundImages.length > 0
												? { columnCount: '1' }
												: {}
							}
						>
							{this.state.filteredQueryArray.map(({ node: post }) => (
								<li
									className={GalleryStyle.studentName}
									style={
										this.state.profileDisplay &&
										this.state.highlightedName !== post.id &&
										this.state.highlightedName !== ''
											? { pointerEvents: 'none', opacity: '0.5' }
											: this.state.highlightedName !== post.id &&
											  this.state.highlightedName !== ''
												? { opacity: '0.5' }
												: this.state.profileDisplay
													? { opacity: '0', pointerEvents: 'none' }
													: { opacity: '1', cursor: 'pointer' } // This is the 'normal' state meaning clickable and full opacity.
									}
									key={post.id}
									onMouseEnter={() => this.studentHoverImage(post.id, true)}
									onMouseLeave={() => this.studentHoverImage(post.id, false)}
									onClick={() => this.toggleProfile(post.id)}
								>
									{post.frontmatter.studentName}
								</li>
							))}
						</ul>
					</article>

					<article
						className={GalleryStyle.projectProfileContainer}
						style={
							this.state.profileDisplay
								? { visibility: 'visible', opacity: '1' }
								: { visibility: 'hidden', opacity: '0' }
						}
					>
						<div className={GalleryStyle.projectTextContainer}>
							<h1 className={GalleryStyle.projectProfileProjectName}>
								{this.state.projectEdgeSelected !== -1
									? this.props.data.allMarkdownRemark.edges[
										this.state.projectEdgeSelected
									  ].node.frontmatter.projectName
									: ''}
							</h1>
							<h2 className={GalleryStyle.projectProfileStudentName}>
								Project by —{' '}
								{this.state.projectEdgeSelected !== -1
									? this.props.data.allMarkdownRemark.edges[
										this.state.projectEdgeSelected
									  ].node.frontmatter.studentName
									: ''}
							</h2>
							<p className={GalleryStyle.projectProfileDescription}>
								{this.state.projectEdgeSelected !== -1
									? this.props.data.allMarkdownRemark.edges[
										this.state.projectEdgeSelected
									  ].node.frontmatter.description
									: ''}
							</p>
							<button
								className={GalleryStyle.closeProfileButton}
								onClick={() => this.toggleProfile('')}
							>
								✕
							</button>
						</div>
						<div className={GalleryStyle.projectMediaContainer}>
							<img
								className={GalleryStyle.projectMediaItem}
								src={
									this.state.projectEdgeSelected !== -1
										? withPrefix(
											`/img/${
												this.props.data.allMarkdownRemark.edges[
													this.state.projectEdgeSelected
												].node.frontmatter.projectImage.relativePath
											}`
										  )
										: ''
								}
								alt={
									this.state.projectEdgeSelected !== -1
										? `An image for ${
											this.props.data.allMarkdownRemark.edges[
												this.state.projectEdgeSelected
											].node.frontmatter.studentName
										  }’s project ${
											this.props.data.allMarkdownRemark.edges[
												this.state.projectEdgeSelected
											].node.frontmatter.projectName
										  }.`
										: ''
								}
							/>
						</div>
					</article>
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
						projectImagesList {
							alt
							image {
								absolutePath
								relativePath
							}
						}
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
