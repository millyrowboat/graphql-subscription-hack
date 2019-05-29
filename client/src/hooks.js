import { useState, useEffect } from 'react';
import client from './apollo';
import gql from 'graphql-tag';

const query = {
  query: gql`
    {
      books {
        title
        author
      }
    }
  `
};

export const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await client.query(query).then(result => {
      return result.data;
    });

    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
};
