import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Forgotpassword from '../pages/Forgotpassword';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path:'/login',
                element: <Login />
            },
            {
                path: '/forgotpassword',
                element: <Forgotpassword />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    }
])

export default router;