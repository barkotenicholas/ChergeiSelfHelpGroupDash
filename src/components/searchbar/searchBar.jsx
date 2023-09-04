import React from "react"
import {useFormik} from 'formik'
import * as Yup from 'yup'

export const SearchBar = ({updateSearch}) =>{

    const formik = useFormik({
        initialValues: { 
          search: "",
        },
        validationSchema:Yup.object({
            email:Yup.string()
        }),
        onSubmit:(values)=>{
            updateSearch(values)
        }
    });


    return (
        <form className="w-96 px-4 m-2" onSubmit={formik.handleSubmit} >
            <div className="relative">
                <svg
                    type="submit"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    id="search"
                    type={"text"}
                    placeholder="Search"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    onBlur={formik.handleBlur}
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>
    )
}