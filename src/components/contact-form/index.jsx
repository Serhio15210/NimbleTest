import React, {useEffect} from 'react';
import "./ContactForm.scss"
import {Button, TextField} from "@mui/material";
import {setNewContactId} from "../../redux/reducers/listReducer";
import {useDispatch} from "react-redux";
import {useContactForm} from "./hooks/use-contact-form";

const ContactForm = () => {
    const dispatch = useDispatch()
    const {
        form,
        emailValidator,
        lastNameValidator,
        firstNameValidator,
        isLoading,
        errorText,
        isSuccess, setErrorText,
        data, error
    } = useContactForm()

    useEffect(() => {
        if (error) {
            setErrorText(error?.data?.human_readable_error)
        } else if (isSuccess) {
            dispatch(setNewContactId(data?.id))
            setErrorText('')
        }

    }, [error, isSuccess]);


    return (
        <div>
            <p className={"title"}>Create Contact</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="formContainer"
            >
                <form.Field
                    name="firstName"
                    validators={{
                        onSubmit: ({value}) => firstNameValidator(value)
                    }}
                    children={(field) => (
                        <div className="field">
                            <TextField
                                error={errorText?.includes('first name') || field.state.meta.errors.length}
                                label="First Name"
                                variant="outlined"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}/>
                            {field.state.meta.errors.length > 0 ? (
                                <em role="alert">{field.state.meta.errors.join(', ')}</em>
                            ) : null}
                        </div>

                    )}

                />
                <form.Field
                    name="lastName"
                    validators={{
                        onSubmit: ({value}) => lastNameValidator(value)
                    }}
                    children={(field) => (
                        <div className="field">
                            <TextField error={errorText?.includes('last name')}
                                       label="Last Name"
                                       variant="outlined"
                                       value={field.state.value}
                                       onBlur={field.handleBlur}
                                       onChange={(e) => field.handleChange(e.target.value)}/>
                            {field.state.meta.errors.length > 0 ? (
                                <em role="alert">{field.state.meta.errors.join(', ')}</em>
                            ) : null}
                        </div>

                    )}
                />
                <form.Field
                    name="email"
                    validators={{
                        onSubmit: ({value}) => emailValidator(value),
                    }}
                    children={(field) => (
                        <div className="field">
                            <TextField error={errorText?.includes('email')}
                                       label="Email"
                                       variant="outlined"
                                       value={field.state.value}
                                       onBlur={field.handleBlur}
                                       onChange={(e) => field.handleChange(e.target.value)}/>
                            {field.state.meta.errors.length > 0 ? (
                                <em role="alert">{field.state.meta.errors.join(', ')}</em>
                            ) : null}
                        </div>
                    )}
                />

                <Button variant="contained" type="submit" disabled={isLoading}>Contained</Button>
            </form>

            <em role="alert">{errorText}</em>
        </div>
    );
}
;

export default ContactForm;
