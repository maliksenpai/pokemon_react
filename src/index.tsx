import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './helpers/store-provider';
import {PokemonStore} from "./mobx/PokemonStore";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const pokemonStore = new PokemonStore( []);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const client = new ApolloClient({
    uri: "https://dex-server.herokuapp.com/",
    cache: new InMemoryCache()
});

root.render(
  <StoreProvider value={pokemonStore}>
      <ApolloProvider client={client}>
           <App />
      </ApolloProvider>
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
