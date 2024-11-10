/* eslint-disable import/no-unresolved */
import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const Sterpercrowd = lazy(() => import('src/components/sterpercrowd'));
export const RequestPage = lazy(() => import('src/pages/request'));
export const PlansPage = lazy(() => import('src/module/paln/page/plansPage'));
export const PlanDetailPage = lazy(() => import('src/module/paln/page/planDetail'));
export const Userdetail = lazy(() => import('src/module/user/userDetail/feature/userdetail'));
export const UserPage = lazy(() => import('src/components/user'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProcessProjectPage = lazy(() => import('src/pages/processProject'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const EvaluationCommitteeDetails = lazy(() =>
  import('src/module/evaluationCommittee/featuer/detail')
);
export const EvaluationCommittee = lazy(() =>
  import('src/module/evaluationCommittee/page/evaluationCommitteePage')
);
export const RiskCommittee = lazy(() => import('src/module/riskCommittee/page/riskCommitteePage'));
export const RiskCommitteeDetails = lazy(() => import('src/module/riskCommittee/featuer/detail'));

const motionWrapper = (Component = React.FC) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5 }}
  >
    <Component />
  </motion.div>
);

export default function Router() {
  const location = useLocation();
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: motionWrapper(IndexPage), index: true },
        { path: 'card', element: motionWrapper(Sterpercrowd) },
        { path: 'request', element: motionWrapper(UserPage) },
        { path: 'process', element: motionWrapper(ProcessProjectPage) },
        { path: 'ProfilePage', element: motionWrapper(ProfilePage) },
        { path: 'plans', element: motionWrapper(PlansPage) },
        { path: '/plan/:trace_code', element: motionWrapper(PlanDetailPage) },
        { path: '/userDetail/:userId', element: motionWrapper(Userdetail) },
        { path: 'user', element: motionWrapper(UserPage) },
        { path: 'evaluationCommittee', element: motionWrapper(EvaluationCommittee) },
        { path: 'evaluationCommittee/:cartId', element: motionWrapper(EvaluationCommitteeDetails) },

        { path: 'riskCommittee', element: motionWrapper(RiskCommittee) },
        { path: 'riskCommittee/:cartId', element: motionWrapper(RiskCommitteeDetails) },
      ],
    },
    {
      path: 'login',
      element: motionWrapper(LoginPage),
    },
    { path: 'request', element: motionWrapper(RequestPage) },

    {
      path: '404',
      element: motionWrapper(Page404),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>{routes}</motion.div>
    </AnimatePresence>
  );
}
