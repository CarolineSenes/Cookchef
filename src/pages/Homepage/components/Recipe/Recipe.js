import styles from "./Recipe.module.scss";

function Recipe({ recipe, updateRecipe, deleteRecipe }) {

  function handleClickLike() {
    updateRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  async function handleClickDelete(e) {
    e.stopPropagation(); // pour ne pas déclencher le toggle du "like"" sur la recette à cause du bubbling.
    deleteRecipe(recipe._id)
  }

  return (
    <div onClick={handleClickLike} className={styles.recipe}>
      <i onClick={handleClickDelete} className="fa-solid fa-xmark" />
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <i
          className={`fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
