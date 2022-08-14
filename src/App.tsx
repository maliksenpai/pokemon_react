import React from 'react';
import './App.css';
import {useObserver} from "mobx-react-lite";
import {PageWrapper} from "./pages/PageWrapper";

function App() {

  return useObserver(() => (
      <>
          <PageWrapper />
      </>
  ));
}

export default App;
