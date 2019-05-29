import gql from 'graphql-tag';

export const BOOK_SUBSCRIPTION = gql`
  subscription bookAdded {
    bookAdded {
      title
      author
    }
  }
`;
