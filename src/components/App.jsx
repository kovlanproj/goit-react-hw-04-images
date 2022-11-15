import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './Gallery/ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');

  const onSubmit = query => {
    setQuery(query);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery formQuery={query} />
    </div>
  );
};
