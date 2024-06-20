import { Form, Formik, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import css from './LoginForm.module.css'
import { login } from '../../redux/auth/operations'

export default function LogInMenu() {
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Введіть валідний Еmail').required('Введіть Ваш Еmail'),
        password: Yup.string().min(7, 'мініміу 7 символів').max(15, 'максимум 15 символів').required('Введіть пароль'),
      })
    
    function submitHandler(values, actions) {
        dispatch(login({ email: values.email, password: values.password }))
            actions.resetForm()
    }

    return (
        <div className={css.component}>
            <Toaster
            position="top-right"
            gutter={8}
            toastOptions={{
            className: '',
            duration: 1500,
            style: {
             background: '#363636',
             color: '#fff',
                }
            }}
            />
            <p className={css.description}>Введіть Ваш логін та пароль</p>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={validationSchema}
            >
                <Form className={css.container}>
                    <label>Email:<br/>
                        <Field type='email' name='email' required></Field>
                        <ErrorMessage className={css.error} name='email' component='span'></ErrorMessage>
                    </label>
                    <label>Password:<br/>
                        <Field type='password' name='password' required></Field>
                        <ErrorMessage className={css.error} name='password' component='span'></ErrorMessage>
                    </label>
                    <button type='submit' >Log In</button>
                </Form>
            </Formik>
        </div>
    )
}