import React from 'react';
import Layout from "../../components/layout/page";
import "../../styles/pages/home/Home.scss"
import ContactForm from "../../components/contact-form";
import ContactsList from "../../components/contacts-list";
import {useGetContactsQuery} from "../../redux/api/listApi";

const Home = () => {
    const {data: contacts, isLoading} = useGetContactsQuery();

    return (
        <Layout isLoading={isLoading}>
            <div className="home-container">
                <ContactForm/>
                <ContactsList contacts={contacts}/>
            </div>
        </Layout>
    );
};

export default Home;
