import { useState, useEffect, useContext } from 'react'
import { Layout } from 'components/Layout'
import { AuthContext } from 'contexts/authContext';

export const Register = () => {
    const [error, setError] = useState(null);
    const [form, setForm] = useState({})
    const { register } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.password2) {
            setError('Las contraseñas no coinciden');
            return;
        } else {
            setError(null);
        };

        const response = await register(form);
        const error = response?.error || response?.data?.error || response?.response?.data?.error;
        if (error && typeof error === 'string') {
            setError(error);
        } else {
            setError(null);
        };
    };

    return (
        <Layout>
            <div className="bg-grey-lighter mt-20 flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Cree una cuenta</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            placeholder="Nombre completo"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="phone"
                            placeholder="Telefono"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="username"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password2"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 bg-blue-500"
                            id="register"
                            onClick={handleSubmit}
                        >
                            Registrarse
                        </button>
                    </div>
                    <div className="text-grey-dark mt-6">
                        {"Ya tienes una cuenta? "}
                        <a className="no-underline border-b border-blue text-blue" href="/login">
                            Login
                        </a>
                    </div>
                    {error &&
                        <div className="text-red-500 text-center mb-4" id="error">
                            <span className="block">
                                <span className="block" id="error-message">{error}</span>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}
