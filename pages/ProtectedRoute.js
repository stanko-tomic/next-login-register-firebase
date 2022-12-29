import { useRouter } from "next/router";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const router = useRouter();
    const { user } = UserAuth();

    if (!user) router.push("/");

    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};

export default ProtectedRoute;
