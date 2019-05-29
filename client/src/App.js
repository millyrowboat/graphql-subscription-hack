import React from 'react';
import { ApolloProvider, Subscription } from 'react-apollo';
import { useFetch } from './hooks.js';
import { BOOK_SUBSCRIPTION } from './queries';
import client from './apollo';
import './App.css';

function App() {
  const [bookData, dataLoading] = useFetch();

  return (
    <ApolloProvider client={client}>
      <Subscription subscription={BOOK_SUBSCRIPTION}>
        {({ data, loading, error }) => {
          console.log('SUBSczription:', data);
          if (error) {
            console.log(error);
          }
          return (
            <div className="App">
              <header className="App-header">
                {dataLoading ? (
                  <p>Waiting...</p>
                ) : (
                  bookData.books.map(({ title, author }) => {
                    return (
                      <>
                        <p> {title} </p>
                        <p> {author} </p>
                      </>
                    );
                  })
                )}
                {loading ? (
                  <p> Waiting for new books...</p>
                ) : (
                  <>
                    <p>{data.bookAdded.title}</p>
                    <p>{data.bookAdded.author}</p>
                  </>
                )}
              </header>
            </div>
          );
        }}
      </Subscription>
    </ApolloProvider>
  );
}

export default App;
