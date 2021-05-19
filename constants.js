/**
 * @author Amardeep Bhowmick <amardeep.bhowmick92@gmail.com>
 */
const OTP_GEN_URL = "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP";
const VALIDATE_OTP_URL = "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP";
const SEARCH_DISTRICT_API_URL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict";
const STATE_URL = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
const DISTRICT_URL = "https://cdn-api.co-vin.in/api/v2/admin/location/districts";

module.exports = {
    OTP_GEN_URL,
    VALIDATE_OTP_URL,
    SEARCH_DISTRICT_API_URL,
    STATE_URL,
    DISTRICT_URL
}