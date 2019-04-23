import * as Yup from "yup";

const SharingStoryFormikValidation = Yup.object().shape({
  storyTitle: Yup.string()
    .min(1, "Type Something")
    .required("Required"),
  story: Yup.string()
    .min(1, "Type Something")
    .required("Required")
});

const SharingRecipeFormikValidation = Yup.object().shape({
  recipeTitle: Yup.string()
    .min(1, "Type Something")
    .required("Required"),
  recipe: Yup.string()
    .min(1, "Type Something")
    .required("Required")
});

export { SharingStoryFormikValidation, SharingRecipeFormikValidation };
