import { useState, useEffect } from 'react';
import { UserList } from "../../user/UserList";
import Global from "../../../helpers/Global";
import { NavLink } from 'react-router-dom';

export const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (pageNum) => {
        try {
            const response = await fetch(`${Global.url}user/list2/${pageNum}`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await response.json();
            console.log(data); // Para depuración

            if (response.ok && data.users) {
                if (pageNum === 1) {
                    setUsers(data.users);
                } else {
                    setUsers(prevUsers => [...prevUsers, ...data.users]);
                }
                setFollowing(data.following || []);
                setMore(data.users.length === data.pageSize);
            } else {
                throw new Error(data.message || "Error al obtener los usuarios");
            }
        } catch (error) {
            console.error("Error al cargar los usuarios:", error.message);
            setMore(false);
        }
    };

    const handleMoreUsers = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div>
            <header className="content__header">
                <h1 className="content__title">Usuarios</h1>
                <NavLink to={"/admin/usuarios/nuevo"} className="post__button post__button--green">Agregar Nuevo Usuario</NavLink>
            </header>
            <UserList 
                users={users} 
                getUsers={fetchUsers} 
                following={following} 
                setFollowing={setFollowing} 
            />
            {more && (
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={handleMoreUsers}>
                        Ver más personas
                    </button>
                </div>
            )}
        </div>
    );
};
