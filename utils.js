const crypto = require("crypto");
const readline = require('readline');
const dateFormat = require("dateformat");

const getUrlFromParams = (url, params) => {
    const query = Object.entries(params)
        .map(([key, value]) => key + "=" + value)
        .join("&");
    return url + "?" + query;
}

const getOtpFromUser = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question("Please Enter OTP (Wait for 3 mins before retrying)", ans => {
        rl.close();
        resolve(ans);
    }));
}

const getDate = () => {
    var now = new Date();
    return dateFormat(now, "dd-mm-yyyy");
}

const genHashOfOtp = (otp) => {
    const hash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    return hash;
}

const getAvailability = (data, age) => {
    return data.centers.some(center => {
        const availableSessions = center.sessions.filter(session => {
            return session.available_capacity > 0 && session.min_age_limit == age
        });
        if (availableSessions.length) {
            console.log("Slot available in: ", center.name, " located in ", center.address, " pincode ", center.pincode);
            console.log("Dose 1 capacity:", center.available_capacity_dose1, "Dose 2 capacity:", center.available_capacity_dose2);
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
    getAvailability
}