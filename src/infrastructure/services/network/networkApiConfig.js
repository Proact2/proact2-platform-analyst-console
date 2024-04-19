import axios from "axios";

function getDevEvironment() {
    return "https://devetproactservices.azurewebsites.net/api";
}

function getProdEnvironment() {
    return "https://prodproactservices.azurewebsites.net/api";
}

export function setupApiConfiguration(languageTag) {
    var environmentBaseUrl = process.env.REACT_APP_APIENDPOINT;
    axios.defaults.baseURL = `${environmentBaseUrl}/${languageTag}/`;
}

export function setApiAuthToken(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}