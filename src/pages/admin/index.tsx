import { LoginForm } from '@components'
import React from 'react'

interface Props { }

const AdminHome: React.FC<Props> = (): JSX.Element => {
    return (
        <LoginForm title="Admin panel" isAdmin={true} heading="Admin panel" />
    )
}

export default AdminHome