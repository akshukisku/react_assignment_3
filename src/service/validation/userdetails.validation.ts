import * as yup from "yup"

export const userDetailsSchema = yup.object({
    name:yup.string().required("name is Required"),
    email:yup.string().email().required("Email is Required"),
    phone:yup.string().min(10,"Minium 10 numbers").required("Phone Number is Required"),
    course:yup.string().required("Course is Required"),
    address:yup.string().required("Address is Required")
})