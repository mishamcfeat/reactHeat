import { useState } from 'react';
import { useAddUserMutation } from '../store';

const LoginComponent: React.FC = () => {
    const [addUser, { isLoading, isError, isSuccess }] = useAddUserMutation();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addUser({ name, email });
        setName('');
        setEmail('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
    );
};

export default LoginComponent;
