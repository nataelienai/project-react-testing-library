import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Existe um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');

  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('About');
  expect(links[2]).toHaveTextContent('Favorite Pokémons');
});

test('Redireciona a página para "/" ao clicar no botão Home', () => {
  const { history } = renderWithRouter(<App />);
  const homeButton = screen.getByRole('link', { name: /home/i });

  userEvent.click(homeButton);
  expect(history.location.pathname).toBe('/');
});

test('Redireciona a página para "/about" ao clicar no botão About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutButton = screen.getByRole('link', { name: /about/i });

  userEvent.click(aboutButton);
  expect(history.location.pathname).toBe('/about');
});

test(
  'Redireciona a página para "/favorites" ao clicar no botão Favorite Pokémons',
  () => {
    const { history } = renderWithRouter(<App />);
    const favoritesButton = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritesButton);
    expect(history.location.pathname).toBe('/favorites');
  },
);

test(
  'Redireciona o aplicativo para a página Not Found ao entrar numa URL desconhecida',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('notfound');

    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeDefined();
  },
);
