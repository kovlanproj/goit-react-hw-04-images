import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';
import { Modal } from '../../Modal/Modal';

export const ImageGalleryItem = ({
  image: { webformatURL, tags, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <Li>
      <Img src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          imageUrl={largeImageURL}
          imageTags={tags}
        />
      )}
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
