import {store} from "./redux/store";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {router} from "./router";

function App() {
  return (
      <Provider  store={store}>
        <RouterProvider router={router}/>
      </Provider>
  );
}

export default App;
