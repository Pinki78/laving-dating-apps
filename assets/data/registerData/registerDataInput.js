let IdRegister = 0;

const getIdRegister = (suffix = "") => {
    IdRegister++;
    return `${suffix}-${IdRegister}`;
};

export const Profile_Register_form = [
    {
        id: getIdRegister("name"),
        InputName: "name",
        label: "Full Name",
        type: "text",
        errorText: "Full Name is required",
    },

    {
        id: getIdRegister("email"),
        InputName: "email",
        label: "Email",
        type: "email",
        errorText: "Email is required",
    },

    {
    id: getIdRegister("gender"),
    InputName: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    errorText: "Gender is required",
  },

  {
    id: getIdRegister("phone"),
    InputName: "phone",
    label: "Phone Number",
    type: "tel",
    errorText: "Phone Number is required",
  },

  {
    id: getIdRegister("birthdate"),
    InputName: "birthdate",
    label: "DD/MM/YYYY",
    type: "date",
    errorText: "Date of birth is required",
  },

  {
    id: getIdRegister("password"),
    InputName: "password",
    label: "Password",
    type: "password",
    errorText: "Password is required",
  },
    {
        id: getIdRegister("remember"),
        InputName: "rememberMe",
        label: "Remember Me",
        type: "checkbox",
    }
];
