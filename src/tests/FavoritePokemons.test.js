import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('Exibe a mensagem "No favorite pokemon found" se não há pokémons favoritos', () => {
  render(<FavoritePokemons />);
  const message = screen.getByText(/no favorite pokemon found/i);

  expect(message).toBeDefined();
});

test('Exibe todos os cards de pokémons favoritados', () => {
  render(
    <BrowserRouter>
      <FavoritePokemons pokemons={ pokemons } />
    </BrowserRouter>,
  );

  pokemons.forEach(({ name }) => {
    const nameElement = screen.getByText(name);
    expect(nameElement).toBeDefined();
  });
});
