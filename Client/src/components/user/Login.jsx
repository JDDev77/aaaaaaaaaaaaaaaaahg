import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const Login = () => {
    const { form, changed } = useForm({});
    const [status, setStatus] = useState({
        saved: false,
        message: ''
    });
    const { setAuth } = useAuth();

    const loginUser = async (e) => {
        e.preventDefault();
        let userToLogin = form;

        try {
            const request = await fetch(`${Global.url}user/login`, {
                method: "POST",
                body: JSON.stringify(userToLogin),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await request.json();

            if (data.status === 'success') {
                setStatus({
                    saved: true,
                    message: 'Usuario logueado correctamente'
                });
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setAuth(data.user);

                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                setStatus({
                    saved: false,
                    message: data.message || 'Error al intentar loguearse'
                });
            }
        } catch (error) {
            setStatus({
                saved: false,
                message: 'Error de conexión con el servidor'
            });
        }
    };

    return (
        <div className="center-content">
            <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
            </header>

            <div className="content__posts">
                <strong className={`alert ${status.saved ? 'alert-success' : 'alert-danger'}`}>
                    {status.message}
                </strong>
                <form className="form-login" onSubmit={loginUser}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={changed} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>
                    <input type="submit" value="Identifícate" className="btn btn-success" />
                </form>
            </div>
        </div>
    );
}

export default Login;
