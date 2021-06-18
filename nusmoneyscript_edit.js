//const fetch = require("node-fetch"); //only needed for run inside nodeJS, to be removed when integrated with HTML
var user_id = 1;
//let dataSample, dataSample2;

function getTransByIdAll() {
    fetch(`http://localhost:3000/transaction/all?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {
            //console.log(data);
            //dataSample = data;
            //return data;
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Transaction Type</th> 
                  <th>Timestamp</th>
                  <th>Amount</th>
                </tr>`; //localhost:3000/transaction/all?user_id=1

            data.forEach((item) => {
                text += `
                    <tr>
                      <td>${item.trans_type}</td>
                      <td>${item.timestamp}</td>
                      <td>${item.amount}</td>
                    </tr>`;
                
            });
            text += "</table>";
            document.querySelector('.transTable').innerHTML = text;
//            $(".transTable").html(text)

        })
        .catch((error) => console.log("error", error));
//        return dataSample;
};

function getTransByIdRecent() {
    fetch(`http://localhost:3000/transaction/recent?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {
            //console.log(data);
            //dataSample = data;
            //return data;
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Transaction Type</th> 
                  <th>Timestamp</th>
                  <th>Amount</th>
                </tr>`; //localhost:3000/transaction/all?user_id=1

            data.forEach((item) => {
                text += `
                    <tr>
                      <td>${item.trans_type}</td>
                      <td>${item.timestamp}</td>
                      <td>${item.amount}</td>
                    </tr>`;
            });
            text += "</table>";
            document.querySelector('.transTable').innerHTML = text;
//            $(".transTable").html(text)

        })
        .catch((error) => console.log("error", error));
//        return dataSample;
};

function getInvestByIdAll() {
    fetch(`http://localhost:3000/investment/all?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {
            //console.log(data);
            //dataSample = data;
            //return data;
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Investment Name</th> 
                  <th>Timestamp</th>
                  <th>Bought/ Sold</th>
                  <th>Amount</th>
                </tr>`; //localhost:3000/transaction/all?user_id=1

            var boughtSold
            
            data.forEach((item) => {
                if (item.amount < 0) {
                    boughtSold = 'Sold';
                } else {boughtSold = 'Bought'};
                text += `
                    <tr>
                      <td>${item.investment_name}</td>
                      <td>${item.timestamp}</td>
                      <td>${boughtSold}</td>
                      <td>${item.amount}</td>
                    </tr>`;
            });
            text += "</table>";
            document.querySelector('.investTable').innerHTML = text;
//            $(".transTable").html(text)

        })
        .catch((error) => console.log("error", error));
//        return dataSample;
};

function getInvestByIdRecent() {
    fetch(`http://localhost:3000/investment/recent?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {
            //console.log(data);
            //dataSample = data;
            //return data;
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Investment Name</th> 
                  <th>Timestamp</th>
                  <th>Bought/ Sold</th>
                  <th>Amount</th>
                </tr>`; //localhost:3000/transaction/all?user_id=1

            var boughtSold
            
            data.forEach((item) => {
                if (item.amount < 0) {
                    boughtSold = 'Sold';
                } else {boughtSold = 'Bought'};
                text += `
                    <tr>
                      <td>${item.investment_name}</td>
                      <td>${item.timestamp}</td>
                      <td>${boughtSold}</td>
                      <td>${item.amount}</td>
                    </tr>`;
            });
            text += "</table>";
            document.querySelector('.investTable').innerHTML = text;
//            $(".transTable").html(text)

        })
        .catch((error) => console.log("error", error));
//        return dataSample;
};

