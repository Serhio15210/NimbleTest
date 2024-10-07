import React, {useEffect, useRef} from 'react';
import "./ContactsList.scss"
import Tag from "../tag";
import {setNewContactId} from "../../redux/reducers/listReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {useNavigate} from "react-router-dom";
import {useContactList} from "./hooks/use-contact-list";

const ContactsList = ({contacts}) => {
    const newContactRef = useRef(null);
    const {
        newContactId,
    } = useSelector((state) => state?.list);
    const dispatch = useDispatch()
    const {deleteById, isLoading, selectId} = useContactList()
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    dispatch(setNewContactId(null))
                } else {
                    console.log('Element is not visible');
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (newContactRef.current) {
            observer.observe(newContactRef.current);
        }

        return () => {
            if (newContactRef.current) {
                observer.unobserve(newContactRef.current);
            }
        };
    }, [newContactRef]);

    const navigate = useNavigate();
    return (
        <div className={"contactsListContainer"}>
            <p className={"title"}>Contacts ({contacts?.meta?.total})
                {newContactId && <span className="new-indicator"/>}
            </p>
            {
                contacts?.resources?.length === 0 ? <p>No contacts</p> :
                    <div style={{position: "relative"}}>
                        <div className="top"/>
                        <div className="cardsContainer">
                            {contacts?.resources?.map((item, index) => {
                                return (
                                    <div className="contact" key={item?.id}
                                            ref={item?.id === newContactId ? newContactRef : null}
                                            onClick={() => navigate(`/contact/${item?.id}`)}>

                                    {isLoading && item?.id === selectId ?
                                        <Loader color={'white'} position={'right'} style={{right: 10, top: 15}}
                                                size={20}/>
                                        :
                                        <DeleteSvg onClick={(e) => {
                                            e.stopPropagation()
                                            deleteById(item?.id)
                                        }}/>
                                    }
                                    <img src={item?.avatar_url} alt="" className="avatar"/>
                                    <div className="profile">
                                        <div>
                                            {item?.fields["first name"] && item?.fields["last name"] &&
                                                <p>{item?.fields["first name"][0]?.value} {item?.fields["last name"][0]?.value}</p>
                                            }
                                            <span>{item?.fields?.email[0]?.value}</span>
                                        </div>
                                        <div className="tagsRow">
                                            {item?.tags?.map((item, index) => {
                                                return <Tag tag={item?.tag} key={item?.id}/>
                                            })}

                                        </div>
                                    </div>

                                </div>
                                )
                            })}
                        </div>
                        <div className="bottom"/>
                    </div>
            }
        </div>
    );
};
const DeleteSvg = ({onClick}) => {
    return <svg className="delete" preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                fill="#e8eaed" onClick={onClick}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
    </svg>
}
export default ContactsList;
