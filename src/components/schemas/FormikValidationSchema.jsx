import * as Yup from "yup";

const SharingStoryFormikValidation = Yup.object().shape({
  storyTitle: Yup.string()
    .min(1, "Type Something")
    .required("*Required"),
  story: Yup.string()
    .min(1, "Type Something")
    .required("*Required")
});

const SharingRecipeFormikValidation = Yup.object().shape({
  recipeTitle: Yup.string()
    .min(1, "Type Something")
    .required("*Required"),
  ingredients: Yup.string()
    .min(1, "Type Something")
    .required("*Required"),
  recipe: Yup.string()
    .min(1, "Type Something")
    .required("*Required")
});

const RegisterFormikValidation = Yup.object().shape({
  userName: Yup.string()
    .min(1, "Type something")
    .required("*Required"),
  password: Yup.string()
    .min(8, "Password has to be minimum 8 letters long")
    .max(255)
    .required("*Required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!$%^&*-_])[^ ]{8,}/,
      "Password must be at least 8 char long and must contain at lease 1 uppercase, 1 lowercase, 1 num, 1 speical char"
    ),
  confirmPassword: Yup.mixed()
    .required("*Required")
    .oneOf([Yup.ref("password")], "Password must match")
});

const LoginFormikValidation = Yup.object().shape({
  userName: Yup.string()
    .min(1, "Type something")
    .required("*Required"),
  password: Yup.string().required("*Required")
});

export {
  SharingStoryFormikValidation,
  SharingRecipeFormikValidation,
  RegisterFormikValidation,
  LoginFormikValidation
};
