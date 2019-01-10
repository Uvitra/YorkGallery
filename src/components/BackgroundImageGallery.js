import React from 'react'

const BackgroundImageGallery = ({ backgroundGalleryImages }) => (
	<div
		className="gallery-image"
		// key={post.id}
		style={{backgroundImage:backgroundGalleryImages[0]}}
	>
	</div>
)

export default BackgroundImageGallery
