// ======================================================
// ShopEasy script.js
// Part-1 : Product Display System
// ======================================================


console.clear();

console.log("🚀 ShopEasy Started");


// ===============================
// Products Data
// ===============================

let shopProducts = products;


// ===============================
// Local Storage
// ===============================

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


let wishlist = JSON.parse(
    localStorage.getItem("wishlist")
) || [];



// ===============================
// DOM Elements
// ===============================


const productContainer =
    document.getElementById(
        "productsContainer"
    );


const cartCount =
    document.getElementById(
        "cart-count"
    );


const wishlistCount =
    document.getElementById(
        "wishlist-count"
    );




// ===============================
// Discount Calculate
// ===============================

function calculateDiscount(price, oldPrice) {

    if (!oldPrice || oldPrice <= price) {

        return 0;

    }


    return Math.round(

        ((oldPrice - price) / oldPrice) * 100

    );

}



// ===============================
// Rating Stars
// ===============================


function getStars(rating) {

    let stars = "";


    for (let i = 1; i <= 5; i++) {


        if (i <= Math.floor(rating)) {

            stars += "⭐";

        }

        else {

            stars += "☆";

        }

    }


    return stars;

}



// ===============================
// Cart Count
// ===============================


function updateCartCount() {


    if (!cartCount) return;


    let total = 0;


    cart.forEach(item => {


        total += item.quantity;


    });


    cartCount.innerText = total;


}



// ===============================
// Wishlist Count
// ===============================


function updateWishlistCount() {


    if (!wishlistCount) return;


    wishlistCount.innerText =
        wishlist.length;


}




// ===============================
// Display Products
// ===============================


function displayProducts(list = shopProducts) {


    if (!productContainer)
        return;



    productContainer.innerHTML = "";



    list.forEach(product => {


        productContainer.innerHTML += `


<div class="product-card"
onclick="openProduct(${product.id})">


<img src="${product.image}"
alt="${product.name}">


<div class="product-info">


<h3>
${product.name}
</h3>


<p>
${product.brand}
</p>


<div class="rating">

${getStars(product.rating)}

</div>



<div class="price">


<span class="new-price">

₹${product.price}

</span>


<span class="old-price">

₹${product.oldPrice}

</span>


</div>



<p class="stock">

${product.stock > 0

                ? "✅ In Stock"

                : "❌ Out Of Stock"}

</p>



<button class="cart-btn"

onclick="event.stopPropagation();
addToCart(${product.id})">


Add To Cart


</button>



</div>


</div>


`;



    });


}




// ===============================
// Open Product Detail
// ===============================


function openProduct(id) {
    window.location.href = `product-details.html?id=${id}`;
}





// ===============================
// Initialize
// ===============================


displayProducts();


updateCartCount();


updateWishlistCount();



console.log(
    "📦 Products:",
    shopProducts.length
);


console.log(
    "🛒 Cart:",
    cart.length
);


console.log(
    "❤️ Wishlist:",
    wishlist.length
);
// ======================================================
// ShopEasy script.js
// Part-2 : Search + Filter + Sorting
// ======================================================


// ===============================
// DOM Elements
// ===============================


const searchInput =
    document.getElementById(
        "search-input"
    );


const searchBtn =
    document.getElementById(
        "search-btn"
    );


const categoryFilter =
    document.getElementById(
        "category-filter"
    );


const priceFilter =
    document.getElementById(
        "price-filter"
    );



// ===============================
// Filter Products Function
// ===============================


function filterProducts() {


    let filteredProducts =
        [...shopProducts];



    // ==========================
    // Search Filter
    // ==========================


    if (
        searchInput &&
        searchInput.value.trim() !== ""
    ) {


        let keyword =
            searchInput.value
                .toLowerCase()
                .trim();



        filteredProducts =
            filteredProducts.filter(product => {


                return (


                    product.name
                        .toLowerCase()
                        .includes(keyword)



                    ||



                    product.brand
                        .toLowerCase()
                        .includes(keyword)



                    ||



                    product.category
                        .toLowerCase()
                        .includes(keyword)


                );


            });



    }




    // ==========================
    // Category Filter
    // ==========================


    if (

        categoryFilter &&
        categoryFilter.value !== "all"

    ) {


        filteredProducts =
            filteredProducts.filter(product => {


                return (

                    product.category ===
                    categoryFilter.value

                );


            });


    }





    // ==========================
    // Price Filter
    // ==========================


    if (

        priceFilter &&
        priceFilter.value !== "all"

    ) {


        filteredProducts =
            filteredProducts.filter(product => {


                return (

                    product.price <=
                    Number(priceFilter.value)

                );


            });


    }





    displayProducts(filteredProducts);



}




// ===============================
// Search Button Click
// ===============================


if (searchBtn) {


    searchBtn.addEventListener(
        "click",
        filterProducts
    );


}



// ===============================
// Search Typing
// ===============================


if (searchInput) {


    searchInput.addEventListener(

        "keyup",

        filterProducts

    );


}





