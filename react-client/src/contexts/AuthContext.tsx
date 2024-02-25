import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import {User} from '../types';
import { useGoogleLogin } from "@react-oauth/google";
import {getUserByUserId, getUser, loginUser ,logoutUser, getGoogleUserData, loginWithGoogle} from "../services";


interface AuthContextProps {
    user?: User;
    isLogged: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
    clearAuth: () => void;
    updateUser: (newUser: User) => void;
    onSuccessLogin: (user: User) => void;
    googleLogin: () => void;
    authUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        authUser();
        return () => {}
    }, []);


    const authUser = async () => {
        try {
            const userid = localStorage.getItem("_id");
            let res = null;
            if (userid) {
                res = await Promise.race([getUser(), getUserByUserId(userid as string)]);
            } else {
                res = await getUser();
            }
            setUser(res.data as User);
            setIsLogged(true);
        } catch (error: any) {
            if (error?.response?.status !== 403) clearAuth();
            setIsLogged(false);
            console.error("Error fetching user data:", error);
        }
    };

    const onSuccessLogin = (user: User) => {
        localStorage.setItem("_id", user._id);
        setUser(user);
        setIsLogged(true);
    };

    const login = (username: string, password: string) => {
        loginUser({ username, password } as User).then(({ data: user}) => {
            onSuccessLogin(user);
        }).catch((error: any) => {
            clearAuth();
            console.error(error);
        });
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const googleUserData = await getGoogleUserData(codeResponse.access_token);
            const user = await loginWithGoogle(googleUserData.data)
            onSuccessLogin(user.data);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const logout = async () => {
        await logoutUser();
        clearAuth();
        setUser({} as User);
    };

    const clearAuth = () => {
        localStorage.removeItem("_id");
        setIsLogged(false);
    };

    const updateUser = (newUser: User) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLogged,
                login,
                logout,
                clearAuth,
                updateUser,
                onSuccessLogin,
                googleLogin,
                authUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
