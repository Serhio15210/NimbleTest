import {useForm} from "@tanstack/react-form";
import {useCreateContactMutation} from "../../../redux/api/listApi";
import {useState} from "react";

export const useContactForm = () => {
    const [createContact, {isLoading, isSuccess, error, data}] = useCreateContactMutation()
    const [errorText, setErrorText] = useState('')
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: ''
        },
        onSubmit: async ({value}) => {
            await create(value)
        },

    })
    const emailValidator = (value) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
            return 'Email is required';
        } else if (!emailPattern.test(value + '')) {
            return 'Invalid email format';
        }
        return undefined;
    }
    const firstNameValidator = (value) => {
        return value.length < 2 ? 'First name must be 2 or more symbols' : undefined
    }
    const lastNameValidator = (value) => {
        return value.length < 3 ? 'Last name must be 3 or more symbols' : undefined
    }
    const create = async (value) => {
        const contact = {
            fields: {
                'first name': [{value: value.firstName, modifier: ""}],
                'last name': [{value: value.lastName, modifier: ""}],
                email: [{label: 'email', value: value.email, modifier: ""}]
            },
            record_type: 'person',
            privacy: {
                edit: null,
                read: null,
            },
            owner_id: null,

        }
        await createContact(contact)

    }
    return {
        form,
        emailValidator,
        firstNameValidator,
        lastNameValidator,
        errorText,
        isLoading,
        isSuccess,
        setErrorText,
        data,
        error
    }
}
