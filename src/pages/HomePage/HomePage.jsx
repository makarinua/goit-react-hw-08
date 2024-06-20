import css from './HomePage.module.css'

export default function HomePage() {
    return (
        <div>
            <h1 className={css.title}>Головна сторінка електронної книги контактів.</h1>
            <p className={css.description}>Для отримання повного функціоналу зареєструйтеся та зайдіть до власного кабінету.</p>
        </div>
    )
}