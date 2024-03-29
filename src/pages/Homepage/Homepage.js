import { useState } from "react";

import { useFetchRecipes } from "../../hooks";

import styles from "./Homepage.module.scss";

import Recipe from "./components/Recipe/Recipe";
import Search from "./components/Search/Search";
import Loading from "../../components/Loading/Loading";

import { updateRecipe as updateR, deleteRecipe as deleteR } from "../../apis";

function Homepage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  // execution of the useFetchRecipes() hook + import of the props returned by the hook
  const [[recipes, setRecipes], isLoading, error] = useFetchRecipes(
    page
  );

  async function updateRecipe(updatedRecipe) {
    const savedRecipe = await updateR(updatedRecipe);
    setRecipes(
      recipes.map((r) => (r._id === savedRecipe._id ? savedRecipe : r))
    );
  }

  async function deleteRecipe(_id) {
    await deleteR(_id);
    // creates and returns a new array with all recipes except the one that matches "_id"
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}>- {recipes.length}</small>
      </h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !recipes.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  updateRecipe={updateRecipe}
                  deleteRecipe={deleteRecipe}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-items-center p-20">
          <button onClick={() => setPage(page + 1)} className="btn btn-primary">
            Charger plus de recettes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
