// empty layout
import { Fragment } from "react";

// pages
import Home from "../../pages/Home";
const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: Fragment,
  },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
