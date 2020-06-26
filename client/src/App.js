import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import NavBar from "./components/NavBar/NavBar"
import ShoppingList from "./components/ShoppingList/ShoppingList"
import { Provider } from "react-redux"
import store from "./store"

const App = () => {
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
