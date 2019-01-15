import React from 'react'

const BackgroundImageGallery = ({ backgroundGalleryImages }) => (
	<div
		className="gallery-image"
		// key={post.id}
		style={{ backgroundImage: backgroundGalleryImages[1] }}
	/>
)

export default BackgroundImageGallery
