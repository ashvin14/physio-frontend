import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./EntryComponents/App";
import * as serviceWorker from "./serviceWorker";

import ErrorBoundary from "./components/ErrorBoundary";
//import provider
import { Provider } from "mobx-react";

//import routes
import { BrowserRouter as Router } from "react-router-dom";

//import stores
import patientStore from "./stores/PatientStore";
import userStore from "./stores/UserStore";
import errorStore from "./stores/ErrorStore";
import notificationStore from "./stores/NotificationStore";

const stores = {
  patientStore,
  userStore,
  errorStore,
  notificationStore,
};

window.app_state = stores;

ReactDOM.render(
  <Router>
    <Provider {...stores}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </Router>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
