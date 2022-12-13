import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'constants/routes';
import { ACCESS, PATHS } from 'constants/constants';
import LayoutPrivate from 'layouts/LayoutPrivate';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const renderRoutes = (_routes) =>
  _routes.map((route) => {
    const { path, access, component: Component } = route;
    return (
      <Route
        key={path}
        path={path}
        element={
          access === ACCESS.public ? (
            <PublicRoute>
              <Component />
            </PublicRoute>
          ) : (
            <PrivateRoute>
              <LayoutPrivate>
                <Component />
              </LayoutPrivate>
            </PrivateRoute>
          )
        }
      />
    );
  });

export default function Navigation() {
  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="*" element={<Navigate replace to={PATHS.login} />} />
    </Routes>
  );
}
