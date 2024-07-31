import React, {useEffect, useRef, useState} from 'react';
import "./ContactForm.scss"
import {Button, TextField} from "@mui/material";
import {listApi} from "../../redux/api/listApi";
import {setNewContactId} from "../../redux/reducers/listReducer";
import {useDispatch} from "react-redux";

const ContactForm = () => {
    const [createContact, {isLoading, isSuccess, error,data}] = listApi.useCreateContactMutation()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errorText, setErrorText] = useState('')
    const dispatch=useDispatch()
    const create = async () => {
        const contact = {
            fields: {
                'first name': [{value: firstName, modifier: ""}],
                'last name': [{value: lastName, modifier: ""}],
                email: [{label: 'email', value: email, modifier: ""}]
            },
            record_type: 'person',
            privacy: {
                edit: null,
                read: null,
            },
            owner_id: null,

        }
        await createContact(contact)
        if (!error) {
            setFirstName('')
            setLastName('')
            setEmail('')
            dispatch(setNewContactId(data?.id))

        }
    }
    useEffect(() => {
        if (error){
             setErrorText(error?.data?.human_readable_error)
        }else if (isSuccess) {
            setFirstName('')
            setLastName('')
            setEmail('')
            dispatch(setNewContactId(data?.id))
            setErrorText('')
        }

    }, [error,isSuccess]);


    return (
        <div className="formContainer">
            <p className={"title"}>Create Contact</p>
            <TextField error={errorText?.includes('first name')} label="First Name" variant="outlined" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}/>
            <TextField error={errorText?.includes('last name')} label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <TextField error={errorText?.includes('email')} label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Button variant="contained" onClick={create} disabled={isLoading} >Contained</Button>
            <p className="error">{errorText}</p>
        </div>
    );
};

export default ContactForm;
