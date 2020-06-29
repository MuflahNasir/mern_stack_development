import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import NavBar from "./components/NavBar/NavBar"
import ShoppingList from "./components/ShoppingList/ShoppingList"
import { Provider } from "react-redux"
import { loadUser } from "./actions/authActions"
import store from "./store"

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  })

  return (
    <Provider store={store}>
      <div>
        <NavBar/>
        <ShoppingList/>
      </div>
    </Provider>
  );
}

export default App;
