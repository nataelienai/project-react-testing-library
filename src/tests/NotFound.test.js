import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('A página contém um heading h2 com o texto "Page requested not found 😭"', () => {
  render(<NotFound />);
  const heading = screen.getByRole('heading', {
    level: 2,
    name: /page requested not found crying emoji/i,
  });
  const cryingEmoji = screen.getByRole('img', { name: /crying emoji/i });

  expect(heading).toBeDefined();
  expect(cryingEmoji).toBeDefined();
});

test('A página renderiza uma imagem', () => {
  render(<NotFound />);
  const image = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });

  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
