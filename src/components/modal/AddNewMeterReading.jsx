import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


function AddNewMeterReading({handleMeterReadingAdd}) {

    const formik = useFormik({
        initialValues: {
            new_meter: 0,
        },
        validationSchema: Yup.object({
            new_meter: Yup.number().min(1).required("New meter reading required")
        }),
        onSubmit: (values) => {
            handleMeterReadingAdd(values)
        }
    });


    return (
        <>
            <>
                <form
                    className="w-screen max-w-lg"
                    onSubmit={formik.handleSubmit}>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                New Reading
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                type={"number"}
                                name='new_meter'
                                onChange={formik.handleChange}
                                value={formik.values.new_meter}
                                onBlur={formik.handleBlur}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" />
                            {formik.errors.new_meter && formik.touched.new_meter ? (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {formik.errors.new_meter}
                                </span>
                            ) : null}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Add New Reading
                    </button>
                </form>
            </>
        </>
    )
}

export default AddNewMeterReading