// ===============================
// Category Change
// ===============================


if (categoryFilter) {


    categoryFilter.addEventListener(

        "change",

        filterProducts

    );


}





// ===============================
// Price Change
// ===============================


if (priceFilter) {


    priceFilter.addEventListener(

        "change",

        filterProducts

    );


}





// ===============================
// Enter Key Search
// ===============================


if (searchInput) {


    searchInput.addEventListener(

        "keypress",

        function (e) {


            if (e.key === "Enter") {


                filterProducts();


            }


        }

    );


}




console.log(
    "🔍 Search System Ready"
);


console.log(
    "📂 Category Filter Ready"
);


console.log(
    "💰 Price Filter Ready"
);
// ======================================================
// ShopEasy script.js
// Part-3 : Cart + Wishlist + Toast System
// ======================================================



// ===============================
// Save Cart
// ===============================


function saveCart() {


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    updateCartCount();


}





// ===============================
// Save Wishlist
// ===============================


function saveWishlist() {


    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );


    updateWishlistCount();


}




// ===============================
// Toast Notification
// ===============================


function showToast(message, color = "#16a34a") {


    let toast =
        document.getElementById("toast");



    if (!toast) {


        toast =
            document.createElement("div");


        toast.id = "toast";


        document.body.appendChild(toast);



        toast.style.position = "fixed";

        toast.style.bottom = "30px";

        toast.style.right = "30px";

        toast.style.padding = "15px 25px";

        toast.style.borderRadius = "10px";

        toast.style.color = "#fff";

        toast.style.fontSize = "16px";

        toast.style.zIndex = "9999";

        toast.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.2)";

        toast.style.transition = ".3s";

        toast.style.opacity = "0";


    }



    toast.innerText = message;


    toast.style.background = color;


    toast.style.opacity = "1";



    setTimeout(() => {


        toast.style.opacity = "0";


    }, 2000);



}




// ===============================
// Add To Cart
// ===============================


function addToCart(id) {



    const product =

        shopProducts.find(

            item => item.id === id

        );



    if (!product) {

        return;

    }





    if (product.stock <= 0) {


        showToast(

            "Product Out Of Stock",

            "#ef4444"

        );


        return;


    }




    const existing =

        cart.find(

            item => item.id === id

        );




    if (existing) {


        existing.quantity++;


    }

    else {


        cart.push({


            ...product,


            quantity: 1


        });


    }





    saveCart();



    showToast(

        product.name +
        " Added To Cart"

    );



}





// ===============================
// Remove Cart Item
// ===============================


function removeFromCart(id) {



    cart = cart.filter(

        item => item.id !== id

    );



    saveCart();



    showToast(

        "Item Removed",

        "#ef4444"

    );



}





// ===============================
// Increase Quantity
// ===============================


function increaseQuantity(id) {



    const item =

        cart.find(

            product => product.id === id

        );



    if (!item)

        return;



    item.quantity++;



    saveCart();



}





// ===============================
// Decrease Quantity
// ===============================


function decreaseQuantity(id) {



    const item =

        cart.find(

            product => product.id === id

        );



    if (!item)

        return;




    item.quantity--;



    if (item.quantity <= 0) {


        removeFromCart(id);


        return;


    }




    saveCart();


}





// ===============================
// Clear Cart
// ===============================


function clearCart() {



    if (
        confirm("Are you sure to clear cart?")
    ) {


        cart = [];



        saveCart();



        showToast(

            "Cart Cleared",

            "#ef4444"

        );


    }


}





// ===============================
// Add Wishlist
// ===============================


function addToWishlist(id) {



    const product =

        shopProducts.find(

            item => item.id === id

        );



    if (!product)

        return;





    const exists =

        wishlist.find(

            item => item.id === id

        );




    if (exists) {



        showToast(

            "Already In Wishlist",

            "#f59e0b"

        );



        return;


    }





    wishlist.push(product);



    saveWishlist();



    showToast(

        product.name +
        " Added To Wishlist"

    );



}





// ===============================
// Remove Wishlist
// ===============================


function removeWishlist(id) {



    wishlist = wishlist.filter(

        item => item.id !== id

    );



    saveWishlist();



    showToast(

        "Wishlist Updated",

        "#ef4444"

    );


}





// ===============================
// Cart Total
// ===============================


function getCartTotal() {



    return cart.reduce(

        (total, item) => {


            return total +

                item.price *

                item.quantity;


        },

        0

    );


}




// ===============================
// Cart Items Count
// ===============================


function getCartItems() {



    return cart.reduce(

        (total, item) => {


            return total +

                item.quantity;


        },

        0

    );


}





console.log(

    "🛒 Cart System Ready"

);


console.log(

    "❤️ Wishlist System Ready"

);


console.log(

    "💰 Cart Total : ₹" + getCartTotal()

);
// ======================================================
// ShopEasy script.js
// Part-4 : Slider + Theme + UI Effects
// ======================================================



