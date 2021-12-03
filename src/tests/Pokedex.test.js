import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

function testIterationOnAllPokemons() {
  const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });

  pokemons.forEach(({ name }) => {
    const pokemonName = screen.getByText(name);
    expect(pokemonName).toBeDefined();

    userEvent.click(nextPokemonButton);
  });
}

test('Exibe um heading h2 com o texto "Encountered pokémons', () => {
  render(
    <BrowserRouter>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />
    </BrowserRouter>,
  );
  const heading = screen.getByRole('heading', {
    level: 2,
    name: /encountered pokémons/i,
  });

  expect(heading).toBeDefined();
});

test('Exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  render(
    <BrowserRouter>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />
    </BrowserRouter>,
  );
  const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(nextPokemonButton).toBeDefined();

  testIterationOnAllPokemons();

  const pokemonName = screen.getByText(pokemons[0].name);
  expect(pokemonName).toBeDefined();
});

test('Exibe apenas um Pokémon por vez', () => {
  render(
    <BrowserRouter>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />
    </BrowserRouter>,
  );

  const pokemonName = pokemons[0].name;

  const displayedPokemonName = screen.getByText(pokemonName);
  expect(displayedPokemonName).toBeDefined();

  const notDisplayedPokemons = pokemons.filter(({ name }) => (
    name !== pokemonName
  ));

  notDisplayedPokemons.forEach(({ name }) => {
    const notDisplayedPokemonName = screen.queryByText(name);
    expect(notDisplayedPokemonName).toBeNull();
  });
});

test('Existem botões de filtro', () => {
  render(
    <BrowserRouter>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />
    </BrowserRouter>,
  );
  const allButton = screen.getByRole('button', { name: /all/i });
  expect(allButton).toBeDefined();

  const pokemonTypes = [
    ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
  ];

  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  typeButtons.forEach((typeButton) => {
    expect(pokemonTypes).toContain(typeButton.textContent);
  });

  const selectedType = pokemonTypes[0];
  const typeButton = screen.getByRole('button', { name: selectedType });
  const filteredPokemons = pokemons.filter(({ type }) => type === selectedType);

  userEvent.click(typeButton);
  filteredPokemons.forEach(({ name }) => {
    const pokemonName = screen.getByText(name);
    expect(pokemonName).toBeDefined();
  });

  const pokemonName = screen.getByText(filteredPokemons[0].name);
  expect(pokemonName).toBeDefined();

  expect(allButton).toBeInTheDocument();
});

test('Existe um botão para resetar o filtro', () => {
  render(
    <BrowserRouter>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />
    </BrowserRouter>,
  );
  const resetButton = screen.getByRole('button', { name: /all/i });
  expect(resetButton).toBeDefined();

  testIterationOnAllPokemons();
  userEvent.click(resetButton);
  testIterationOnAllPokemons();
});
