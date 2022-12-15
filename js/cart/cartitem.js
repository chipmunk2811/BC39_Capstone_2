function Cartitem() {
    this.arrCart = [];
    this.pushProduct = function (data, id) {
        let isValed = false;
        if (this.arrCart) {
            this.arrCart.forEach(product => {
                if (product.id == id) {
                    product.quantity++;
                    isValed = true;
                };
            });
        }
        if (isValed) return;
        this.arrCart.push(data);
    };
    this.increaseQuantity = function (id) {
        if (this.arrCart) {
            this.arrCart.forEach(product => {
                if (product.id == id) {
                    product.quantity++;
                };
            });
        };
    };
    this.reduceQuantity = function (id) {
        if (this.arrCart) {
            this.arrCart.forEach(product => {
                if (product.id == id) {
                    if (product.quantity > 1) {
                        product.quantity--;
                    } else if (product.quantity == 1) {
                        alert("(*) Số lượng thấp nhất là 1")
                    };
                };
            });
        };
    };
    this.removeProduct=function (id) {
        if (this.arrCart) {
            this.arrCart.forEach((product,index) => {
                if (product.id==id) {
                    this.arrCart.splice(index,1);
                }
            });
        }
    };
    this.clearCart=function () {
        this.arrCart=[];
    };
}