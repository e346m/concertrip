import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { onError } from 'apollo-link-error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './index'
import Nav from './nav'
import FetchOrCreateRoom from './components/fetchOrCreateRoom'

const httpLink = createHttpLink({ uri: '/api' })
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, code }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${code}`,
      ),
    )
  }
  if (networkError) { console.log(`[Network error]: ${networkError}`) }
})
const link = errorLink.concat(httpLink)
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/rooms/:name" component={FetchOrCreateRoom} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('main_container')
)
