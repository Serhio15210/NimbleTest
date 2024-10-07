import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "../../styles/pages/contact-page/ContactPage.scss"
import {listApi, useGetContactQuery} from "../../redux/api/listApi";
import Tag from "../../components/tag";
import Layout from "../../components/layout/page";
import {Button, TextField} from "@mui/material";
import {setNewContactId} from "../../redux/reducers/listReducer";

const ContactPage = () => {
    const params = useParams()
    const {data, isLoading} = useGetContactQuery(params.id);
    const [addTag, {isLoading: isTaging, isSuccess, error}] = listApi.useAddTegToContactMutation()
    const contact = data?.resources[0]
    const [newTag, setNewTag] = useState('')
    const [errorText, setErrorText] = useState('')
    const addNewTag = async () => {

        await addTag({
            id: params.id,
            tags: [newTag]

        })
    }
    useEffect(() => {

        if (error) {
            setErrorText(error?.data?.human_readable_error)
        } else if (isSuccess) {
            setNewTag('')
            setErrorText('')
        }

    }, [error, isSuccess]);
    return (
        <Layout isLoading={isLoading}>
            <div className="contactPageContainer">
                <div className="profile">
                    {contact?.avatar_url&&<img src={contact?.avatar_url} alt="" className="avatar"/>}
                    <div>
                        {contact?.fields["first name"] && contact?.fields["last name"] &&
                            <p>{contact?.fields["first name"][0]?.value} {contact?.fields["last name"][0]?.value}</p>
                        }
                        <span>{contact?.fields?.email[0]?.value}</span>
                    </div>

                </div>
                <div className="tagsBlock">
                    <p className="title">Tags</p>
                    <div className="tagsRow">
                        {contact?.tags.length ? contact?.tags?.map((item, index) => {
                            return <Tag tag={item?.tag} key={item?.id}/>
                        }) : <span style={{color: "gray"}}>Empty</span>}
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <TextField error={errorText?.includes('first name')} label="Add new tag" variant="outlined"
                               value={newTag}
                               onChange={(e) => setNewTag(e.target.value)}/>
                    <Button variant="contained" onClick={addNewTag} disabled={isTaging}>Add tag</Button>
                    <p className="error">{errorText}</p>
                </div>

            </div>
        </Layout>

    );
};

export default ContactPage;
