## GraphQl Subscription Example

### Instructions

Run the server

```
cd server
npm run dev
```

Run the app

```
cd client
yarn start
```

Navigate to

```
localhost:4000/graphql
```

Run a mutation query like:

```
mutation addBook {
  addBook(title: "Title", author: "Author") {
    title
    author
  }
}
```

You should see the UI updated in _REAL TIME!_ :sparkles:
