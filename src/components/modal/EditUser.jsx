
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function EditUserForm({currentSelectedUser}) {

    const formik = useFormik({
        initialValues: {
          name: currentSelectedUser ? currentSelectedUser.name : "",
          meter_number:  currentSelectedUser ? currentSelectedUser.meter_number : "",
          phone_number:  currentSelectedUser ? currentSelectedUser.phone_number : ""
        },
        validationSchema:Yup.object({
            email:Yup.string().email().required("Email is Required"),
            // password: Yup.string()
            // .required('Please Enter your password')
            // .matches(
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            // ), 
        }),
        onSubmit:(values)=>{
    
        }
      });
    


    return (
        <form className="w-screen max-w-lg">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Full Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
         focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                        Meter Number
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.meter_number}
                        onBlur={formik.handleBlur}
                        className="bg-gray-200
         appearance-none 
         border-2
          border-gray-200
          rounded w-full
          py-2 px-4 text-gray-700
          leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  type="number" placeholder="......." />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                        phone number
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.phone_number}
                        onBlur={formik.handleBlur}
                        className="bg-gray-200
         appearance-none 
         border-2
          border-gray-200
          rounded w-full
          py-2 px-4
         text-gray-700 
          leading-tight
          focus:outline-none
         focus:bg-white focus:border-purple-500" id="inline-meter" type="number" placeholder="07....." />
                </div>
            </div>
        </form>
    )
}

export default EditUserForm