import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchInput = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query === '') {
      alert('Введіть пошуковий запит');
    } else {
      onSubmit(query);
    }
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="query"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchInput}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
