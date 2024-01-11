import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateArticle from '../pages/CreateArticle';
import MockAdapter from 'axios-mock-adapter';
import { renderComponent } from './utils';

const mock = new MockAdapter(axios);

describe('CreateArticle', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('submits the article successfully', async () => {
    const { getByPlaceholderText, getByText } = renderComponent(
      <CreateArticle />,
    );

    const titleInput = getByPlaceholderText('Article Title');
    const bodyInput = getByPlaceholderText('Article Content');
    const attorneyNameInput = getByPlaceholderText("Attorney's Name");
    const contactInfoInput = getByPlaceholderText('Contact Information');
    const submitButton = getByText('Submit');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body Content' } });
    fireEvent.change(attorneyNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(contactInfoInput, {
      target: { value: 'test@example.com' },
    });

    mock.onPost('https://jsonplaceholder.typicode.com/posts').reply(204);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({
          title: 'Test Title',
          body: 'Test Body Content',
          attorneyName: 'John Doe',
          contactInfo: 'test@example.com',
        }),
      );
    });
  });

  it('validates form fields and displays error messages', async () => {
    const { getByText } = renderComponent(<CreateArticle />);

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Title Required')).toBeInTheDocument();
      expect(getByText('Body Required')).toBeInTheDocument();
      expect(getByText('Attorney Name Required')).toBeInTheDocument();
      expect(getByText('Contact Info Required')).toBeInTheDocument();
    });
  });
});
