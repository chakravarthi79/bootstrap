const balance= document.querySelector("#balance");
const money_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");

// const dummyTransaction = [
//     {id : 1, text : "flower", amount : -25},
//     {id : 1, text : "book", amount : -70},
//     {id : 1, text : "recharge", amount : -249},
//     {id : 1, text : "currentbill", amount : -800},

// ];

// let transactions = dummyTransaction;
const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );
  let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
  



function  addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === ""){
        alert("please enter text and amount");
    }
    else{
        const transaction = {
            id: generateID(),
            text : text.value,
            amount : +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
        text.value  = "";
        amount.value  = "";
    }
}

function generateID(){
    return Math.floor(Math.random() *100000000000);
}

function addTransactionDOM(transaction){
    const sign  = transaction.amount < 0 ? "-":"+";
    const item = document.createElement("li");

    //add class based on value
    item.classList.add(transaction.amount <0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;
  list.appendChild(item);
}
//Update the balance income and expence
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense = (
      amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);
  
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
  }

function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    updateLocalStorage();
    Init();
  }

  function updateLocalStorage(){
    localStorage.setItem("transaction", JSON.stringify(transactions));
  }
  //Init App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();

form.addEventListener("submit", addTransaction)


