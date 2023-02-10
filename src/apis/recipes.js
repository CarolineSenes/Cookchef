const RECIPE_API = "https://restapi.fr/api/recipes";

/** GET */
export async function getRecipes(queryParam) {
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Failed to fetch recipes");
  }
}

export async function getRecipe(_id) {
  const response = await fetch(`${RECIPE_API}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to fetch one recipe");
  }
}

/** DELETE */
export async function deleteRecipe(_id) {
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("Failed to delete a recipe");
  }
}

/** UPDATE */
export async function updateRecipe(updatedRecipe) {
  // "restRecipe", will contain all other values in updatedRecipe except for _id.
  // "..." syntax is used to indicate that anything not explicitly named should be assigned to the restRecipe variable.
  const { _id, ...restRecipe } = updatedRecipe;
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update one recipe");
  }
}

/** POST */
export async function createRecipe(newRecipe) {
    const response = await fetch(RECIPE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });
      
    if (response.ok) {  
        return response.json();  
    } else {  
        throw new Error('Failed to create recipe'); 
    }
}
