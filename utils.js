/**
 * @author Amardeep Bhowmick <amardeep.bhowmick92@gmail.com>
 */
const crypto = require("crypto");
const readline = require('readline');
const dateFormat = require("dateformat");

/**
 * Constructs the full URl from the query params object
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
const getUrlFromParams = (url, params) => {
    const query = Object.entries(params)
        .map(([key, value]) => key + "=" + value)
        .join("&");
    return url + "?" + query;
};

/**
 * Gets the OTP from the command line
 * @returns 
 */
const getOtpFromUser = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question("Please Enter OTP (Wait for 3 mins before retrying): ", ans => {
        rl.close();
        resolve(ans);
    }));
};

/**
 * Gets the current date in dd-mm-yyyy format
 * @returns 
 */
const getDate = () => {
    var now = new Date();
    return dateFormat(now, "dd-mm-yyyy");
};

/**
 * Gets the SHA256 hash of the OTP
 * @param {*} otp 
 * @returns 
 */
const genHashOfOtp = (otp) => {
    const hash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    return hash;
};

/**
 * Checks the availability by the slot data and the age supplied
 * @param {*} data 
 * @param {*} age 
 * @returns 
 */
const getAvailableVaccinationCenters = (data, age) => {
    return data.centers.filter(center => {
        const availableSessions = center.sessions.filter(session => {
            return session.available_capacity > 0 && session.min_age_limit == age
        });
        if (availableSessions.length) {
            return true;
        }
        return false;
    });
};

module.exports = {
    getUrlFromParams,
    getOtpFromUser,
    getDate,
    genHashOfOtp,
    getAvailableVaccinationCenters
}