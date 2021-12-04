import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

test('Exibe as informações detalhadas do Pokémon selecionado', () => {
  const POKEMON = pokemons[0];
  const { history } = renderWithRouter(<App />);

  history.push(`/pokemons/${POKEMON.id}`);

  const title = screen.getByText(`${POKEMON.name} Details`);
  expect(title).toBeDefined();

  const moreDetailsLink = screen.queryByRole('link', { name: /more details/i });
  expect(moreDetailsLink).toBeNull();

  const summaryTitle = screen.getByRole('heading', {
    level: 2,
    name: /summary/i,
  });
  expect(summaryTitle).toBeDefined();

  const summary = screen.getByText(POKEMON.summary);
  expect(summary).toBeDefined();
});

test('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
  const POKEMON = pokemons[0];
  const { history } = renderWithRouter(<App />);

  history.push(`/pokemons/${POKEMON.id}`);

  const gameLocationsTitle = screen.getByRole('heading', {
    level: 2,
    name: `Game Locations of ${POKEMON.name}`,
  });
  expect(gameLocationsTitle).toBeDefined();

  const maps = screen.getAllByAltText(`${POKEMON.name} location`);

  POKEMON.foundAt.forEach(({ location, map }, index) => {
    const locationElement = screen.getByText(location);
    expect(locationElement).toBeDefined();

    expect(maps[index]).toHaveAttribute('src', map);
  });
});

test('O usuário pode favoritar um pokémon através da página de detalhes', () => {
  const POKEMON = pokemons[0];
  const { history } = renderWithRouter(<App />);

  history.push(`/pokemons/${POKEMON.id}`);

  const favoriteCheckbox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  expect(favoriteCheckbox).toBeDefined();

  let favoritePokemonIds = readFavoritePokemonIds();
  expect(favoritePokemonIds).not.toContain(POKEMON.id);

  userEvent.click(favoriteCheckbox);

  favoritePokemonIds = readFavoritePokemonIds();
  expect(favoritePokemonIds).toContain(POKEMON.id);
});
