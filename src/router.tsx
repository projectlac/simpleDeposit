import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//Authentication

const Login = Loader(lazy(() => import('src/content/authentication/Login')));
const ForgotPassword = Loader(
  lazy(() => import('src/content/authentication/ForgotPassword'))
);

// Pages

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));
const AddBanner = Loader(
  lazy(() => import('src/content/applications/Banner/Add'))
);
const Categories = Loader(
  lazy(() => import('src/content/applications/Categories/Table/RecentOrders'))
);
const AddCategories = Loader(
  lazy(() => import('src/content/applications/Categories/Add'))
);

const Special = Loader(
  lazy(
    () =>
      import('src/content/applications/Collections/Special/Table/RecentOrders')
  )
);
const AddSpecial = Loader(
  lazy(() => import('src/content/applications/Collections/Special/Add'))
);
const Item = Loader(
  lazy(
    () => import('src/content/applications/Collections/Item/Table/RecentOrders')
  )
);
const AddItem = Loader(
  lazy(() => import('src/content/applications/Collections/Item/Add'))
);

const FAQs = Loader(
  lazy(() => import('src/content/applications/FAQs/Table/RecentOrders'))
);
const AddFAQs = Loader(lazy(() => import('src/content/applications/FAQs/Add')));
// Applications

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const routes = (isLogin, role) => [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: isLogin ? (
          <Navigate to={`${process.env.REACT_APP_BASE_NAME}/banner`} replace />
        ) : (
          <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
        )
      },

      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'banner',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),
    children: [
      {
        path: '/',
        element: <Crypto />
      },
      {
        path: '/add',
        element: <AddBanner />
      }
    ]
  },

  {
    path: 'collections',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: (
          <Navigate
            to={`${process.env.REACT_APP_BASE_NAME}/collections/special-collections`}
            replace
          />
        )
      },
      {
        path: '/special-collections',
        element: <Special />
      },
      {
        path: '/special-collections/add',
        element: <AddSpecial />
      },
      // {
      //   path: '/groups/edit/:id',
      //   element: <EditGroups />
      // },
      {
        path: '/item',
        element: <Item />
      },
      {
        path: '/item/add',
        element: <AddItem />
      }
      // {
      //   path: '/individual/edit/:id',
      //   element: <EditIndividual />
      // }
    ]
  },
  {
    path: 'categories',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: <Categories />
      },
      {
        path: '/add',
        element: <AddCategories />
      }
      // {
      //   path: '/edit/:id',
      //   element: <EditContentPack />
      // }
    ]
  },
  {
    path: 'faqs',
    element: isLogin ? (
      <SidebarLayout />
    ) : (
      <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
    ),

    children: [
      {
        path: '/',
        element: <FAQs />
      },
      {
        path: '/add',
        element: <AddFAQs />
      }
      // {
      //   path: '/edit/:id',
      //   element: <EditSurvey />
      // }
    ]
  },
  // {
  //   path: 'user',
  //   element: isLogin ? (
  //     role === 'Admin' ? (
  //       <SidebarLayout />
  //     ) : (
  //       <Navigate
  //         to={`${process.env.REACT_APP_BASE_NAME}/dashboards`}
  //         replace
  //       />
  //     )
  //   ) : (
  //     <Navigate to={`${process.env.REACT_APP_BASE_NAME}/login`} replace />
  //   ),

  //   children: [
  //     {
  //       path: '/',
  //       element: <User />
  //     },
  //     {
  //       path: '/add',
  //       element: <AddUser />
  //     },
  //     {
  //       path: '/edit/:id',
  //       element: <EditUser />
  //     }
  //   ]
  // },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />
  }
];

export default routes;
