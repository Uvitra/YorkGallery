import React from 'react'

import IndexStyles from './gallery-style.module.less'

const BackgroundImageGallery = ({ backgroundGalleryImages }) => (
	<div
		className={IndexStyles.galleryImage}
		// key={post.id}
		style={{ backgroundImage: backgroundGalleryImages[1] }}
	/>
)

export default BackgroundImageGallery
