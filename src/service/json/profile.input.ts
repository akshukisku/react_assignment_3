import type { profiledetails } from "../../typescript/interface/profile.interface";
import type { DynamicInputProps } from "../../typescript/type/component.type";

export const profileDetailsForm: Array<
  Omit<DynamicInputProps<profiledetails>, "register" | "errors">
> = [
  {
    name: "fullname",
    label: "Enter Full Name",
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
    name: "password",
    label: "Enter Passwprd",
    type: "text",
    required: true,
  },
];