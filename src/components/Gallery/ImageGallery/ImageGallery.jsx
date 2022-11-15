import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../../Button/Button';
import smoothScroll from 'utils/smoothScroll';

export const ImageGallery = ({ formQuery }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [visibleBtn, setvisibleBtn] = useState(false);

  const onClickLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setPage(1);
    setImages([]);
    setQuery(formQuery);
  }, [formQuery]);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (query === '') {
          return;
        }

        setIsLoading(true);
        setvisibleBtn(false);

        const imageList = await getImages(query, page);
        if (imageList.totalHits === 0) {
          alert('Images not found');
        }
        setImages(prevImages => [...prevImages, ...imageList.hits]);

        setIsLoading(false);
        setTotalHits(imageList.totalHits);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchImages();
  }, [page, query]);

  useEffect(() => {
    if (images.length !== 0 && !visibleBtn && images.length < totalHits) {
      setvisibleBtn(true);
    } else if (images.length >= totalHits && visibleBtn) {
      setvisibleBtn(false);
    }
  }, [images, totalHits, visibleBtn]);

  // useEffect(() => {
  //   if (page !== 1) {
  //     smoothScroll();
  //   }
  // }, [page]);

  useEffect(() => {
    if (images.length && page !== 1) {
      smoothScroll();
    }
  }, [images, page]);

  return (
    <>
      <ImageGalleryList>
        {error && <div>Thometing wrong!</div>}
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
      </ImageGalleryList>
      {isLoading && <Loader />}
      {visibleBtn && <Button onClick={onClickLoadMoreBtn} />}
    </>
  );
};

ImageGallery.propTypes = {
  formQuery: PropTypes.string.isRequired,
};
