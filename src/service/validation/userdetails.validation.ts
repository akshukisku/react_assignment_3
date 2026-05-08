import * as yup from "yup";
import type { userDetails } from "../../typescript/interface/userdetails.interface";

const baseSchema = {
  name: yup.string().required("Name is Required"),
  fullname: yup.string().required("Fullname is Required"),
  email: yup.string().email("Invalid Email").required("Email is Required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is Required"),
  course: yup.string().required("Course is Required"),
  address: yup.string().required("Address is Required"),
  image: yup.mixed<FileList>().nullable() as unknown as yup.Schema<
    FileList | null | undefined
  >,
};

// ✅ Used when CREATING — password is required
export const userCreateSchema: yup.ObjectSchema<
  Omit<userDetails, "image"> & { image?: FileList | null }
> = yup.object({
  ...baseSchema,
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is Required"),
});

// ✅ Used when EDITING — password is not present in form at all
export const userEditSchema: yup.ObjectSchema<
  Omit<userDetails, "image" | "password"> & {
    image?: FileList | null;
    password?: string;
  }
> = yup.object({
  ...baseSchema,
  password: yup.string().optional(),
});