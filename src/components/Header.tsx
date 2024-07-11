import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <button className="border-2 rounded m-2 p-2 hover:bg-sky-200">
                <Link to="/loginpage"> Login Page</Link>
            </button>
        </div>
    );
}
