import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import '../../../assets/css/styles.css';

export const UserDetail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${Global.url}user/profile/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem("token")
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                } else {
                    setError(data.message || 'Failed to fetch user details.');
                }
            } catch (error) {
                setError('Network error or server is unreachable.');
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header className="user-detail__header">
                <h1>Detalles de usuario</h1>
            </header>
            <div className="user-detail__container">
                <div className="user-detail__info">
                    <div className="user-detail__text">
                        <span className="user-detail__label">Nombre: </span>{user.name} {user.surname}
                    </div>
                    <div className="user-detail__text">
                        <span className="user-detail__label">Nickname: </span>{user.nick}
                    </div>
                    <div className="user-detail__text">
                        <span className="user-detail__label">Email: </span>{user.email}
                    </div>
                    <div className="user-detail__text">
                        <span className="user-detail__label">Bio: </span>{user.bio}
                    </div>
                    <div className="user-detail__text">
                        <span className="user-detail__label">Role: </span>{user.role}
                    </div>
                </div>
                <div className="user-detail__actions">
                    <button className="user-detail__button" onClick={() => navigate(`/admin/usuarios/actualizar/${user._id}`)}>Actualizar</button>
                    <button className="user-detail__button" onClick={() => navigate(-1)}>Volver al listado</button>
                </div>
            </div>
        </>
    );
};
