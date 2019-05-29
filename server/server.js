import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { apolloServer, schema } from './apollo';

const PORT = 4000 || process.env;
const app = express();

apolloServer.applyMiddleware({ app });
app.use('*', cors({ origin: `http://localhost:3000` }));

const webSocketsServer = createServer(app);
apolloServer.installSubscriptionHandlers(webSocketsServer);
webSocketsServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      apolloServer.subscriptionsPath
    }`
  );
});
