import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = (props) => {
    const token = localStorage.getItem("user");
    const navigate = useNavigate();

    console.log(token);


    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
        }

    }, [token])



    return <Outlet {...props} />;

};

export default ProtectedRoute;