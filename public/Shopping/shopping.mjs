const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const card = document.createElement("article");
    const card_img = document.createElement("img");
    card_img.setAttribute("src", product.imageSrc);
    card_img.setAttribute("alt", product.name.split(",")[0])

    const details = document.createElement("div");
    details.classList.add("product-details");
    const name = document.createElement("h3");
    name.textContent = product.name.split(",")[0];
    const desc = document.createElement("p");
    desc.textContent = product.description;
    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = "$" + product.price;
    const cart_button_container = document.createElement("div");

    const cart_button = document.createElement("button");
    cart_button.classList.add("buy-button");
    cart_button.textContent = "Add to cart";
    cart_button.addEventListener("click", (e) => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    })
    cart_button_container.appendChild(cart_button);
    if(product.numInCart > 0){
        const num_in_cart = document.createElement("span");
        num_in_cart.classList.add("num-in-cart")
        num_in_cart.textContent = product.numInCart + " in cart";
        cart_button_container.appendChild(num_in_cart);
    }

    details.appendChild(name);
    details.appendChild(desc);
    details.appendChild(price);
    details.appendChild(cart_button_container);

    card.appendChild(card_img);
    card.appendChild(details);
    return card;
    //const details = document.createElement("div")
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
    const product_list = document.getElementsByClassName("product-list")[0]
    product_list.textContent = '';

    const title = document.createElement("h2");
    title.textContent = "Search Results";
    product_list.appendChild(title);
    

    for (let product of PRODUCTS) {
        if(shouldProductBeVisible(product)){
            product_list.appendChild(renderProductCard(product));
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */

    const cart = document.getElementsByClassName("cart-items")[0];
    cart.textContent = '';

    for (let product of PRODUCTS) {
        if (product.numInCart > 0){
            const name = document.createElement("p");
            name.textContent = product.name.split(",")[0] + " x" + product.numInCart;
            const remove_button = document.createElement("button");
            remove_button.classList.add("remove-button");
            remove_button.textContent = "Remove";
            remove_button.addEventListener("click", (e) => {
                product.numInCart = 0;
                rerenderAllProducts();
                rerenderCart();
            });

            cart.appendChild(name);
            cart.appendChild(remove_button);
        }
    }

}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    let min = Number.parseFloat(minPriceInput.value);
    const max = Number.parseFloat(maxPriceInput.value);
    if(minPriceInput.value === ""){
        min = 0;
    }

    if(maxPriceInput.value === ""){
        return min <= product.price;
    }

    return min <= product.price && product.price <= max;
}

minPriceInput.addEventListener("change", (e) => {
    rerenderAllProducts();
})

maxPriceInput.addEventListener("change", (e) => {
    rerenderAllProducts();
})

rerenderAllProducts();
rerenderCart();