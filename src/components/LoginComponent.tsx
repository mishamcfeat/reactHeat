import { useState } from 'react';
import { useAddUserMutation, useLoginUserMutation } from '../store';

const LoginComponent: React.FC = () => {
    const [addUser, { isLoading, isError, isSuccess }] = useAddUserMutation();
    const [loginUser, { loginisLoading, loginisError, loginisSuccess }] = useLoginUserMutation();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        // needs to be encrypted client side?
        await addUser({ name, email, password });
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSignup}>
                    <div>
                        <label>Input Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Input Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding User...' : 'Add User'}
                    </button>
                </form>
                {isError && <div>Error adding user</div>}
                {isSuccess && <div>User added successfully!</div>}
            </div>
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Input Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Input Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding User...' : 'Add User'}
                    </button>
                </form>
                {isError && <div>Error adding user</div>}
                {isSuccess && <div>User added successfully!</div>}

            </div>
        </div>
    );
};

export default LoginComponent;
