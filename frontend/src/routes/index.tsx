import Navbar from "#/components/Navbar";
import useAuthReq from "#/lib/hooks/useAuthReq";
import useUserSync from "#/lib/hooks/useUserSync";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;
  return (
    <div className="">
      <Navbar />
    </div>
  );
}
