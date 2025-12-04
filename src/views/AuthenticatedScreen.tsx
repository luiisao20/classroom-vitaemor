import { Outlet } from "react-router";
import { LoaderComponent } from "../components/general/LoaderComponent";
import { useAuthStore } from "../presentation/store/useAuthStore";
import { useUser } from "../presentation/user/useUser";
import { NavbarComponent } from "../components/navigation/NavbarComponent";

export const AuthenticatedScreen = () => {
  const { user } = useAuthStore();

  const { userQuery } = useUser(user?.id);

  return (
    <div>
      {userQuery.isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <NavbarComponent />
          <div className="px-4 my-2 md:px-0 md:w-1/2 mx-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
