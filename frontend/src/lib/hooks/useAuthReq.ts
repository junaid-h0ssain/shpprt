import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect } from "react";
import { api } from "../api";

function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
