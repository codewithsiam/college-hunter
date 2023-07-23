import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAdmissions = () => {
    const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access-token');
    const {data: admissions = [], isLoading, refetch} = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['admissions'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/admissions?email=${user?.email}`);
            return res.json();
        }
    })

    return [admissions, refetch, isLoading ]
}

export default useAdmissions;