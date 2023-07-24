import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAllCollege = () => {
    // const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access-token');
    const {data: colleges = [], isLoading, refetch} = useQuery({
        queryKey: ['colleges'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges`);
            return res.json();
        }
    })

    return [colleges, refetch, isLoading ]
}

export default useAllCollege;