// ===============================
// HERO SLIDER
// ===============================


const slides =
    document.querySelectorAll(".slide");


const dots =
    document.querySelectorAll(".dot");



let currentSlide = 0;



function showSlide(index) {



    if (slides.length === 0)

        return;



    slides.forEach(slide => {


        slide.classList.remove(
            "active"
        );


    });



    dots.forEach(dot => {


        dot.classList.remove(
            "active"
        );


    });




    slides[index].classList.add(
        "active"
    );



    if (dots[index]) {


        dots[index].classList.add(
            "active"
        );


    }



}




// Next Slide


function nextSlide() {



    if (slides.length === 0)

        return;



    currentSlide++;



    if (currentSlide >= slides.length) {


        currentSlide = 0;


    }



    showSlide(currentSlide);



}





// Previous Slide


function prevSlide() {



    if (slides.length === 0)

        return;



    currentSlide--;



    if (currentSlide < 0) {


        currentSlide =
            slides.length - 1;


    }



    showSlide(currentSlide);



}





// Slider Buttons


const nextBtn =
    document.querySelector(".next");


const prevBtn =
    document.querySelector(".prev");



if (nextBtn) {


    nextBtn.addEventListener(

        "click",

        nextSlide

    );


}



if (prevBtn) {


    prevBtn.addEventListener(

        "click",

        prevSlide

    );


}





// Dot Click


dots.forEach((dot, index) => {


    dot.addEventListener(

        "click",

        () => {


            currentSlide = index;


            showSlide(
                currentSlide
            );


        }

    );


});





// Auto Slider


if (slides.length > 0) {


    setInterval(

        nextSlide,

        3000

    );


}






// ===============================
// DARK MODE
// ===============================



const themeBtn =
    document.getElementById(
        "theme-btn"
    );



if (

    localStorage.getItem("theme")
    === "dark"

) {


    document.body.classList.add(
        "dark"
    );


}





if (themeBtn) {



    themeBtn.addEventListener(

        "click",

        () => {


            document.body.classList.toggle(
                "dark"
            );



            if (
                document.body.classList.contains(
                    "dark"
                )) {


                localStorage.setItem(

                    "theme",

                    "dark"

                );


                showToast(
                    "Dark Mode Enabled"
                );


            }

            else {


                localStorage.setItem(

                    "theme",

                    "light"

                );


                showToast(
                    "Light Mode Enabled"
                );


            }



        }

    );


}





// ===============================
// SCROLL TO TOP
// ===============================



const topBtn =
    document.getElementById(
        "topBtn"
    );



window.addEventListener(

    "scroll",

    () => {


        if (!topBtn)

            return;



        if (window.scrollY > 300) {



            topBtn.style.display =
                "block";


        }

        else {


            topBtn.style.display =
                "none";


        }



    }

);





if (topBtn) {


    topBtn.addEventListener(

        "click",

        () => {


            window.scrollTo({


                top: 0,


                behavior: "smooth"


            });


        }

    );


}







// ===============================
// Lazy Loading Images
// ===============================



document
    .querySelectorAll("img")
    .forEach(img => {


        img.loading = "lazy";


    });







// ===============================
// Recently Viewed Products
// ===============================



function saveRecentlyViewed(id) {



    let recent =

        JSON.parse(

            localStorage.getItem(
                "recentProducts"
            )

        ) || [];




    recent =
        recent.filter(
            item => item !== id
        );



    recent.unshift(id);




    if (recent.length > 10) {


        recent.pop();


    }



    localStorage.setItem(

        "recentProducts",

        JSON.stringify(recent)

    );



}







// ===============================
// Keyboard Shortcut
// Ctrl + K Search
// ===============================



document.addEventListener(

    "keydown",

    function (e) {



        if (
            e.ctrlKey &&
            e.key === "k"
        ) {



            e.preventDefault();



            if (searchInput) {


                searchInput.focus();


            }



        }



    }

);







// ===============================
// Internet Status
// ===============================



window.addEventListener(

    "online",

    () => {


        showToast(
            "Internet Connected"
        );


    }

);





window.addEventListener(

    "offline",

    () => {


        showToast(

            "Internet Disconnected",

            "#ef4444"

        );


    }

);







// ===============================
// Refresh UI
// ===============================



function refreshUI() {



    updateCartCount();


    updateWishlistCount();



}



refreshUI();






console.log(
    "🎞 Slider Ready"
);


console.log(
    "🌙 Dark Mode Ready"
);


console.log(
    "⬆ Scroll Button Ready"
);


console.log(
    "⚡ UI Effects Loaded"
);
function openProfile() {

    let user = localStorage.getItem("user");


    if (user) {

        window.location.href = "profile.html";

    }
    else {

        window.location.href = "login.html";

    }

}
function openProfile() {

    let user = localStorage.getItem("user");


    if (user) {

        window.location.href = "profile.html";

    }
    else {

        window.location.href = "login.html";

    }

}