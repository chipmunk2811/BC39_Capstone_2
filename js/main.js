function sideNav() {
    document.getElementsByClassName("purchase-cover")[0].style.display = "block";
    document.getElementsByClassName("side-nav")[0].style.right = "0";
}

function closed() {
    document.getElementsByClassName("purchase-cover")[0].style.display = "none";
    document.getElementsByClassName("side-nav")[0].style.right = "-100%";
};

const getAPI = new GetAPI();

const getListProduct = () => {
    getAPI.getListAPI()
        .then(result => {
            if (result.statusText === "OK") {
                renderHTML(result.data);


            };
        })
        .catch(Error => console.log(Error))
};
getListProduct();

const renderHTML = (data) => {
    let result = "";
    if (data && data.length > 0) {
        data.forEach((product, index) => {
            result += `
            <div class="card">
                        <div class="top-bar">
                            <i class="${product.type}"></i>
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
                                <button onclick="changeHeart('${index}')" id="heart"><i class="fas fa-heart"></i></button>
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

        });
        document.getElementById("renderProduct").innerHTML = result;
    }

};

