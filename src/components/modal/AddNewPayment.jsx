import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';

function AddNewPayment({ users, AddPayment }) {


    const formik = useFormik({
        initialValues: {
            meter_number: users.meter_number,
            amount: "",
            method: "transnational"
        },
        validationSchema: Yup.object({
            meter_number: Yup.number().required("Meter Number is required"),
            amount: Yup.number().positive().required("Amount is required"),
            method: Yup.string().required("Method is required")
        }),
        onSubmit: (values) => {
            AddPayment(values)
        }
    });



    return (
        <>
            <form
                className="w-screen max-w-lg"
                onSubmit={formik.handleSubmit}>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                            Amount Payed
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            type={"number"}
                            name='amount'
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                            onBlur={formik.handleBlur}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" />
                        {formik.errors.amount && formik.touched.amount ? (
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {formik.errors.amount}
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                            Payment Method
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select
                            id="method"
                            name="method"
                            value={formik.values.method}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="mpesa">mpesa</option>
                            <option value="transnational">transnational</option>
                            <option value="cash">cash</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-slate-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Add Payment
                </button>
            </form>
        </>
    )
}

export default AddNewPayment 