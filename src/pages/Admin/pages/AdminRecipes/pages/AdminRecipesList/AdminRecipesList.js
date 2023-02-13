import { useFetchRecipes } from "../../../../../../hooks";
import styles from "./AdminRecipesList.module.scss";

function AdminRecipesList() {
  const [[recipes]] = useFetchRecipes();

  return (
    <ul className={styles.list}>
      {recipes.length
        ? recipes.map((r, i) => (
            <li key={`${i}-${r._id}`} className="d-flex align-items-center">
              <span className="flex-fill">{r.title}</span>
              <button className="btn btn-primary mr-15">Editer</button>
              <button className="btn btn-danger">Supprimer</button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default AdminRecipesList;
