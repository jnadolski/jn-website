import React from 'react';
import useDataFetching from './hooks/useDataFetching';

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string;
}

const Gallery = () => {
  const { data: images, loading, error } = useDataFetching<GalleryImage>(`${process.env.REACT_APP_API_URL}/api/gallery`);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="page-content">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.imageUrl} alt={image.caption} />
            <div className="caption">{image.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
