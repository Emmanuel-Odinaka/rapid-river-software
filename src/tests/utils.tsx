import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderComponent = (component: React.ReactElement) => {
  return render(<Router>{component}</Router>);
};
