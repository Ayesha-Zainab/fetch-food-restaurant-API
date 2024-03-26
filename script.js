document.addEventListener('DOMContentLoaded', () => {
    var button = document.getElementById('btn')
    var input = document.getElementById('inp')
    var recipeContainer = document.querySelector('.recipe-container')
    var recipeDetail = document.querySelector('.recipe-detail');
    var recipeDetailContainer = document.querySelector('.recipe-detail-container');
    var closebtn = document.querySelector('.closebutton')

    var searchValue = async (query) => {
        recipeContainer.innerHTML = '<h2>Fetching Recipe-----</h2>';
        var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        var data = await response.json();
        console.log(data.meals);
        recipeContainer.innerHTML = '';
    
    
        data.meals.forEach((ele) => {
            var recipe = document.createElement('div')
            recipe.classList.add('recipeDiv')
            recipe.innerHTML =
                `<img src="${ele.strMealThumb}">
                <p>${ele.strMeal}</p>
                <h3>${ele.strArea} Dish</h3>
                <p>${ele.strCategory} Catagory</p>`


            var button = document.createElement('button')
            button.innerText = 'View Recipe'
            recipe.appendChild(button);

            button.addEventListener('click', () => {
                popupBox(ele);
            })
            recipeContainer.appendChild(recipe);
        })

    }

    var fetchingredients = (ele) => {
        var ingredientsList = '';

        for (var i = 1; i <= 20; i++) {
            var ingredient = ele[`strIngredient${i}`];
            var measurement = ele[`strMeasure${i}`];

            if (!ingredient) break;

            ingredientsList += `<li>${measurement} ${ingredient}</li>`;
        }

        return ingredientsList;
    }

    var popupBox = (ele) => {
        recipeDetailContainer.innerHTML = `
        <p class='meal'>${ele.strMeal}</p>
        <h3>ingredients:</h3>
        <ul class='ingredients'>${fetchingredients(ele)}</ul>
        <div class='instructions'>
                <h3 class='instruc'>Instructions:</h3
                <p>${ele.strInstructions}</p>
         </div>
        
         `

        recipeDetail.style.display = 'block';
    }
    // closebtn functionality--------------
    closebtn.addEventListener('click', () => {
        recipeDetail.style.display = 'none'
    })

    button.addEventListener('click', function (e) {
        e.preventDefault();

        // fun call------------
        var inputValue = input.value;
        searchValue(inputValue);




    })
})