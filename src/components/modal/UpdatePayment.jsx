import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function UpdatePayment({old_payment}) {

    const formik = useFormik({
        initialValues: {
            new_payment: old_payment ? old_payment : "",
        },
        validationSchema: Yup.object({
            new_payment:Yup.number().required("NewPayment is requred")
            // email:Yup.string().email().required("Email is Required"),
            // password: Yup.string()
            // .required('Please Enter your password')
            // .matches(
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            // ), 
        }),
        onSubmit: (values) => {
            updateUsers(values)
        }
    });





  return (
    <>
        <div>
        <form
                className="w-screen max-w-lg"
                onSubmit={formik.handleSubmit}

            >

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                            New Payment
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            type={"number"}
                            name='new_payment'
                            onChange={formik.handleChange}
                            value={formik.values.new_payment}
                            onBlur={formik.handleBlur}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit"
                        className="m-2 w-32 bg-slate-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        update
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default UpdatePayment