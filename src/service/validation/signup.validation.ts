import * as yup from "yup"

export const signupSchema = yup.object({
    fullname:yup.string().required("Fullname is Required"),
    email:yup.string().email().required("Email is Required"),
    password:yup.string().min(6,"Minimum 6 length").required("Password is required"),
    image:yup.mixed<File>().nullable().optional()
})  