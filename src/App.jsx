import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Skeleton } from "./components/ui/skeleton";
function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  // Check if Clerk has finished loading the user data
  if (!isLoaded) {
    return <center className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </center>; // Display a loader while checking auth status
  }

  // Redirect to sign-in page if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/auth/signpage" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
