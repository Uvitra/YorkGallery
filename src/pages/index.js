import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import style from '../components/gallery-style.less'

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props
		const { edges: posts } = data.allMarkdownRemark

		console.log(posts)

		return (
			<Layout>
				<section className="section">
					<div className="container">
						{posts
							.map(({ node: post }) => (
								<div
									className="content"
									style={{ }}
									key={post.id}
								>
									<p>
										<Link className="has-text-primary" to={post.fields.slug}>
											{post.frontmatter.title}
											<br />
											{post.frontmatter.tags}
										</Link>
										<span> &bull; </span>
										<small>{post.frontmatter.date}</small>
									</p>
									<p>
										{post.excerpt}
										<br />
										<br />
										<Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
										</Link>
									</p>
								</div>
							))}
					</div>
				</section>
			</Layout>
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
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
