/**
 * @author Amardeep Bhowmick <amardeep.bhowmick92@gmail.com>
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
    let counter = 100;
    const isSlotAvailabe = getAvailability(data, age);
    if (!isSlotAvailabe) {
        console.log("No slots available now.");
        console.log("Retrying request in 3 secs ....");
    }
    counter--;
    if (counter !== 0) {
        setTimeout(() => performSearch(data), 3000);
    }
};

(async() => {
    try {
        const stateId = await fetchStateIdByStateName(stateName);
        const districtId = await fetchDistrictIdFromStateIdAndDistrictName(stateId, districtName);
        const txnId = await fetchTxnIdByMobile(mobile);
        const otp = await getOtpFromUser();
        const token = await fetchTokenByTxnIdAndOtp(otp, txnId);
        const data = await fetchAvailabilityByDistrict(districtId, token);
        setTimeout(() => performSearch(data), 0);
    } catch (e) {
        console.error("Something went wrong, please try again...", e);
        throw e;
    }
})();