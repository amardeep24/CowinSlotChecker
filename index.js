/**
 * @author Amardeep Bhowmick <amardeep.bhowmick92@gmail.com>
 */

const {
    getOtpFromUser,
    getAvailableVaccinationCenters
} = require("./utils");

const {
    fetchStateIdByStateName,
    fetchDistrictIdFromStateIdAndDistrictName,
    fetchTxnIdByMobile,
    fetchTokenByTxnIdAndOtp,
    fetchAvailabilityByDistrict
} = require("./api");

const [_, __, mobile, age, stateName, districtName, ...rest] = process.argv;

/**
 * Starts the process of querying the vaccine APIs every 3 secs.
 * @param {*} data 
 */
const performSearch = (data) => {
    let counter = 100;
    const vaccCenters = getAvailableVaccinationCenters(data, age);
    if (vaccCenters && vaccCenters.length) {
        vaccCenters.forEach(({
            name,
            address,
            block_name,
            pincode,
            fee_type,
            sessions
        }) => {
            console.log("=====================Vaccine available======================");
            const centerDetails =
                "Center name: " + name + "\n" +
                "Address: " + address + "\n" +
                "Block: " + block_name + "\n" +
                "Pincode: " + pincode + "\n" +
                "Payment type: " + fee_type + "\n";
            console.log(centerDetails);
            console.log("=========================Sessions===========================");
            sessions.forEach(({
                date,
                available_capacity,
                vaccine,
                available_capacity_dose1,
                available_capacity_dose2
            }) => {
                const sessionDetails =
                    "Date: " + date + "\n" +
                    "Capacity: " + available_capacity + "\n" +
                    "Vaccine administered: " + vaccine + "\n" +
                    "Dose 1 capacity: " + available_capacity_dose1 + "\n" +
                    "Dose 2 capacity: " + available_capacity_dose2 + "\n";
                console.log(sessionDetails);
            });
            console.log("============================================================");
        });
    } else {
        console.log("No slots available now.");
    }
    console.log("Retrying request in 3 secs ....");
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