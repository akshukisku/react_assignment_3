import * as yup from "yup";
import type { userDetails } from "../../typescript/interface/userdetails.interface";

export const userDetailsSchema: yup.ObjectSchema<
  Omit<userDetails, "image"> & { image?: FileList | null }
> = yup.object({
  name: yup.string().required("Name is Required"),
  fullname: yup.string().required("Fullname is Required"),
  email: yup.string().email("Invalid Email").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Minimum 6 length")
    .required("Password is Required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is Required"),
  course: yup.string().required("Course is Required"),
  address: yup.string().required("Address is Required"),
  // Cast through unknown to avoid yup's internal flag mismatch with FileList | null
  image: yup.mixed<FileList>().nullable() as unknown as yup.Schema<
    FileList | null | undefined
  >,
});
