import React, { useState, useEffect, useRef } from 'react';
import { useLoginUserMutation } from '../store';
import Button from './Button';
import { setUser } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import './LoginComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginComponent: React.FC = () => {
    const [loginUser, { isError, isSuccess, isLoading }] = useLoginUserMutation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const containerRef = useRef<HTMLDivElement>(null);
    const registerBtnRef = useRef<HTMLButtonElement>(null);
    const loginBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const registerBtn = registerBtnRef.current;
        const loginBtn = loginBtnRef.current;
        const container = containerRef.current;

        if (registerBtn && loginBtn && container) {
            const addClass = () => container.classList.add("active");
            const removeClass = () => container.classList.remove("active");

            registerBtn.addEventListener('click', addClass);
            loginBtn.addEventListener('click', removeClass);

            return () => {
                registerBtn.removeEventListener('click', addClass);
                loginBtn.removeEventListener('click', removeClass);
            };
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { message, user } = await loginUser({ email, password }).unwrap();
            dispatch(setUser(user));
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Failed to log in', error);
        }
    };

    return (
        <div className="container" id="container" ref={containerRef}>
            <div className="form-container sign-up">
                <form className="form" onSubmit={handleLogin}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    </div>
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        required
                    />
                    <Button type="submit">Sign Up</Button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form className="form" onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fa-brands fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    </div>
                    <span>or use your email password</span>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        required
                    />
                    <a href="#">Forget Your Password?</a>
                    <Button type="submit">Sign In</Button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Sign up Now!</h1>
                        <p>Please enter your personal details to order your food at the touch of a button</p>
                        <button id="login" ref={loginBtnRef}>Log In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Craving Food? Enter your personal details and find the best restaurants that deliver</p>
                        <button id="register" ref={registerBtnRef}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
