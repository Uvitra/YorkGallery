// WARNING: marked for deletion

import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import logo from '../../static/img/dept_large.png'

import IndexStyles from './gallery-style.module.less'

const Navbar = () => (
	<StaticQuery
		query={graphql`
			{
				allMarkdownRemark(limit: 1000) {
					edges {
						node {
							id
							frontmatter {
								tags
							}
						}
					}
				}
			}
		`}
		render={data => (
			<nav className={IndexStyles.navbar}>
				<div className={IndexStyles.navbarContainer}>
					<div className={IndexStyles.navbarBrand}>
						<Link to="/" className={IndexStyles.navbarItem}>
							<figure className={IndexStyles.logoImage}>
								<img src={logo} alt="Design at York" />
							</figure>
						</Link>
					</div>
					{data.allMarkdownRemark.edges
						.filter(({ node }) => node.frontmatter.tags !== null)
						.map(({ node }) => (
							<div key={node.id}>
								<Link
									className={IndexStyles.navbarItem}
									to={node.frontmatter.tags[0]}
								>
									{node.frontmatter.tags}
								</Link>
							</div>
						))}
				</div>
			</nav>
		)}
	/>
)

export default Navbar
