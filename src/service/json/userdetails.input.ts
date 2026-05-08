
import type { userDetails } from "../../typescript/interface/userdetails.interface";
import type { DynamicInputProps } from "../../typescript/type/component.type";

export const userDetailsForm: Array<
  Omit<DynamicInputProps<userDetails>, "register" | "errors">
> = [
  {
    name: "fullname",
    label: "Enter Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Enter Email",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Enter Phone Number",
    type: "number",
    required: true,
  },
  {
    name: "course",
    label: "Enter Course",
    type: "text",
    required: false,
  },
  {
    name: "address",
    label: "Enter Address",
    type: "text",
    required: false,
  },
];