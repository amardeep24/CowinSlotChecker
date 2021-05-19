/**
 * @author Amardeep Bhowmick <amardeep.bhowmick92@gmail.com>
 */
const fetch = require('node-fetch');

const {
    getUrlFromParams,
    getDate,
    genHashOfOtp
} = require("./utils");

const {
    OTP_GEN_URL,
    VALIDATE_OTP_URL,
    SEARCH_DISTRICT_API_URL,
    STATE_URL,
    DISTRICT_URL
} = require("./constants");

const API_HEADERS = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'authority': 'cdn-api.co-vin.in',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    'dnt': '1',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    'origin': 'https://apisetu.gov.in',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2',
    'accept-language': 'en-US,en;q=0.9,zh;q=0.8,ja;q=0.7,ko;q=0.6'
};

/**
 * Fetches stateId from state name
 * @param {*} stateName 
 * @returns 
 */
const fetchStateIdByStateName = async(stateName) => {
    try {
        const response = await fetch(STATE_URL, {
            method: 'GET',
            headers: API_HEADERS
        });
        const data = await response.json();
        const [state] = data.states.filter(state => state.state_name === stateName);
        return state ? state.state_id : "";
    } catch (e) {
        console.error("Request failed...", e);
        throw e;
    }
};

/**
 * Fetches districtID from stateId and district name
 * @param {*} stateId 
 * @param {*} districtName 
 * @returns 
 */
const fetchDistrictIdFromStateIdAndDistrictName = async(stateId, districtName) => {
    try {
        const response = await fetch(encodeURI(DISTRICT_URL + "/" + stateId), {
            method: 'GET',
            headers: API_HEADERS
        });
        const data = await response.json();
        const [district] = data.districts.filter(district => district.district_name === districtName);
        return district ? district.district_id : "";
    } catch (e) {
        console.error("Request failed...", e);
        throw e;
    }
};

/**
 * Fetches the txnId from mobile number and send OTP in SMS
 * @param {*} mobile 
 * @returns 
 */
const fetchTxnIdByMobile = async(mobile) => {
    const otpPayload = { mobile };
    try {
        const response = await fetch(OTP_GEN_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(otpPayload),
        });
        console.log("status", response.status);
        if (response.status === 400) {
            console.log("OTP already sent, please try after 3 mins");
        }
        const data = await response.json();
        return data.txnId
    } catch (e) {
        console.error("Request failed...", e);
        throw e;
    }
};

/**
 * Takes the OTP from the user and the txnID to get auth token
 * @param {*} otp 
 * @param {*} txnId 
 * @returns 
 */
const fetchTokenByTxnIdAndOtp = async(otp, txnId) => {
    const validatePayload = { otp: genHashOfOtp(otp), txnId };
    try {
        const response = await fetch(VALIDATE_OTP_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(validatePayload),
        });
        const data = await response.json();
        return data.token
    } catch (e) {
        console.error("Request failed...", e);
        throw e;
    }
};

/**
 * Takes the districtID and auth token to find availability
 * @param {*} districtId 
 * @param {*} token 
 * @returns 
 */
const fetchAvailabilityByDistrict = async(districtId, token) => {
    const byDisrictURL = getUrlFromParams(SEARCH_DISTRICT_API_URL, { district_id: districtId, date: getDate() });
    try {
        const response = await fetch(byDisrictURL, {
            method: 'GET',
            headers: {...API_HEADERS,
                accept: "application/json, text/plain, */*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,zh;q=0.8,ja;q=0.7,ko;q=0.6",
                authorization: "Bearer " + token
            }
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Request failed...", e);
        throw e;
    }
};

module.exports = {
    fetchStateIdByStateName,
    fetchDistrictIdFromStateIdAndDistrictName,
    fetchTxnIdByMobile,
    fetchTokenByTxnIdAndOtp,
    fetchAvailabilityByDistrict
}