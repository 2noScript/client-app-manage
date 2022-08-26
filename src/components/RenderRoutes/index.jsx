import { publicRoutes } from "../../configs/routes";

import { Routes, Route } from "react-router-dom";
import { memo } from "react";

function RenderRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        const Layout = route.layout;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}
export default memo(RenderRoutes);
