const URL="https://637b69a46f4024eac20ce266.mockapi.io/api";
class ServiceAPI {
    AllApi(uri,method,data){
        return axios({
            url: `${URL}/${uri}`,
            method,
            data,
        });
    };
};

export default ServiceAPI;