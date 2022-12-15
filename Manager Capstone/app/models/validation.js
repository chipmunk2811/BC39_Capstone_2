const getEle = (id) => document.getElementById(id);
class Validation {
    checkSpace = (value, spthongbao, mess) => {
        if (value === "") {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        } else {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        };
    };
    checkOption = (idSelect, spthongbao, mess) => {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {

            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };
    kyTu = (value, spthongbao, mess, max) => {
        if (value.trim().length <= max) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };
    trungID = function (value, spthongbao, mess, arr) {
        var check = false;
        for (var i = 0; i < arr.length; i++) {
            var product = arr[i];
            if (product.id == value) {
                check = true;
                break;
            };
        };
        if (check) {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        } else {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        };
    };
};
export default Validation;