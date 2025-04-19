
import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/service',
                element: <>Service</>
            },
            {
                path: '/service/:id',
                element: <>service</>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/service/${params.id}`)
            },

        ]
    }
])

export default router;
