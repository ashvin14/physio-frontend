import Loadable from "react-loadable";

const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: "Signin" */ "../components/SignIn"),
});

export { SignIn };
