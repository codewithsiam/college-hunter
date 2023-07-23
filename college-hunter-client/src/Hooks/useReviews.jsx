import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useReviews = () => {
    const {user, loading} = useContext(AuthContext);
    // const token = localStorage.getItem('access-token');
    const {data: reviews = [], isLoading, refetch} = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/reviews`);
            return res.json();
        }
    })

    return [reviews, refetch, isLoading ]
}

export default useReviews;