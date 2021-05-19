## Vaccine slot availability checker

This is a node script to query the cowin public APIs @ https://apisetu.gov.in/public/marketplace/api/cowin/

### Remarks
 - This tool is only for checking the vaccinaion slot and not for booking.
 - Use two phone numbers, one for checking in this tool and one for booking from the cowin website.
 - Change into the directory `cd CowinSlotChecker`.
 - Then run in the same directory: `node .\index.js <mobile_number> <age> <state_name> <district_name>`
 - Age could be either 45 or 18.
 - If state name or district name has a space use double quotes.
 - State names are exactly the same as listed in the cowin website.
 - District names are exactly the same as in cowin website.
 - Upon receiving the otp after you run the script, please enter in the promt.
 - The script will query the status 100 times once every 3 secs.

 ### Installation

Install NodeJS
 - https://nodejs.org/en/download/
 - node > 12+
 - check `node -v`
 - check `npm -v`
 - If these commands work, it means now you can run the script.

 Clone the repo
 - `git clone <repo_url>`

 Install dependencies 
 - `npm i`

 Example Usage
  - `node ./index.js 9999999999 18 Jharkhand "East Singhbhum"`

### Screen shot

[![script.png](https://i.postimg.cc/x8yCVG2K/script.png)](https://postimg.cc/H8nHQyjx)