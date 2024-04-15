// Declare variables 
let money = 100;
let year = 2005;

let curr_symbol;
let curr_open;
let curr_high;
let curr_low;

let randStockInit = ["AAPL", "NVDA", "AMZN"]
let chosenStock = "";

// Function to fetch local weather data using latitude and longitude
const getStockData = async (symbol, date) => {
    try {
        // Fetch weather data from API using latitude and longitude
        const response = await fetch(`https://api.finage.co.uk/history/stock/open-close?stock=${ symbol }&date=${ date }&apikey=API_KEY26Z5D4VGTQ7XA38H8I1I0VC8L2OAZT6Z`);
        if (response.ok) {
            // If response is successful, parse the data and process it
            const data = await response.json();
            processWeatherData(data);
        } else {
            // If response is not successful, log the error
            console.error('Error:', response.status);
        }
    } catch (error) {
        // If an error occurs during the fetch, log the error
        console.error('Error:', error);
    }
};

// Function to process weather data
const processWeatherData = (data) => {
    // Extract necessary data from the response
    const symbol = data.symbol;
    const open = data.open;
    const high = data.high;
    const low = data.low;

    curr_symbol = data.symbol;
    curr_open = data.open;
    curr_high = data.high;
    curr_low = data.low;

    // Log the extracted data
    console.log('symbol:', symbol);
    console.log('open:', open);
    console.log('high:', high);
    console.log('low:', low);

    // Update the UI with the weather data
    document.getElementById('symbol').innerHTML = "Stock Name: " + String(symbol);
    document.getElementById('open').innerHTML = "Open: " + String(open) + "$";
    document.getElementById('high').innerHTML = "High: " + String(high) + "$";
    document.getElementById('low').innerHTML = "Low: " + String(low) + "$";

};

function chooseRandomStock() {
  let randomNumber = Math.floor(Math.random() * randStockInit.length);
  chosenStock = randStockInit[randomNumber];
}

// Event listener to get coordinates from IP when the DOM is loaded
chooseRandomStock();
window.addEventListener('DOMContentLoaded', getStockData(chosenStock, "2005-02-03"));

document.getElementById('moneyValue').textContent = "Wallet: " + money;
document.getElementById('yearDisplay').textContent = "Year: " + year;

function handleClick() {
  // Get the value of the input field
  const inputAmount = document.getElementById('InputInvestmentAmount').value * curr_high;

  // Check if the input amount is a valid number and if it's less than or equal to the available money
  if (!isNaN(inputAmount) && parseFloat(inputAmount) <= money) {
    // Subtract the input amount from the available money
    money -= parseFloat(inputAmount);
    document.getElementById('moneyValue').textContent = "Wallet: " + money.toFixed(2);
    year += 1;
    document.getElementById('yearDisplay').textContent = "Year: " + year;
  }
  handleProfitProcess(curr_high, document.getElementById('InputInvestmentAmount').value);
  console.log("Button clicked!");
}

async function handleProfitProcess(_old_high, shares){
  let old_high = _old_high;
  let old_shares = shares;
  await getStockData(chosenStock, `${year}-02-03`);
  document.getElementById('Results').textContent = `Results: In the next year, you sold your stock ${curr_symbol} and you made ${(curr_high - old_high) * shares}$`;
  money += (old_high * old_shares) + (curr_high - old_high) * old_shares;
  document.getElementById('moneyValue').textContent = "Wallet: " + money;
}

document.getElementById("Click").addEventListener("click", handleClick);

