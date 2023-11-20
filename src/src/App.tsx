import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./components/RoutesWithNotFound";
import { privateRoutes, publicRoutes } from "./models";
import { AuthGuard } from "./components/guards";
import { AuthProvider } from "./context/auth";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <div>
      <Suspense fallback={<>Cargando...</>}>
        <AuthProvider>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={privateRoutes.PRIVATE} />}
              />
              <Route path={publicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${privateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </div>
  );
}

export default App;
