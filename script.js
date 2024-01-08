var currencyOne = document.getElementById("currency-one")
var currencyTwo = document.getElementById("currency-two")
var amountOne = document.getElementById("currency_one_value")
var amountTwo = document.getElementById("currency_two_value")
var swap = document.getElementById("swapBtn")
var currentCurrencyRate = document.getElementById("currentCurrencyRate")
let rates;

//update Rates function
function update(){
    let currOne = currencyOne.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currOne}`)
    .then(res => res.json())
    .then(data => {
        rates = data.rates;
        updateAmount()        
    })
}

//EventListeners
currencyOne.addEventListener("change", update)
currencyTwo.addEventListener("change", update)
amountOne.addEventListener("input", updateAmount)

swap.addEventListener("click", function(e){
    e.preventDefault()
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    update();
})

function updateAmount(){
    let currOne = currencyOne.value;
    let currTwo = currencyTwo.value;
    currentCurrencyRate.innerHTML = rates[currOne] + currOne + " = " + rates[currTwo] + currTwo;
    let newAmount = parseInt(amountOne.value) * rates[currTwo];
    amountTwo.innerHTML = newAmount.toFixed(2)
}

update()