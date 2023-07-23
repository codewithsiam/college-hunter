import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    
        const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
            enabled: !loading && !!user?.email,
            queryKey: ['isAdmin', user?.email],
            queryFn: async () => {
                // const token = localStorage.getItem('access-token');
                const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/users/admin/${user?.email}`);
                return res.data.admin;
            }
        })
        return [isAdmin, isAdminLoading]

}
export default useAdmin;