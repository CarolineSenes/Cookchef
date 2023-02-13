import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRecipe, updateRecipe } from "../../../../../../apis";
import styles from "./AdminRecipesForm.module.scss";
import { useLoaderData, useNavigate } from "react-router-dom";

function AdminRecipesForm() {
  const recipe = useLoaderData(); // données récupérées grâce au loader placé sur la route 'edit/:recipeId' dans router.js
  const navigate = useNavigate();

  // définit les valeurs par défaut des champs du formulaire selon qu'on soit en mode "création" ou "édition"
  const defaultValues = {
    title: recipe ? recipe.title : "",
    image: recipe ? recipe.image : "",
  };

  // gestion de la validation des champs du formulaire
  const recipeSchema = yup.object({
    title: yup
      .string()
      .required("Le titre de la recette doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    image: yup
      .string()
      .required("Il faut renseigner une image")
      .url("L'image doit être un lien valide"),
  });

  // état du formulaire
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    trigger,
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  // gestion de soumission du formulaire
  async function submit(values) {
    try {
      clearErrors();
      if (recipe) {
        await updateRecipe({
          ...values,
          _id: recipe._id,
        });
        navigate("/admin/recipes/list");
      } else {
        await createRecipe(values);
        reset(defaultValues);
      }
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">Ajouter une recette</h2>
      <div className="d-flex flex-column mb-20">
        <label>Titre de la recette</label>
        <input
          {...register("title", {
            onBlur() {
              trigger("title");
            },
          })}
          type="text"
        />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Image pour la recette</label>
        <input
          {...register("image", {
            onBlur() {
              trigger("image");
            },
          })}
          type="text"
        />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default AdminRecipesForm;
