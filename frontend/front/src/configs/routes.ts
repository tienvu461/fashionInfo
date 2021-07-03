/* eslint-disable import/no-unresolved */
import { lazy } from 'react';

import {
  ROUTE_FORUM,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_FORGOTPASSWORD,
  ROUTE_MAGAZINE_DETAIL,
  ROUTE_PHOTO,
  ROUTE_PHOTO_SEARCH,
  ROUTE_REGISTER
} from 'src/constants';
import ForumPage from 'src/pages/ForumPage';
import LoginPage from 'src/pages/LoginPage';
import ForgotPassword from 'src/pages/ForgotPasswordPage';
import NotFound from 'src/pages/NotFound';
import RegisterPage from 'src/pages/Register';
import DetailPhoto from 'src/pages/PhotoPage/components/Detail';
import DetailMagazine from 'src/pages/MagaginzePage/components/Detail';
import PhotoSearchPage from 'src/pages/PhotoSearchPage';
import ChangePassword from 'src/pages/ChangePassswordPage';

const MagazinePage = lazy(() => import('../pages/MagaginzePage'));
const PhotoPage = lazy(() => import('../pages/PhotoPage'));

export const routes = [
  {
    path: ROUTE_HOME,
    component: MagazinePage,
    exact: true,
  },
  {
    path: `${ROUTE_MAGAZINE_DETAIL}/:id`,
    component: DetailMagazine,
    exact: true,
  },
  {
    path: ROUTE_PHOTO,
    component: PhotoPage,
    exact: true,
  },
  {
    path: `${ROUTE_PHOTO}/:id`,
    component: DetailPhoto,
    exact: true,
  },
  {
    path: ROUTE_FORUM,
    component: ForumPage,
    exact: true,
  },
  {
    path: ROUTE_LOGIN,
    component: LoginPage,
    exact: true,
  },
  {
    path: ROUTE_REGISTER,
    component: RegisterPage,
    exact: true,
  },
  {
    path: ROUTE_FORGOTPASSWORD,
    component: ForgotPassword,
    exact: true,
  },
  {
    path: ROUTE_PHOTO_SEARCH,
    component: PhotoSearchPage,
    exact: true,
  },
  {
    path: '/user/reset_password_confirm/:uid/:token', // path changePW page render when active email
    component: ChangePassword,
    exact: true,
  },
  {
    component: NotFound,
    exact: false,
  },
];
