import {Navigate, useRoutes} from 'react-router-dom'
import DashboardLayout from '../layout/dashboard/DashboardLayout.tsx'

import {ComponentType, lazy, PropsWithChildren, Suspense} from 'react'
import LoadingScreen from "../components/LoadingScreen.tsx";
import {DEFAULT_PATH} from "../config.ts";
import AuthLayout from "../layout/auth";


const Loadable = (Component: ComponentType) => {
    return (props: PropsWithChildren<any>) => (
        <Suspense fallback={<LoadingScreen/>}>
            <Component {...props} />
        </Suspense>
    )
}
export default function Router() {
    return useRoutes([
        {
            path: "/auth",
            element: <AuthLayout/>,
            children: [
                {path: "login", element: <LoginPage/>},
                {path: "register", element: <RegisterPage/>},
                {path: "reset-password", element: <ResetPasswordPage/>},
                {path: "new-password", element: <NewPasswordPage/>},
                {path: "verify", element: <VerifyPage/>},
            ],
        },
        {
            path: '/',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to={DEFAULT_PATH} replace/>, index: true},
                {path: 'app', element: <GeneralApp/>},
                {path: 'chat/:id', element: <GeneralApp/>},
                {path: "friends", element: <Friends/>},
                {path: "Settings", element: <Settings/>},
                // {path: "conversation/:id", element: <Conversation/>},
                // { path: "chats", element: <Chats /> },
                // { path: "contact", element: <Contact /> },
                {path: "profile", element: <Profile/>},
                //
                // {path: "call", element: <CallPage />},
                {path: "404", element: <Page404/>},
                {path: '*', element: <Navigate to='/404' replace/>}
            ]
        },

        {path: '*', element: <Navigate to='/404' replace/>}
    ])
}

const Profile = Loadable(
    lazy(() => import("../pages/dashboard/Settings/Profile"))
);
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')))
const Friends = Loadable(lazy(() => import('../pages/dashboard/Friends')))
const LoginPage = Loadable(lazy(() => import('../pages/auth/Login.tsx')))
const RegisterPage = Loadable(lazy(() => import('../pages/auth/Register.tsx')))
const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPassword.tsx')))
const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPassword.tsx')))
const VerifyPage = Loadable(lazy(() => import('../pages/auth/Verify.tsx')))
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp.tsx')))
const Page404 = Loadable(lazy(() => import("../pages/Page404")));