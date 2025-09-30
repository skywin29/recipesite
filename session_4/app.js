document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/recipes");
    const recipes = await response.json();
    for (recipe of recipes) {

        const recipeContainer = document.createElement("div");

        const nameTag = document.createElement("h3");
        nameTag.innerText = recipe.name;
        recipeContainer.appendChild(nameTag);

        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);

        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);

        const ingredientsListTag = document.createElement("ul");

        for (ingredient of recipe.ingredients) {
            const ingredientsListItem = document.createElement("li");
            ingredientsListItem.innerText = ingredient;
            ingredientsListTag.appendChild(ingredientsListItem);
        }

        recipeContainer.appendChild(ingredientsListTag);

        recipeContainer.appendChild(document.createElement("br"));

        const stepsListTag = document.createElement("ol");

        for (step of recipe.steps) {
            const stepsListItemTag = document.createElement("li");
            stepsListItemTag.innerText = step;
            stepsListTag.appendChild(stepsListItemTag);
        }

        recipeContainer.appendChild(stepsListTag);

        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer);

    }

    const recipeForm = document.querySelector("form");
    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRecipe = {};

        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        const ingredientsText = event.target.ingredients.value;
        newRecipe.ingredients = ingredientsText.split(/\n/);

        const stepsText = event.target.steps.value;
        newRecipe.steps = stepsText.split(/\n/);

        fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        })

    })

    const cuisineResponse = await fetch("http://localhost:3000/cuisine-data");
    const cuisineData = await cuisineResponse.json();
    const xValues = Object.keys(cuisineData);
    const yValues = Object.values(cuisineData);
    
    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Cuisine Popularity"
            }
        }
    });

}) 

