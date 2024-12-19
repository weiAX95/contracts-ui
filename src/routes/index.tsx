import Loading from '@/components/common/Loading';
import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Course from '@/pages/Course';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
const Test = lazy(() => import('@pages/Test'));
const Routes: RouteObject[] = [];

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/', element: <Home /> },
    { path: '/course/list', element: <Course /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};

const testRoutes = {
  path: 'test',
  element: <Layout />,
  children: [{ path: 'data', element: <Test /> }],
};

Routes.push(mainRoutes);
Routes.push(testRoutes);

export default Routes;
