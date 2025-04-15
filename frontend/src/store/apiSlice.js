import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://shortify-a6wl.onrender.com/api/shortify" }),
  endpoints: (builder) => ({
    shortenUrl: builder.mutation({
      query: (longUrl) => ({
        url: "/shorten-url",
        method: "POST",
        body: { longUrl },
      }),
    }),
  }),
});

export const { useShortenUrlMutation } = apiSlice;
