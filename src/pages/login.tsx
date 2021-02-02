import { LoginForm } from "@components"
import React from "react"

interface Props { }

const Login: React.FC<Props> = (): JSX.Element => {
    return (
        <LoginForm title="Login" isAdmin={false} heading="Login" />
    )
}

export default Login