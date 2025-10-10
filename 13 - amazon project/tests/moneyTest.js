import { formatCurrency } from "../scripts/utils/money.js"

console.log("test suite: format currency")
const formatCurrencyTestName = ["functional", "round up", "round down", "works w/zero"]
const formatCurrencyTestParams = [2095, 2000.5, 2000.4, 0]
const formatCurrencyTestExpected = ["20.95", "20.01", "20.00", "0.00"]
for(let i = 0; i < formatCurrencyTestParams.length; i++) {
    if(formatCurrency(formatCurrencyTestParams[i]) === formatCurrencyTestExpected[i]) {
        console.log(`format currency test: ${formatCurrencyTestName[i]} \nstatus (param: ${formatCurrencyTestParams[i]}): passed`)
    } else {
        console.log(`format currency test:${formatCurrencyTestName[i]} \n status (param: ${formatCurrencyTestParams[i]}): failed`)
    }
}