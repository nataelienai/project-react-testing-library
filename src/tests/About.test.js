import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('A página contém as informações sobre a Pokédex', () => {
  render(<About />);
  const title = screen.getByText(/about pokédex/i);

  expect(title).toBeDefined();
});

test('A página contém um heading h2 com o texto "About Pokédex"', () => {
  render(<About />);
  const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });

  expect(heading).toBeDefined();
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(<About />);
  const paragraph1 = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
  const paragraph2 = screen.getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');

  expect(paragraph1).toBeDefined();
  expect(paragraph2).toBeDefined();
});

test('A página contém a imagem de uma Pokédex', () => {
  render(<About />);
  const image = screen.getByRole('img', { name: /pokédex/i });

  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
