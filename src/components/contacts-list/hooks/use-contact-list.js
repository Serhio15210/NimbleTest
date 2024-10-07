import {useDeleteContactMutation} from "../../../redux/api/listApi";
import {useEffect, useState} from "react";

export const useContactList=()=>{
    const [deleteContact, {isLoading, error}] = useDeleteContactMutation()
    const [selectId,setSelectId]=useState("")
    const deleteById = async (id) => {
        setSelectId(id)
        await deleteContact(id)
    }
    useEffect(() => {
        if (error){
            alert('Deleting Error',error?.data?.human_readable_error)
        }
    }, [error]);
    return {deleteById,isLoading,selectId}
}
