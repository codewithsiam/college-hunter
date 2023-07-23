import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useUsers = () => {
    const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access-token');
    const {data: dbUsers = [], isLoading, refetch} = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['dbUsers'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/manageUsers`);
            return res.json();
        }
    })

    return [dbUsers, refetch, isLoading ]
}

export default useUsers;