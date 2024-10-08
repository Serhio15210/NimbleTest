import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const listApi = createApi({
    reducerPath: 'listApi',
    tagTypes: ["contacts"],
    baseQuery: fetchBaseQuery(
        {
            prepareHeaders: async (headers, query) => {
                headers.set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`);
                headers.set('Access-Control-Allow-Origin', '*')
                return headers;
            },

            credentials: "same-origin"
        }),
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: `/contacts`
            }),
            providesTags: result => ["contacts"],
        }),
        getContact: builder.query({
            query: (id) => ({
                url: `/contact/${id}`,
            }),
            providesTags: result => ["contact"],
        }),
        createContact: builder.mutation({
            query: (contact) => ({
                url: `/contact`,
                method: "POST",
                body: contact,
            }),
            invalidatesTags: result => ["contacts"],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contact/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: result => ["contacts"],
        }),
        addTegToContact: builder.mutation({
            query: ({id, tags}) => {
                return {
                    url: `/contacts/${id}/tags`,
                    method: "PUT",
                    body: {
                        tags: tags
                    },
                }
            },
            invalidatesTags: result => ["contact"],
        }),
    }),
})
export const {
    useGetContactsQuery,
    useGetContactQuery,
    useDeleteContactMutation,
    useCreateContactMutation

} = listApi;
