import React from 'react';

interface AuthUser {
    email: string;
    nome: string;
}

interface StoredUser extends AuthUser {
    senha: string;
}

interface AuthContextProps {
    user: AuthUser | null;
    register: (email: string, nome: string, senha: string) => boolean;
    login: (email: string, senha: string) => boolean;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

const USERS_KEY = 'beeverage-auth-users';
const SESSION_KEY = 'beeverage-auth-session';

const getStoredUsers = (): StoredUser[] => {
    try {
        const stored = localStorage.getItem(USERS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const AuthProvider = ({children}: React.PropsWithChildren) => {
    const [user, setUser] = React.useState<AuthUser | null>(() => {
        try {
            const stored = localStorage.getItem(SESSION_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    React.useEffect(() => {
        if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        else localStorage.removeItem(SESSION_KEY);
    }, [user]);

    const register = (email: string, nome: string, senha: string) => {
        const users = getStoredUsers();

        if (users.some((stored) => stored.email === email)) return false;

        const users_atualizados = [...users, {email, nome, senha}];
        localStorage.setItem(USERS_KEY, JSON.stringify(users_atualizados));
        setUser({email, nome});
        return true;
    };

    const login = (email: string, senha: string) => {
        const users = getStoredUsers();
        const found = users.find((stored) => stored.email === email && stored.senha === senha);

        if (!found) return false;

        setUser({email: found.email, nome: found.nome});
        return true;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
