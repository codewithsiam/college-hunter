import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useProfile = () => {
    const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access-token');
    const {data: dbUser = [], isLoading, refetch} = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['dbUser'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users?email=${user?.email}`);
            return res.json();
        }
    })

    return [dbUser, refetch, isLoading ]
}

export default useProfile;