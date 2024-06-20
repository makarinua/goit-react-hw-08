import { useSelector, useDispatch } from "react-redux"
import { selectUser } from '../../redux/auth/selectors'
import { logout } from "../../redux/auth/operations"
import css from './UserMenu.module.css'

export default function UserMenu() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    function clickHandler() {
        dispatch(logout())
    }

    return (
        <div className={css.container}>
            <p>Вітаємо {user.name} в телефонному довіднику. <br/> Ваш Email: {user.email}</p>
            <button onClick={clickHandler} >Вийти</button>
        </div>
    )
}