function getTransBalById() {
    fetch(`http://localhost:3000/user/trans_bal?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {            
            data.forEach((item) => {
                document.querySelector('#balance').innerHTML = `$ ${item.trans_bal}`
                //console.log(item.trans_bal);
            });

//            $(".transTable").html(text)

        })
        .catch((error) => console.log("error", error));
//        return dataSample;
};

function init() {
    // document.querySelector('.transTable').innerHTML = '';
    // document.querySelector('.invesetTable').innerHTML = '';
    // document.querySelector('#balance').innerHTML = `$ 0.00`
    getTransByIdRecent();
    getInvestByIdRecent();
    getTransBalById();
 }

window.onload = init();
// getTransByIdRecent()
// getInvestByIdRecent()
// getTransBalById()
//getInvestByIdAll()

// !async function getTransByIdAllv2() {
//     let fetchData = await fetch(`http://localhost:3000/transaction/all?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
//         .then((response) =>  response.json())
//         .then((data) => {
//             //console.log(data);
//             return data;
        
//         })
//         .catch((error) => console.log("error", error));
//         console.log(fetchData);
//         //return dataSample;
// }

// !async function(){
//     let data = await fetch("https://raw.githubusercontent.com/IbrahimTanyalcin/LEXICON/master/lexiconLogo.png")
//         .then((response) => response.blob())
//         .then(data => {
//             return data;
//         })
//         .catch(error => {
//             console.error(error);
//         });
    
//     console.log(data);
//     }();
    

// dataSample2 = getTransByIdAll();
// console.log(dataSample2);

// var x = 1;
// console.log(x);

// function getTransByIdAll() {
//   fetch("http://localhost:3000/transaction/recent", {method: "GET"})
//       .then((response) => response.json())
//       .then((data) => {
//           var text = `
//             <table>
//               <tr>
//                 <th>Transaction Type</th>
//                 <th>Timestamp</th>
//                 <th>Amount</th>
//               </tr>`;

//           data.forEach((item) => {
//               text += `
//                   <tr>
//                     <td>${item.trans_type}</td>
//                     <td>${item.timestamp}</td>
//                     <td>${item.amount}</td>
//                   </tr>`;
//           });
//           text += "</table>";
//           $(".mypanel").html(text);
//       })
//       .catch((error) => console.log("error", error));
// }

// function getTransByIdRecent() {
//   var id = document.getElementById("paramId").value;
//   fetch(`http://localhost:3000/transaction/by-tid?id=${id}`, {method: "GET"})
//       .then((response) => response.json())
//       .then((data) => {
//           var text = `
//             <table>
//               <tr>
//               <th>Transaction Type</th>
//               <th>Timestamp</th>
//               <th>Amount</th>
//               </tr>`;

//           data.forEach((item) => {
//               text += `
//                   <tr>
//                     <td>${item.trans_type}</td>
//                     <td>${item.timestamp}</td>
//                     <td>${item.amount}</td>
//                   </tr>`;
//           });
//           text += "</table>";
//           $(".mypanel").html(text);
//       })
//       .catch((error) => console.log("error", error));
// }

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// (c) Anuflora Systems 
// const balance = document.getElementById('balance');
// const money_plus = document.getElementById('deposit');
// const money_minus = document.getElementById('loan');
// const list = document.getElementById('list');
// const form = document.getElementById('form');
// const custname = document.getElementById('custname');
// const reco = document.getElementById('reco');

// const TransactionDataAll = [
//    { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
//    { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
//    { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
//    { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
//    { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 }

//   ];

//  var TransactionData = null;

// // Add transactions to DOM list
// function addTransactionDOM(transaction) {
//   const indbal_item = document.createElement('li');

//   if (transaction.deposit>=transaction.loan) {
//   indbal_item.classList.add('plus');
//   indbal_item.innerHTML = `
//   ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(
//     transaction.deposit-transaction.loan  
//   )}</span> 
//   `;}
 
//   else {indbal_item.classList.add('minus');
//   indbal_item.innerHTML = `
//   ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
//     transaction.deposit- transaction.loan  
//   )}</span> 
//   `;}


//   list.appendChild(indbal_item);


// // Update the balance, deposit and loan
// function updateValues() {
//   const deposits = TransactionData.map(transaction => transaction.deposit);
//   const loans = TransactionData.map(transaction => transaction.loan);
//   const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
//   const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
//   const bal = total_deposit - total_loan;
//   balance.innerText = `$${bal}`;
//   money_plus.innerText = `$${total_deposit}`;
//   money_minus.innerText = `$${total_loan}`;
//   reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
// }

// function init() {
//   list.innerHTML = '';
//   reco.innerHTML = '';
//   TransactionData = [...TransactionDataAll];
//   TransactionData.forEach(addTransactionDOM);
//   updateValues();
// }

// function filterTransaction(e) {
//   e.preventDefault();  //to prevent form from submitting and refreshing the page
//   list.innerHTML = '';
//   reco.innerHTML = '';
//   TransactionData = TransactionDataAll.filter(tran => tran.customername == custname.value);  
//   TransactionData.forEach(addTransactionDOM);
//   updateValues(); 
// }

// init();
// form.addEventListener('submit', filterTransaction);

// function myFunction() {

// }
