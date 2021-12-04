import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

test('Renderiza um card com as informações corretas de um Pokémon', () => {
  const POKEMON = pokemons[0];
  renderWithRouter(
    <Pokemon pokemon={ POKEMON } isFavorite showDetailsLink />,
  );

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(POKEMON.name);

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(POKEMON.type);

  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const { value, measurementUnit } = POKEMON.averageWeight;
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

  const pokemonImage = screen.getByRole('img', { name: `${POKEMON.name} sprite` });
  expect(pokemonImage).toHaveAttribute('src', POKEMON.image);
});

test('O card contém um link de navegação para exibir mais detalhes do Pokémon', () => {
  const POKEMON = pokemons[0];
  renderWithRouter(
    <Pokemon pokemon={ POKEMON } isFavorite showDetailsLink />,
  );

  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${POKEMON.id}`);
});

test('Redireciona à página de detalhes do Pokémon ao clicar no link', () => {
  renderWithRouter(<App />);
  const POKEMON = pokemons[0];

  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsLink);

  const heading = screen.getByRole('heading', { name: `${POKEMON.name} Details` });
  expect(heading).toBeDefined();
});

test('A URL exibida no navegador muda para /pokemon/<id> ao clicar no link', () => {
  const { history } = renderWithRouter(<App />);
  const POKEMON = pokemons[0];

  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsLink);

  expect(history.location.pathname).toBe(`/pokemons/${POKEMON.id}`);
});

test('Há um ícone de estrela nos Pokémons favoritados', () => {
  const POKEMON = pokemons[0];
  renderWithRouter(
    <Pokemon pokemon={ POKEMON } isFavorite showDetailsLink />,
  );

  const favoriteIcon = screen.getByRole('img', {
    name: `${POKEMON.name} is marked as favorite`,
  });

  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
});
