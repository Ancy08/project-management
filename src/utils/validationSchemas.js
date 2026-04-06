import * as Yup from "yup";

export const employeeSchema = Yup.object({
    name:Yup.string().required("Name is required"),
    email:Yup.string()
    .email("Invalid email")
    .required("Email is required"),
    position:Yup.string().required("Position is required")
})