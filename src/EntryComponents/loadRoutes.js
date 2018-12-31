import Loadable from "react-loadable";
import React from "react";

const loading = () => <h4>loading...</h4>;

//const SignIn = Loadable({
//loader: () => import(/* webpackChunkName: "Signin" */ "../components/SignIn"),
//loading,
//});

const PatientsList = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Signin" */ "../utilityComponents/panels"),
  loading,
});

export { PatientsList };
