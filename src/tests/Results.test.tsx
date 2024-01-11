/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Results from '../pages/Results';
import MockAdapter from 'axios-mock-adapter';
import { renderComponent } from './utils';

const mock = new MockAdapter(axios);
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

describe('Results', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetches and displays articles', async () => {
    const articles = [
      { userId: 1, id: 1, title: 'Test Article 1', body: 'Test Body 1' },
      { userId: 2, id: 2, title: 'Test Article 2', body: 'Test Body 2' },
    ];

    mock.onGet(apiUrl).reply(200, articles);

    const { findByText } = renderComponent(<Results />);

    const firstArticleTitle = await findByText('Test Article 1');
    expect(firstArticleTitle).toBeInTheDocument();

    const secondArticleTitle = await findByText('Test Article 2');
    expect(secondArticleTitle).toBeInTheDocument();
  });

  it('filters articles based on search', async () => {
    const articles = [
      { userId: 1, id: 1, title: 'Test Article 1', body: 'Test Body 1' },
      { userId: 2, id: 2, title: 'Test Article 2', body: 'Test Body 2' },
    ];

    mock.onGet(apiUrl).reply(200, articles);

    const { getByText, getByPlaceholderText } = renderComponent(<Results />);

    const searchInput = getByPlaceholderText('Search by title or author id');
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Test Article 1' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByText('Test Article 1')).toBeInTheDocument();
      expect(getByText('Test Body 1')).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByText('Test Article 1')).toBeInTheDocument(); // Both articles are visible again
      expect(getByText('Test Article 2')).toBeInTheDocument();
    });
  });
});
