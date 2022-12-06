import ServiceAPI from "../services/capstoneService.js";
import FormProduct from "../models/formProduct.js"
import Validation from "../models/validation.js"
const serviceAPI = new ServiceAPI();
const vaLiDaTion = new Validation();

const getEle = (id) => document.getElementById(id);
// Lấy data từ APi
const getListAPI = () => {
    return serviceAPI.AllApi("Capstone").then(arr => {
        if (arr.data.length != 0) {
            renderHTML(arr.data);
            return arr.data;
        } else { alert("Không có dữ liệu từ data API (Mảng bằng 0)") };
    }).catch(Error => console.log(Error));
};
getListAPI();
// render
const renderHTML = (data) => {
    let content = "";
    data.forEach((product, index) => {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.screen}</td>
        <td>${product.backCamera}</td>
        <td>${product.frontCamera}</td>
        <td>${product.img}</td>
        <td>${product.desc}</td>
        <td>${product.type}</td>
        <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct('${product.id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
        </td>
    </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = content;
};
// Tạo thẻ button
getEle("btnThemNguoiDung").onclick = () => {
    var result = `<button id="addProduct" class="btn btn-success" onclick="addProduct()">Thêm Sản Phẩm</button>`;
    getEle("addButton").innerHTML = result;
    var title = "Thêm Sản Phẩm";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
};
// ClearData
document.getElementsByClassName("close")[0].onclick = () => {
    clearData();
};
const clearData = () => {
    getEle("TaiKhoan").value = "";
    getEle("name").value = "";
    getEle("price").value = "";
    getEle("screen").value = "";
    getEle("backCamera").value = "";
    getEle("frontCamera").value = "";
    getEle("srcimg").value = "";
    getEle("loaiType").value = "Chọn loại máy";
    getEle("description").value = "";

    getEle("spTaiKhoan").innerHTML = "";
    getEle("spname").innerHTML = "";
    getEle("spprice").innerHTML = "";
    getEle("spscreen").innerHTML = "";
    getEle("spbackCamera").innerHTML = "";
    getEle("spfrontCamera").innerHTML = "";
    getEle("spsrcimg").innerHTML = "";
    getEle("sploaiType").value = "";
    getEle("spdescription").innerHTML = "";

    getEle("TaiKhoan").disabled = false;
};
// Lấy mẫu từ người dùng
const getForm = async (ID, addOrUpdata) => {
    let id = getEle("TaiKhoan").value;
    let name = getEle("name").value;
    let price = getEle("price").value;
    let screen = getEle("screen").value;
    let backCamera = getEle("backCamera").value;
    let frontCamera = getEle("frontCamera").value;
    let img = getEle("srcimg").value;
    let type = getEle("loaiType").value;
    let desc = getEle("description").value;

    // Dợi data để check ID
    const arr = await getListAPI();
    let isValid = true;
    if (addOrUpdata) {
        isValid &= vaLiDaTion.trungID(id, "spTaiKhoan", "ID Của Bạn Bị Trùng", arr);
    };
    isValid &= vaLiDaTion.checkOption("loaiType", "sploaiType", "(*) Vui lòng chọn Loại Sản Phẩm");
    isValid &= vaLiDaTion.kyTu(desc, "spdescription", "(*) Mô Tả Quá 60 Ký Tự", 61)
        && vaLiDaTion.checkSpace(desc, "spdescription", "(*) Không Để Trống");
    isValid &= vaLiDaTion.checkSpace(img, "spsrcimg", "(*) Không Để Hình Ảnh Trống");
    isValid &= vaLiDaTion.checkSpace(frontCamera, "spfrontCamera", "(*) Không Để Trống");
    isValid &= vaLiDaTion.checkSpace(backCamera, "spbackCamera", "(*) Không Để Trống");
    isValid &= vaLiDaTion.checkSpace(screen, "spscreen", "(*) Không Để Trống");
    isValid &= vaLiDaTion.checkSpace(price, "spprice", "(*) Không Để Trống");
    isValid &= vaLiDaTion.checkSpace(name, "spname", "(*) Không Để Trống");
    if (!isValid) return;

    return new FormProduct(ID, name, price, screen, backCamera, frontCamera, img, desc, type);
};
// ADD Product
window.addProduct = addProduct;
async function addProduct() {
    const product = await getForm("", true);
    if (product) {
        serviceAPI.AllApi("Capstone", "POST", product).then(result => {
            alert("Add Success!");
            getListAPI();
            document.getElementsByClassName("close")[0].click();
        }).catch(Error => console.log(Error));
    };
};
// Delete
window.deleteProduct = deleteProduct;
function deleteProduct(id) {
    if (id) {
        serviceAPI.AllApi(`Capstone/${id}`, "DELETE", null).then(result => {
            alert("Delete Success!");
            getListAPI();
            document.getElementsByClassName("close")[0].click();
        }).catch(Error => console.log(Error));
    };
};
// Edit to Input
window.editProduct = editProduct;
async function editProduct(id) {
    if (id) {
        const data = await serviceAPI.AllApi(`Capstone/${id}`, "GET", null).then(arr => arr.data).catch(Error => console.log(Error));
        getEle("TaiKhoan").value = data.id;
        getEle("name").value = data.name;
        getEle("price").value = data.price;
        getEle("screen").value = data.screen;
        getEle("backCamera").value = data.backCamera;
        getEle("frontCamera").value = data.frontCamera;
        getEle("srcimg").value = data.img;
        getEle("loaiType").value = data.type;
        getEle("description").value = data.desc;
        getEle("TaiKhoan").disabled = true;
    };
    getEle("addButton").innerHTML = `<button id="updataProduct" class="btn btn-info" onclick="updataProduct(${id})">Cập Nhật</button>`;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập Nhật Sản Phẩm";
};
// Updata Product
window.updataProduct = updataProduct;
async function updataProduct(id) {
    if (id) {
        const product = await getForm(id, false);
        serviceAPI.AllApi(`Capstone/${id}`, "PUT", product).then(result => {
            alert("Updata Success!");
            getListAPI();
            document.getElementsByClassName("close")[0].click();
        }).catch(Error => console.log(Error));
    };
};
// Search
getEle("searchName").addEventListener("keyup", async () => {
    const arrSearch = [];
    const keyword = getEle("searchName").value;
    const arr = await getListAPI();
    arr.forEach(product => {
        let xepHangLowerCase = product.name.toLowerCase();
        let keyWordLowerCase = keyword.toLowerCase();
        if (xepHangLowerCase.indexOf(keyWordLowerCase) !== -1) {
            arrSearch.push(product);
        };
    });
    renderHTML(arrSearch);
});
// filter Type
getEle("selLoai").addEventListener("change", async () => {
    let arr = await getListAPI();
    const option = getEle("selLoai").value;
    let listFilter = arr;
    if (option !== "all") {
        listFilter = arr.filter(product => product.type === option);
    };
    renderHTML(listFilter);
});
