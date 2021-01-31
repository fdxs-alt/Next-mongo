import React, { createContext, useContext, useState } from "react";

export interface User {
    nick: string;
    email: string;
    _id: string;
    role: "ADMIN" | "USER"
}
interface Props {
    initalUser: User;
    children: React.ReactNode
}

const AuthCtx = createContext<{ user: User }>({} as { user: User });


const AuthCtxProvider: React.FC<Props> = ({ initalUser, children }) => {
    const [user, setUser] = useState(initalUser ? initalUser : {} as User)


    return <AuthCtx.Provider value={{ user }}>
        {children}
    </AuthCtx.Provider>
}

export default AuthCtxProvider;

const useAuthCtx = () => { return useContext(AuthCtx) }

export { useAuthCtx }