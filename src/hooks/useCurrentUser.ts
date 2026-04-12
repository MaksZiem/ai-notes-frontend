import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

export function useCurrentUser() {
  const { token } = useAuth();

  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/whoami");
      return data;
    },
    enabled: !!token,
    staleTime: 5 * 60_000,
  });
}
