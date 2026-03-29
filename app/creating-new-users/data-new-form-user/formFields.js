export const formFields = [
  {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Full Name',
    nameInput:'fullname',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Email',
    nameInput:'email',
    type: 'email',
  },
 {
  id: 'gender',
  label: 'Gender',
  placeholder: 'Genders',
  type: 'select',
  nameInput:'gender',
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ],
},
  {
    id: 'phone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    type: 'phone',
    nameInput:'phonenumber',
     maxLength: 10,
  },
  {
    id: 'dob',
    label: 'DOB',
    placeholder: 'DD/MM/YYYY',
    type: 'date',
    nameInput:'dob',
     maxLength: 10,
  },

   {
    id: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    nameInput:'password',
  },
 
];
