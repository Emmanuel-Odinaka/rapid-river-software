import React, { useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ArticleCard from '../components/ArticleCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type Article = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Results: React.FC = () => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = React.useState<Article[]>([]);
  const apiUrl: string = 'https://jsonplaceholder.typicode.com';

  useEffect(() => {
    axios
      .get(`${apiUrl}/posts`)
      .then((res) => setArticles(res.data))
      .catch((error) => {
        console.log(error);
        toast.error('Error occurred when fetching articles');
      });
  }, []);

  useEffect(() => {
    if (articles) {
      // render the first 10 initially
      setFilteredArticles(articles.slice(0, 10));
    }
  }, [articles]);

  // Search article
  const handleSearch = (values: { search: string }) => {
    if (!values.search) {
      setFilteredArticles(articles.slice(0, 10));
      return;
    }

    const filteredArticles = articles.filter((article) => {
      return (
        article.title.includes(values.search) ||
        article.userId.toString().includes(values.search)
      );
    });

    setFilteredArticles(filteredArticles);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Articles Result</h1>
          <Link
            to="/create"
            className="text-purple-500 hover:underline font-semibold"
          >
            Article Creation Page
          </Link>
        </div>

        <Formik
          initialValues={{
            search: '',
          }}
          validationSchema={Yup.object({
            search: Yup.string(),
          })}
          onSubmit={handleSearch}
        >
          <Form>
            <div className="mb-8 flex justify-start flex-col">
              <InputField
                type="text"
                name="search"
                placeholder="Search by title or author id"
                className="w-full"
              />
              <Button className="mt-4 ml-auto" type="submit">
                Search
              </Button>
            </div>
          </Form>
        </Formik>

        {!filteredArticles.length && (
          <p className="text-xl text-center">No article matched your query</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              userId={article.userId}
              title={article.title}
              body={article.body}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
