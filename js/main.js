function sideNav() {
    document.getElementsByClassName("purchase-cover")[0].style.display = "block";
    document.getElementsByClassName("side-nav")[0].style.right = "0";
}

function closed1() {
    document.getElementsByClassName("purchase-cover")[0].style.display = "none";
    document.getElementsByClassName("side-nav")[0].style.right = "-100%";
};
const getAPI = new GetAPI();
const cartItem = new Cartitem();
const getEle = (id) => document.getElementById(id);
// Lấy Dữ Liệu Từ API
const getListProduct = () => {
    var promise = getAPI.getListAPI()
        .then(result => {
            if (result.statusText === "OK") {
                return result.data;
            };
        })
        .catch(Error => console.log(Error))
    return promise;
};
// Render
const renderHTML = (data) => {
    let result = "";

    if (data && data.length > 0) {
        data.forEach((product, index) => {
            if (product.type === "Iphone") {
                result += `
            <div class="card">
                        <div class="top-bar">
                            <i class="fab fa-apple"></i>
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img"
                                src="${product.img}"
                                alt="">
                            <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${product.name}</strong>
                                <button onclick="changeHeart('${index}')" id="heart" class="heart"><i class="fas fa-heart"></i></button>
                            </div>
                            <div class="wrapper">
                                <h5>${product.desc}</h5>
                                <p>Screen: ${product.screen}
                                <br>BackCamera: ${product.backCamera}
                                <br>FontCamera: ${product.frontCamera}
                                </p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">$ ${product.price}</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem('${index}')" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>`;

            } else {
                result += `
            <div class="card">
                        <div class="top-bar">
                            <i class="fab fa-android"></i>
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img"
                                src="${product.img}"
                                alt="">
                            <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${product.name}</strong>
                                <button onclick="changeHeart('${index}')" id="heart" class="heart"><i class="fas fa-heart"></i></button>
                            </div>
                            <div class="wrapper">
                                <h5>${product.desc}</h5>
                                <p>Screen: ${product.screen}
                                <br>BackCamera: ${product.backCamera}
                                <br>FontCamera: ${product.frontCamera}
                                </p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">$ ${product.price}</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem('${index}')" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>`;

            }

        });
        document.getElementById("renderProduct").innerHTML = result;
    }
};
// Hiển Thị Dữ Liêu Từ API và render lên HTML
async function mySelect() {
    let data = await getListProduct();
    var typeOfProduct = document.getElementById("selection").value;
    let All = data;
    let Iphone = data.filter(product => product.type === "Iphone")
    let Samsung = data.filter(product => product.type === "Samsung")
    if (typeOfProduct == 0) {
        renderHTML(All);
    } else if (typeOfProduct == 1) {
        renderHTML(Iphone);
    } else if (typeOfProduct == 2) {
        renderHTML(Samsung);
    };
};
mySelect();
// Đổi màu trái tim
function changeHeart(index) {
    var listHearts = document.getElementsByClassName("heart");
    if (listHearts[index].classList.length > 1) {
        listHearts[index].classList.remove("fav");
    } else {
        listHearts[index].classList.add("fav");
    };
};
// Add product push
async function addItem(id) {
    let data = await getListProduct();
    let product = data[id];
    const formProduct = new FormProduct(id, product.name, product.price, product.img);
    cartItem.pushProduct(formProduct, id);
    renderCart(cartItem.arrCart);
    toTal();
    totalQuantityOfCart(cartItem.arrCart);
    setLocal();
    getEle("shoppingCart1").click();
};

const renderCart = (data) => {
    let result = ""
    data.forEach(product => {
        result += `
          <div class="cart-item">
            <div class="cart-img">
              <img src="${product.img}" alt="">
            </div>
                 <strong class="name">${product.name}</strong>
                    <span class="qty-change">
            <div>
                    <button class="btn-qty" onclick="qtyChangeLeft('${product.id}')"><i class="fas fa-chevron-left"></i></button>
                        <p class="qty">${product.quantity}</p>
                    <button class="btn-qty" onclick="qtyChangeRight('${product.id}')"><i class="fas fa-chevron-right"></i></button>
            </div>
                    </span>
                    <p class="price">${product.price}</p>
                    <button onclick="removeItem(${product.id})"><i class="fas fa-trash"></i></button>
            </div>`;
    });
    document.getElementsByClassName("cart-items")[0].innerHTML = result;
};

function qtyChangeLeft(id) {
    cartItem.reduceQuantity(id);
    renderCart(cartItem.arrCart);
    toTal();
    totalQuantityOfCart(cartItem.arrCart);
    setLocal();
};

function qtyChangeRight(id) {
    cartItem.increaseQuantity(id);
    renderCart(cartItem.arrCart);
    toTal();
    totalQuantityOfCart(cartItem.arrCart);
    setLocal();
};

function toTal() {
    let total = 0;
    const data = cartItem.arrCart;
    data.forEach(product => {
        total += product.quantity * product.price;
    });
    document.getElementsByClassName("total")[0].innerHTML = total;
};

function removeItem(id) {
    cartItem.removeProduct(id);
    if (cartItem.arrCart.length > 0) {
        renderCart(cartItem.arrCart);
    } else {
        renderCart1();
    };

    toTal();
    totalQuantityOfCart(cartItem.arrCart);
    setLocal();
};

const renderCart1 = () => {
    let result = `<span class="empty-cart">Looks Like You Haven't Added Any Product In The Cart</span>`;
    document.getElementsByClassName("cart-items")[0].innerHTML = result;
};

function totalQuantityOfCart(data) {
    let total = 0;
    data.forEach(product => {
        total += product.quantity;
    });
    document.getElementsByClassName("total-qty")[0].innerHTML = total;
};

// Clear Cart
function clearCart() {
    cartItem.clearCart();
    renderCart1();
    totalQuantityOfCart(cartItem.arrCart);
    toTal();
    setLocal();
};

// Purchase
function buy() {
    clearCart();
    setLocal();
    alert("Thanh Toán")
};

// SetLocal
function setLocal() {
    var setLocalStorage = JSON.stringify(cartItem.arrCart);
    localStorage.setItem("Cart", setLocalStorage);
};

// GetLocal
function getLocal() {
    if (localStorage.getItem("Cart")) {
        var getLocalStorage = localStorage.getItem("Cart");
        let data = JSON.parse(getLocalStorage);
        cartItem.arrCart = data;
        if (cartItem.arrCart.length > 0) {
            renderCart(cartItem.arrCart);
        } else {
            renderCart1();
        };
        totalQuantityOfCart(data);
    };
}; getLocal();

