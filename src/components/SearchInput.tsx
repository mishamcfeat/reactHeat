import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscSearch } from 'react-icons/vsc';

const LoginComponent: React.FC = () => {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?term=${term}`)

    };

    return (
        <form onSubmit={handleSubmit} className="rounded border-2 w-1/4 m-4 p-1" >
            <div className="relative">
                <div className="absolute rounded inset-y-0 flex items-center pl-2">
                    <VscSearch className="h-4 w-4 text-gray-500" />
                </div>
                <input className="w-full rounded pl-10 py-1 border-0 shadow-none"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    placeholder="Search Foods"
                />
            </div>
        </form>
    )





}

export default LoginComponent;
