import * as yup from "yup";

export type States = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";

export const auStates: States[] = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(1)
    .max(50, "character limit reached")
    .matches(/^[a-z|A-Z]+$/)
    .required("Your first name is required"),
  lastName: yup
    .string()
    .min(1)
    .max(50, "character limit reached")
    .matches(/^[a-z|A-Z]+$/)
    .required("Your last name is required"),
  email: yup
    .string()
    .email("Your email is not a valid email")
    .max(254, "character limit reached")
    .required("Your email is required"),
  phone: yup
    .string()
    .matches(
      /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
      "Your phone number is not valid"
    )
    .required("Your phone number is required"),
  postcode: yup
    .string()
    .matches(/^[0-9]{4}$/, "Your post code is not valid")
    .required("Your post code is required"),
  state: yup.string().oneOf(auStates).required("Please select a state"),
  companyName: yup.string().max(200).optional(),
  abn: yup
    .string()
    .matches(/^(\s?[0-9]){11}$/, "Your ABN is not valid")
    .optional(),
  hourlyRate: yup
    .string()
    .matches(/^[0-9]+(\.[0-9][0-9])?$/, "Your hourly rate is not valid")
    .required("Your Hourly Rate is required"),
  insuranceExpiryDate: yup.date().required("Insurance expiry date required"),
});
