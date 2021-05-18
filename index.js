/**
 * Built by Amardeep Bhowmick
 */

const {
    getOtpFromUser,
    getAvailability
} = require("./utils");

const {
    fetchStateIdByStateName,
    fetchDistrictIdFromStateIdAndDistrictName,
    fetchTxnIdByMobile,
    fetchTokenByTxnIdAndOtp,
    fetchAvailabilityByDistrict
} = require("./api");

const [_, __, mobile, age, stateName, districtName, ...rest] = process.argv;

const performSearch = (data) => {
    let counter = 1000;
    const isSlotAvailabe = getAvailability(data, age);
    if (!isSlotAvailabe) {
        console.log("No slots available...");
        console.log("......");
    }
    counter--;
    if (counter !== 0) {
        setTimeout(() => performSearch(data), 1000);
    }
};

(async() => {
    const stateId = await fetchStateIdByStateName(stateName);
    const districtId = await fetchDistrictIdFromStateIdAndDistrictName(stateId, districtName);
    const txnId = await fetchTxnIdByMobile(mobile);
    const otp = await getOtpFromUser();
    const token = await fetchTokenByTxnIdAndOtp(otp, txnId);
    const data = await fetchAvailabilityByDistrict(districtId, token);
    setTimeout(() => performSearch(data), 0);
})();