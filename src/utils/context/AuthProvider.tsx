import React from 'react';

interface AuthUser {
    email: string;
    nome: string;
    foto?: string;
    cpf?: string;
    telefone?: string;
    dataNascimento?: string;
    genero?: string;
}

interface StoredUser extends AuthUser {
    senha: string;
}

type ProfileData = Pick<AuthUser, 'nome' | 'email' | 'cpf' | 'telefone' | 'dataNascimento' | 'genero'>;

interface AuthContextProps {
    user: AuthUser | null;
    register: (email: string, nome: string, senha: string) => boolean;
    login: (email: string, senha: string) => boolean;
    logout: () => void;
    updateProfile: (data: ProfileData) => boolean;
    changePassword: (senhaAtual: string, novaSenha: string) => boolean;
    updatePhoto: (foto: string) => void;
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

const toAuthUser = (stored: StoredUser): AuthUser => {
    const {senha: _senha, ...user} = stored;
    return user;
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

        setUser(toAuthUser(found));
        return true;
    };

    const logout = () => setUser(null);

    const updateProfile = (data: ProfileData) => {
        if (!user) return false;

        const users = getStoredUsers();
        if (users.some((stored) => stored.email === data.email && stored.email !== user.email)) return false;

        const users_atualizados = users.map((stored) => stored.email === user.email ? {...stored, ...data} : stored);
        localStorage.setItem(USERS_KEY, JSON.stringify(users_atualizados));
        setUser({...user, ...data});
        return true;
    };

    const changePassword = (senhaAtual: string, novaSenha: string) => {
        if (!user) return false;

        const users = getStoredUsers();
        const found = users.find((stored) => stored.email === user.email);
        if (!found || found.senha !== senhaAtual) return false;

        const users_atualizados = users.map((stored) => stored.email === user.email ? {...stored, senha: novaSenha} : stored);
        localStorage.setItem(USERS_KEY, JSON.stringify(users_atualizados));
        return true;
    };

    const updatePhoto = (foto: string) => {
        if (!user) return;

        const users = getStoredUsers();
        const users_atualizados = users.map((stored) => stored.email === user.email ? {...stored, foto} : stored);
        localStorage.setItem(USERS_KEY, JSON.stringify(users_atualizados));
        setUser({...user, foto});
    };

    return (
        <AuthContext.Provider value={{user, register, login, logout, updateProfile, changePassword, updatePhoto}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
