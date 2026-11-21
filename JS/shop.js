
const productGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-products");

const favoriteKey = "hazel-favorites";

let favorites = [];

try {
    favorites = JSON.parse(
        localStorage.getItem(favoriteKey) || "[]"
    );

    if (!Array.isArray(favorites)) favorites = [];
} catch {
    favorites = [];
}

function saveFavorites() {
    localStorage.setItem(favoriteKey, JSON.stringify(favorites));
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);
}

// GENERATE PRODUCT CARDS
function renderProducts() {
    const search = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const sort = sortSelect.value;

    let filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.tags.some(tag => tag.includes(search));

        const matchesCategory = category === "all" ||(category === "favorites" ? favorites.includes(product.id) : product.category === category);

        return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    productGrid.innerHTML = filtered.map(product => {
        const isFavorite = favorites.includes(product.id);

        return `
            <article class="product-card">

                <div class="product-thumbnail">
                    <img
                        src="${product.image}"
                        alt="${product.name} template preview"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >

                    <span class="product-category">
                        ${product.categoryLabel}
                    </span>

                    <button
                        class="favorite-btn ${isFavorite ? "saved" : ""}"
                        data-favorite="${product.id}"
                        aria-label="Toggle ${product.name} favorite"
                        aria-pressed="${isFavorite}"
                    >
                        <i class="${isFavorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
                    </button>
                </div>

                <div class="product-details">

                    <div class="product-title-row">
                        <h3>${product.name}</h3>
                        ${product.featured
                            ? '<span class="featured-label">FEATURED</span>'
                            : ""}
                    </div>

                    <p>${product.description}</p>

                    <div class="product-card-footer">
                        <div class="product-price">
                            <small>Starting from</small>
                            <strong>${formatPrice(product.price)}</strong>
                        </div>

                        <a href="product.html?id=${encodeURIComponent(product.id)}"
                           class="inspect-btn">
                            View template <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                </div>
            </article>
        `;
    }).join("");

    document.getElementById("product-count").textContent =
        `${filtered.length} template${filtered.length === 1 ? "" : "s"}`;

    document.getElementById("empty-products").hidden =
        filtered.length !== 0;
}

// FAVORITES
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    saveFavorites();
    renderProducts();
}

function renderFavorites() {
    const favoriteProducts = products.filter(product =>
        favorites.includes(product.id)
    );

    document.getElementById("favorite-count").textContent =
        favoriteProducts.length;

    document.getElementById("header-favorite-count").textContent =
        favoriteProducts.length;

    document.getElementById("favorites-empty").hidden =
        favoriteProducts.length !== 0;

    document.getElementById("favorites-content").innerHTML =
        favoriteProducts.map(product => `
            <div class="favorite-item">

                <div class="favorite-image">
                    <img src="${product.image}" alt=""
                         onerror="this.style.display='none'">
                </div>

                <div class="favorite-info">
                    <h3>${product.name}</h3>
                    <p>${formatPrice(product.price)}</p>

                    <a href="product.html?id=${encodeURIComponent(product.id)}">
                        View template
                    </a>
                </div>

                <button class="remove-favorite"
                        data-remove-favorite="${product.id}"
                        aria-label="Remove ${product.name} from favorites">
                    <i class="fa-solid fa-trash-can"></i>
                </button>

            </div>
        `).join("");
}

// DRAWER CONTROLS
const drawer = document.getElementById("favorites-drawer");
const overlay = document.getElementById("favorites-overlay");

function openFavorites() {
    drawer.classList.add("active");
    overlay.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeFavorites() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.getElementById("open-favorites")
    .addEventListener("click", openFavorites);

document.getElementById("close-favorites")
    .addEventListener("click", closeFavorites);

overlay.addEventListener("click", closeFavorites);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeFavorites();
});

// EVENT DELEGATION
productGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite]");

    if (button) {
        toggleFavorite(button.dataset.favorite);
    }
});

document.getElementById("favorites-content")
    .addEventListener("click", event => {
        const button = event.target.closest("[data-remove-favorite]");

        if (button) {
            toggleFavorite(button.dataset.removeFavorite);
        }
    });

// SEARCH AND FILTERS
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

// INITIALIZE
loadProducts();