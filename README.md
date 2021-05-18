## Vaccine slot availability checker

This is a node script to query the cowin public APIs @ https://apisetu.gov.in/public/marketplace/api/cowin/

### Remarks

 - Use two phone numbers, one for checking and one for booking.
 - Change into the directory `cd CowinSlotChecker`.
 - Then run in the same directory: `node .\index.js <mobile_number> <age> <state_name> <district_name>`
 - Age could be either 45 or 18.
 - State names are exactly the same as listed in the cowin website.
 - District names are exactly the same as in cowin website.
 - Upon receiving the otp after you run the script, please enter in the promt.
 - The script will query the status 1000 times once every sec.

 ### Installation

Install Node

 Clone the repo
 - `git clone <repo_url>`

 Install dependencies 
 - `npm i`

 Example Usage
  - `node ./index.js 9999999999 18 Jharkhand "East Singhbhum"`