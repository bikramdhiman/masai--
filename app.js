const form = document.getElementById("recipe-form");
const recipeList = document.getElementById("recipe-list");
const categoryFilter = document.getElementById("filter-category");
const toggleBtn = document.getElementById("toggle-theme");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function formatText(text) {
  return text
    .replace(/\*([^*]+)\*/g, "<b>$1</b>")
    .replace(/_([^_]+)_/g, "<i>$1</i>")
    .replace(/~([^~]+)~/g, "<u>$1</u>");
}

function renderRecipes(filter = "All") {
  recipeList.innerHTML = "";
  recipes
    .filter(r => filter === "All" || r.category === filter)
    .forEach(({ name, ingredients, category, steps }) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Category:</strong> ${category}</p>
        <table><tr><td>${ingredients.join("</td></tr><tr><td>")}</td></tr></table>
        <p>${formatText(steps)}</p>
      `;
      recipeList.appendChild(card);
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("recipe-name").value.trim();
  const ingredients = document.getElementById("ingredients").value.split(",");
  const category = document.getElementById("category").value;
  const steps = document.getElementById("steps").value.trim();
  if (!name || !ingredients || !category || !steps) return;

  const newRecipe = { name, ingredients, category, steps };
  recipes.push(newRecipe);
  saveRecipes();
  form.reset();
  renderRecipes(categoryFilter.value);
});

categoryFilter.addEventListener("change", () => {
  renderRecipes(categoryFilter.value);
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderRecipes();