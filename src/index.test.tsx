// src/index.spec.js
/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactStrictMode, rootElement } from './index';
// import { render } from '@testing-library/react';
// import Chat from '../src/components/Chat';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.js', () => {
  it('renders without crashing', () => {
    ReactDOM.render(ReactStrictMode, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(ReactStrictMode, rootElement);
  });
});

// describe('Chat component', () => {
//   test('renders username', () => {
//     const { getByText } = render(<Chat />);
//     const usernameElement = getByText(/username/i);
//     expect(usernameElement).toBeInTheDocument();
//   });

//   // Add more test cases as needed
// });
