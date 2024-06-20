import { Form, Formik, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import {register} from '../../redux/auth/operations'
import css from './RegistrationForm.module.css'

export default function RegisterMenu() {
    const dispatch = useDispatch()
    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2, 'мінімум 2 символи').max(15, 'максимум 15 символів').required('Введіть Ваше імя'),
        email: Yup.string().email('Еmail не валідний').required('Введіть Ваш Еmail'),
        password: Yup.string().min(7, 'мінімум 7 символів').max(15, 'максимум 15 символів').required('Введіть Ваш пароль'),
        passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Введені паролі не співпадають').required('Введені паролm ще раз')
    })
    
    function submitHandler(values, actions) {
        const { passwordRepeat, ...data } = values
        console.log(values)
            dispatch(register(data))
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
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={validationSchema}
            >
                <Form className={css.container}>
                    <label>Name:<br/>
                        <Field type='text' name='name'></Field>
						<ErrorMessage className={css.error} name='name' component='span'></ErrorMessage>
                    </label>
                    
                    <label>Email:<br/>
                        <Field type='email' name='email'></Field>
						<ErrorMessage className={css.error} name='email' component='span'></ErrorMessage>
                    </label>
                    
                    <label>Password:<br/>
                        <Field type='password' name='password'></Field>
						<ErrorMessage className={css.error} name='password' component='span'></ErrorMessage>
                    </label>
                    
                    <label>Repeat your password:<br/>
                        <Field type='password' name='passwordRepeat'></Field>
						<ErrorMessage className={css.error} name='passwordRepeat' component='span'></ErrorMessage>
                    </label>
                    
                    <button type='submit' >Register</button>
                </Form>
            </Formik>
        </div>
    )
}