let recipes = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
        name: "Tomato Soup",
        about: "A warm and comforting soup made from fresh tomatoes, lightly spiced and perfectly smooth."
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg",
        name: "Noodles",
        about: "Stir-fried noodles cooked with fresh veggies and savory sauces for a quick, tasty bite."
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
        name: "Pasta",
        about: "Soft pasta tossed in a flavorful sauce with herbs and vegetables for a satisfying meal."
    },
    {
        id: 4,
        image: "https://images.pexels.com/photos/12737816/pexels-photo-12737816.jpeg",
        name: "Paneer Butter Masala",
        about: "A rich and creamy North Indian curry made with soft paneer cubes cooked in a tomato-based gravy, butter, and aromatic spices. Perfect with naan or rice."
    },
    {
        id: 5,
        image: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg",
        name: "Curry",
        about: "A rich and aromatic dish cooked with spices, herbs, and a flavorful gravy."
    },
    {
        id: 6,
        image: "https://images.pexels.com/photos/33430558/pexels-photo-33430558.jpeg",
        name: "Paneer Tikka",
        about: "Marinated paneer cubes grilled to perfection, smoky, spicy, and delicious."
    },
    {
        id: 7,
        image: "https://images.pexels.com/photos/35267286/pexels-photo-35267286.jpeg",
        name: "Jeera Rice",
        about: "Fragrant basmati rice tempered with cumin seeds for a light yet flavorful side dish."
    },
    {
        id: 8,
        image: "https://images.pexels.com/photos/35071828/pexels-photo-35071828.jpeg",
        name: "Manchurian",
        about: "Crispy vegetable balls tossed in a tangy, spicy Indo-Chinese sauce."
    }
]

let editId = null

function showRecipes() {
    const container = document.getElementById("recipeData")
    container.innerHTML = ""

    recipes.forEach((item) => {
        container.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100">
                    <img src="${item.image}" class="card-img-top" style="height:200px; object-fit:cover">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.about}</p>
                    </div>
                    <div class="row m-0 text-center">
                        <div class="col-6 my-1">
                            <button class="btn btn-success w-100" onclick="editRecipe(${item.id})">
                                Edit
                            </button>
                        </div>
                        <div class="col-6 my-1">
                            <button class="btn btn-warning w-100" onclick="removeRecipe(${item.id})">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

showRecipes()

function addRecipe() {
    event.preventDefault()

    const name = document.getElementById("recipeName1").value.trim()
    const about = document.getElementById("recipeDetail1").value.trim()
    const image = document.getElementById("recipeImage1").value.trim()

    if (!name || !about || !image) return

    if (editId === null) {
        recipes.push({
            id: Date.now(),
            name,
            about,
            image
        })
    } else {
        const recipe = recipes.find(r => r.id === editId)
        recipe.name = name
        recipe.about = about
        recipe.image = image
        editId = null
    }

    document.querySelector("form").reset()
    bootstrap.Modal.getInstance(document.getElementById("addForm")).hide()
    showRecipes()
}

function removeRecipe(id) {
    recipes = recipes.filter(item => item.id !== id)
    showRecipes()
}

function editRecipe(id) {
    const recipe = recipes.find(item => item.id === id)

    document.getElementById("recipeName1").value = recipe.name
    document.getElementById("recipeDetail1").value = recipe.about
    document.getElementById("recipeImage1").value = recipe.image

    editId = id

    new bootstrap.Modal(document.getElementById("addForm")).show()
}
function filterRecipes(searchText) {
    let filtered = recipes.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    )

    document.getElementById("recipeData").innerHTML = ""

    filtered.forEach(item => {
        document.getElementById("recipeData").innerHTML += `
            <div class="col-md-3">
                <div class="card">
                    <img src="${item.image}" height="200">
                    <div class="card-body">
                        <h5>${item.name}</h5>
                        <p>${item.about}</p>
                        <button class="btn btn-success" onclick="editRecipe(${item.id})">Edit</button>
                        <button class="btn btn-warning" onclick="removeRecipe(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `
    })
}

