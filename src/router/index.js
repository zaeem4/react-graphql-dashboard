import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

import { LoggedIn } from 'src/gaurds/LoggedIn';
import { Authorized } from 'src/gaurds/Authorized';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Login = Loader(lazy(() => import('src/content/pages/Static/Login')));

// Dashboards

const Home = Loader(lazy(() => import('src/content/pages/dashboard/Home')));
const Users = Loader(lazy(() => import('src/content/pages/dashboard/Users')));
const Withdrawals = Loader(lazy(() => import('src/content/pages/dashboard/Withdrawals')));
const Nfts = Loader(lazy(() => import('src/content/pages/dashboard/Nfts')));
const Referrals = Loader(lazy(() => import('src/content/pages/dashboard/Referrals')));
const UserProfile = Loader(lazy(() => import('src/content/pages/dashboard/UserProfile')));
const UpdateProfitParticipation = Loader(lazy(() => import('src/content/pages/dashboard/ProfitParticipation/Update')));
const AddMinePerformance = Loader(lazy(() => import('src/content/pages/dashboard/MinePerformance/Add')));
const GrowthEnabler=Loader(lazy(()=>import('src/content/pages/dashboard/GrowthEnabler')));
const Notification = Loader(lazy(()=>import('src/content/pages/dashboard/Notifications')));
// const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));
// const Messenger = Loader(lazy(() => import('src/content/applications/Messenger')));
// const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
// const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
// const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));

// Components

// const Buttons = Loader(lazy(() => import('src/components/Buttons')));
// const Modals = Loader(lazy(() => import('src/components/Modals')));
// const Accordions = Loader(lazy(() => import('src/components/Accordions')));
// const Tabs = Loader(lazy(() => import('src/components/Tabs')));
// const Badges = Loader(lazy(() => import('src/components/Badges')));
// const Tooltips = Loader(lazy(() => import('src/components/Tooltips')));
// const Avatars = Loader(lazy(() => import('src/components/Avatars')));
// const Cards = Loader(lazy(() => import('src/components/Cards')));
// const Forms = Loader(lazy(() => import('src/components/Forms')));

// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));

const Router = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" />
      },
      {
        path: '/login',
        element: <LoggedIn />,
        children: [
          {
            path: '',
            element: <Login />
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Authorized />,
    children: [
      {
        path: '',
        element: <Navigate to="home" replace />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'referrals',
        children: [
          {
            path: '',
            element: <Navigate to="lists" replace />
          },
          {
            path: 'lists',
            element: <Referrals />
          }
        ]
      },
      {
        path: 'withdrawals',
        children: [
          {
            path: '',
            element: <Navigate to="lists" replace />
          },
          {
            path: 'lists',
            element: <Withdrawals />
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: <Navigate to="lists" replace />
          },
          {
            path: 'lists',
            element: <Users />
          },
          {
            path: 'user-profile',
            element: <UserProfile />
          }
        ]
      },
      {
        path: 'nfts',
        children: [
          {
            path: '',
            element: <Navigate to="lists" replace />
          },
          {
            path: 'lists',
            element: <Nfts />
          }
        ]
      },
      {
        path: 'profit-participations',
        children: [
          {
            path: '',
            element: <Navigate to="add" replace />
          },
          {
            path: 'add',
            element: <UpdateProfitParticipation />
          }
        ]
      },
      {
        path: 'mine-performances',
        children: [
          {
            path: '',
            element: <Navigate to="update" replace />
          },
          {
            path: 'update',
            element: <AddMinePerformance />
          }
        ]
      },
      {
        path: 'growth-enabler',
        children: [   
          {
            path: '',
            element: <Navigate to="list" replace />
          },     
          {
            path: 'list',
            element: <GrowthEnabler />
          }
        ]
      },
      {
        path: 'notification',
        children: [   
          {
            path: '',
            element: <Navigate to="list" replace />
          },     
          {
            path: 'list',
            element: <Notification />
          }
        ]
      },
    ]
  }
];

export default Router;
