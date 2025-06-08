import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import AuthController from "../controllers/authController";
import { toast } from "react-toastify";
import { ErrorToast } from "../components/Toasts";
import { isAxiosError } from "axios";
import UserController from "../controllers/UserController";
import type User from "../model/User";
import { useNavigate } from "react-router";
import { registerClearUserFunction } from "../helpers/logout";

type LoginProps = {
  username: string;
  password: string;
};

type AuthContextType = {
  login: ({ username, password }: LoginProps) => Promise<boolean>;
  refresh: () => Promise<boolean>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await UserController.currentUser();
      setUser(response);
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
          await refresh();
          const response = await UserController.currentUser();
          setUser(response);
        } catch (refreshError) {
          setUser(null);
        }
      } else {
        console.error("Error fetching user", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    registerClearUserFunction(() => {
      setUser(null);
      navigate("/login");
    });
  }, []);

  const login = async ({
    username,
    password,
  }: LoginProps): Promise<boolean> => {
    try {
      await AuthController.login({
        username: username,
        password: password,
      });
      fetchCurrentUser();
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        if (error.code == "ERR_NETWORK") {
          toast.error(
            <ErrorToast message={"Network Error Please Try Again"} />
          );
        } else {
          toast.error(<ErrorToast message={error.response?.data.message} />);
        }
      } else if (error instanceof Error) {
        toast.error(<ErrorToast message={error.message} />);
      } else {
        toast.error(<ErrorToast message="Unkown Error Occured" />);
      }
      return false;
    }
  };

  const refresh = async () => {
    try {
      await AuthController.refreshToken();
      setLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(<ErrorToast message={error.response?.data.detail} />);
      } else if (error instanceof Error) {
        toast.error(<ErrorToast message={error.message} />);
      } else {
        toast.error(<ErrorToast message="Unkown Error Occured" />);
      }
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthController.logout();
      navigate("/login");
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(<ErrorToast message={error.response?.data.detail} />);
      } else if (error instanceof Error) {
        toast.error(<ErrorToast message={error.message} />);
      } else {
        toast.error(<ErrorToast message="Unkown Error Occured" />);
      }
    } finally {
    }
  };

  const value: AuthContextType = { user, login, logout, loading, refresh };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
