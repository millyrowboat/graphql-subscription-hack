import gql from 'graphql-tag';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';

const pubsub = new PubSub();

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
  {
    title: 'Bubsy the Bobcat',
    author: 'Platinum Games'
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Subscription {
    bookAdded: Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }

  type Query {
    books: [Book]
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { title: args.title, author: args.author };
      books.push(newBook);
      pubsub.publish('bookAdded', { bookAdded: newBook });
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('bookAdded')
    }
  }
};
export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  subscriptions: {
    onConnect: () => console.log('Connected to client')
  },
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'dark'
    }
  }
});
