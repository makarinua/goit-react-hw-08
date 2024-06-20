import { Formik, Form, Field } from 'formik'
import { useId } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "formik"
import { useDispatch } from "react-redux"
import css from './ContactForm.module.css'
import {addContact} from '../../redux/contacts/operations'

export default function ContactForm() {
    const nameId = useId()
    const telId = useId()
    const itemId = Math.random() 
    const dispatch = useDispatch()
    const ContactSchema = Yup.object().shape({
        name: Yup.string().matches(/^[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*$/, 'Name, in English letters in the form "Aleksandr Makarchuk"').min(3, '1 letter? For real?').max(50, 'Name is too long').required('Enter the name please'),
        number: Yup.string().matches(/^\d{3}-\d{2}-\d{2}$/, 'Incorrect number: "999-99-99"').required('Enter the number please')
    })

    function submitHandler(values, actions) {
        values.id = itemId
        dispatch(addContact({ name: values.name, number: values.number }))
        actions.resetForm()
    }

    return (<Formik
            initialValues={{
                name: '',
                number: '',
            }}
        onSubmit={submitHandler}
        validationSchema={ContactSchema}
        >
            <Form className={css.container}>
                <label htmlFor={nameId}>Name</label>
            <Field className={css.input} type='text' name='name' id={nameId}></Field>
            <ErrorMessage className={css.error} name='name' component='span'></ErrorMessage>
                <label htmlFor={telId}>Number</label>
            <Field className={css.input} type='tel' name='number' id={telId} ></Field>
            <ErrorMessage className={css.error} name='number' component='span'></ErrorMessage>
                <button className={css.btn} type='submit'>Add contact</button>
            </Form>
        </Formik>)
}