import React from 'react';

function Login({
	login,
}: {
	login: (username: string, password: string) => Promise<void>;
}) {
    const handleSubmit = () => {
        
    };
	return <form onSubmit={handleSubmit}></form>;
}

export default Login;
