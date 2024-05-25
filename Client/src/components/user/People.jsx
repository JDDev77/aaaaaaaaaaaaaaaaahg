import { useEffect, useState } from "react"
import Global from "../../helpers/Global"
import { UserList } from "./UserList"

//TODO revisar como hacer que tu propio usuario no aparezca en el listado
export const People = () => {

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)
    const [following, setFollowing] = useState([])


    useEffect(() => {
        getUsers(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getUsers = async (nextPage) => {
        //Efecto de carga

        //Peticion para sacar usuarios
        const request = await fetch(Global.url + 'user/list/' + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json()
        console.log(data)

        //Crear un estado para poder listarlos
        if (data.users && data.status == "success") {
            let newUsers = data.users

            if (users.length >= 1) {
                newUsers = [...users, ...data.users]
            }

            setUsers(newUsers)
            console.log(users)
            setFollowing(data.user_following)

        }
        // Paginacion
        if (users.length >= data.total) {
            setMore(false)
        }
    }

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        console.log(page)
        getUsers(next)
        console.log(page, users)
        console.log(page, next)
        console.log(following)
    }

    //TODO meter la targeta del mismo usuario en primer lugar 
    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Entrelazados</h1>
            </header>
            <UserList users={users}
                getUsers={setUsers}
                following={following}
                setFollowing={setFollowing}
                page={page}
                setPage={setPage}
                more={more} />
            <br />
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver más personas
                    </button>
                </div>
            }
        </>
    )
}
