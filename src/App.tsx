import { useRoutes } from 'react-router-dom';
import Results from './pages/Results';
import CreateArticle from './pages/CreateArticle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Results />,
    },
    {
      path: '/create',
      element: <CreateArticle />,
    },
  ]);

  return (
    <>
      {routes}
      <ToastContainer />
    </>
  );
};

export default App;
