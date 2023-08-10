import axios from "axios"

export const ApiCall = async (url,method,data) => {
    return await axios[method](url,data)
    .then(function (response) {
        return response.data;
    })
};