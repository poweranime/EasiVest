//const fetch = require("node-fetch"); //only needed for run inside nodeJS, to be removed when integrated with HTML

//---------------------------------------------------------
// ----------Initialise variables ----------
//---------------------------------------------------------
var user_id = 1;
var trans_amount, trans_type_, trans_des_, input_amount, today, fundChoice, invest_amount, transaction_id, risk_profile_, nav_price_, brokerage_
var date 
//var login_id = 'Newberry'; 
//var password = 'crTufWpe';


// // ----------Generate current date and time----------
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();
// var hh = today.getHours();
// var min = today.getMinutes();
// var ss = today.getSeconds();

// today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
// console.log(today);

//---------------------------------------------------------
//----------Functions----------
//---------------------------------------------------------

//----------DateTime Function----------
function generateCurrentDateTime () {
    // ----------Generate current date and time----------
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var ss = today.getSeconds();

    today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
    return today;

}

//----------Login Function----------
function getUserByLogin() {
    event.preventDefault();
    var login_id = document.getElementById('loginID').value; 
    var password = document.getElementById('password').value; 
    console.log("login id is " + login_id);
    fetch(`http://localhost:3000/user/login?login_id='${login_id}'`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {            
            data.forEach((item) => {
                if (password===item.password) {
                    user_id = item.user_id;
                    risk_profile_ = item.risk_profile;
                    updateValues()
                }
                //document.querySelector('#balance').innerHTML = `$ ${item.trans_bal}`
                //console.log(item.trans_bal);
            });



        })
        .catch((error) => console.log("error", error));

};

//----------Refresh/Update Display Function Group----------
function getTransByIdAll() {
    fetch(`http://localhost:3000/transaction/all?user_id=${user_id}`, {method: "GET"}) //    fetch("http://localhost:3000/transaction/all", {method: "GET"})
        .then((response) =>  response.json())
        .then((data) => {

            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Transaction Type</th> 
                  <th>Date</th>
                  <th>Amount</th>
                </tr>`; 

            data.forEach((item) => {
                //Convert datetime format to just date
                date = String(item.timestamp);
                date = date.substring(0,10);

                text += `
                    <tr>
                      <td>${item.trans_type}<br>${item.trans_des}</td>
                      <td>${date}</td>
                      <td>${item.amount}</td>
                    </tr>`;
                
            });
            text += "</table>";
            document.querySelector('.transTable').innerHTML = text;


        })
        .catch((error) => console.log("error", error));

};

function getTransByIdRecent() {
    fetch(`http://localhost:3000/transaction/recent?user_id=${user_id}`, {method: "GET"}) 
        .then((response) =>  response.json())
        .then((data) => {
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Transaction Type</th> 
                  <th>Date</th>
                  <th>Amount</th>
                </tr>`; 

            data.forEach((item) => {
                //Convert datetime format to just date
                date = String(item.timestamp);
                date = date.substring(0,10);

                text += `
                    <tr>
                      <td>${item.trans_type}<br>${item.trans_des}</td>
                      <td>${date}</td>
                      <td>${item.amount}</td>
                    </tr>`;
            });
            text += "</table>";
            document.querySelector('.transTable').innerHTML = text;


        })
        .catch((error) => console.log("error", error));

};

function getInvestByIdAll() {
    fetch(`http://localhost:3000/investment/all?user_id=${user_id}`, {method: "GET"}) 
        .then((response) =>  response.json())
        .then((data) => {
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Investment Name</th> 
                  <th>Date</th>
                  <th>Bought/ Sold</th>
                  <th>Amount</th>
                </tr>`; 

            var boughtSold
            
            data.forEach((item) => {
                if (item.amount < 0) {
                    boughtSold = 'Sold';
                } else {boughtSold = 'Bought'};

                //Convert datetime format to just date
                date = String(item.timestamp);
                date = date.substring(0,10);

                text += `
                    <tr>
                      <td>${item.investment_name}</td>
                      <td>${date}</td>
                      <td>${boughtSold}</td>
                      <td>${item.amount}</td>
                    </tr>`;
            });
            text += "</table>";
            document.querySelector('.investTable').innerHTML = text;

        })
        .catch((error) => console.log("error", error));
};

function getInvestByIdRecent() {
    fetch(`http://localhost:3000/investment/recent?user_id=${user_id}`, {method: "GET"}) 
        .then((response) =>  response.json())
        .then((data) => {
            var text = `
              <table class="GeneratedTable">
                <tr>
                  <th>Investment Name</th> 
                  <th>Date</th>
                  <th>Bought/ Sold</th>
                  <th>Amount</th>
                </tr>`; 

            var boughtSold
            
            data.forEach((item) => {
                if (item.amount < 0) {
                    boughtSold = 'Sold';
                } else {boughtSold = 'Bought'};

                //Convert datetime format to just date
                date = String(item.timestamp);
                date = date.substring(0,10);

                text += `
                    <tr>
                      <td>${item.investment_name}</td>
                      <td>${date}</td>
                      <td>${boughtSold}</td>
                      <td>${item.amount}</td>
                    </tr>`;
            });
            text += "</table>";
            document.querySelector('.investTable').innerHTML = text;

        })
        .catch((error) => console.log("error", error));
};

function getTransBalById() {
    fetch(`http://localhost:3000/user/trans_bal?user_id=${user_id}`, {method: "GET"}) 
        .then((response) =>  response.json())
        .then((data) => {            
            data.forEach((item) => {
                document.querySelector('#balance').innerHTML = `$ ${item.trans_bal}`
            });


        })
        .catch((error) => console.log("error", error));
};

function getInvestBalById() {
    fetch(`http://localhost:3000/user/invest_bal?user_id=${user_id}`, {method: "GET"}) 
        .then((response) =>  response.json())
        .then((data) => {            
            data.forEach((item) => {
                document.querySelector('#DBSfundVal').innerHTML = `$ ${item.dbs_fund_bal}`
                document.querySelector('#OCBCfundVal').innerHTML = `$ ${item.ocbc_fund_bal}`
                document.querySelector('#UOBfundVal').innerHTML = `$ ${item.uob_fund_bal}`
            });


        })
        .catch((error) => console.log("error", error));
};

function updateValues() {
  getTransByIdRecent();
  getInvestByIdRecent();
  getTransBalById();
  getInvestBalById();
}

//----------END OF Refresh/Update Display Function Group----------


//----------Top-up and Trasnfer Functions Group----------
function addTrans() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    today = generateCurrentDateTime ();
    console.log(today);
  
    // Populate this data from e.g. form.
    var raw = JSON.stringify({
      user_id: user_id,
      timestamp: today,
      trans_type: trans_type_,
      trans_des: trans_des_,
      amount: trans_amount,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
  
    fetch("http://localhost:3000/transaction/add", requestOptions)
      .then((response) => response.text())
      .then((result) => updateTransBalById()) //.then((result) => console.log(result)) 
      .catch((error) => console.log("error", error));
  }

function updateTransBalById() {

    fetch(`http://localhost:3000/user/trans_bal?user_id=${user_id}`, {method: "GET"}) // first get the latest balance from user data base
        .then((response) =>  response.json())
        .then((data) => {            
            data.forEach((item) => {
                var balanceNew = parseFloat(item.trans_bal) + parseFloat(trans_amount); //then calculate updated balance = retrieved balance + transaction amount
                console.log("balanceNew");
                console.log(balanceNew);
                //balanceNew = 8000; 

                //--Create json of input data
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    trans_bal: balanceNew, 
                  });
                
                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                  };
                //--end of Create json of input data

                fetch(`http://localhost:3000/user/update_trans_bal?user_id=${user_id}`, requestOptions) //generate command to update balance
                  .then((response) => response.text())
                  .then((result) => updateValues())  //then update values displayed on HTML
                  .catch((error) => console.log("error", error));
              

            });


        })
        .catch((error) => console.log("error", error));

};

function topUpSubmitButton() {
    event.preventDefault();
    input_amount = document.getElementById('topUpAmount').value; // keep a separate input_amount variable to check that user did not enter negative/ invalid inputs. Code example: var val = document.querySelector('#newNumber').value;
    console.log("function start");
    console.log(input_amount);
    console.log(document.getElementById('topUpAmount').value);
    //input_amount = 200; 
    trans_amount = input_amount;
    console.log(trans_amount); //if((val !== undefined) && (val !== "")) {
    trans_type_ = 'Top Up'; 
    trans_des_ = 'Mastercard';

    if((input_amount !== undefined) && (input_amount !== "") && (input_amount > 0)) {
        addTrans();
        closeFormTopUp();
    }

}

function transferSubmitButton() {
    event.preventDefault();
    input_amount = document.getElementById('transferAmount').value; // keep a separate input_amount variable to check that user did not enter negative/ invalid inputs. Code example: var val = document.querySelector('#newNumber').value;
    trans_amount = input_amount * -1;
    console.log("trans_amount is")
    console.log(trans_amount); //if((val !== undefined) && (val !== "")) {
    trans_type_ = 'Withdrawal'; 
    trans_des_ = 'PayNow';

    if((input_amount !== undefined) && (input_amount !== "") && (input_amount > 0)) {
        addTrans();
        closeFormTopUp();
    }


}

//----------END OF Top-up and Trasnfer Functions Group----------

//----------Buy and Sell Investments Functions Group----------
function addTransInv() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  today = generateCurrentDateTime ();
  console.log(today);

  // Populate this data from e.g. form.
  var raw = JSON.stringify({
    user_id: user_id,
    timestamp: today,
    trans_type: trans_type_,
    trans_des: trans_des_,
    amount: trans_amount,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3000/transaction/add", requestOptions)
    .then((response) => response.text())
    .then((result) => updateTransBalByIdInv()) //.then((result) => console.log(result)) 
    .catch((error) => console.log("error", error));
}

function updateTransBalByIdInv() {

  fetch(`http://localhost:3000/user/trans_bal?user_id=${user_id}`, {method: "GET"}) // first get the latest balance from user data base
      .then((response) =>  response.json())
      .then((data) => {            
          data.forEach((item) => {
              var balanceNew = parseFloat(item.trans_bal) + parseFloat(trans_amount); //then calculate updated balance = retrieved balance + transaction amount
              console.log("balanceNew");
              console.log(balanceNew);
              //balanceNew = 8000; 

              //--Create json of input data
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                  trans_bal: balanceNew, 
                });
              
              var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                };
              //--end of Create json of input data

              fetch(`http://localhost:3000/user/update_trans_bal?user_id=${user_id}`, requestOptions) //generate command to update balance
                .then((response) => response.text())
                .then((result) => addInvest())  //  .then((result) => updateValues()) 
                .catch((error) => console.log("error", error));
            

          });


      })
      .catch((error) => console.log("error", error));

};

function addInvest() {

  fetch(`http://localhost:3000/transaction/all_allCol?user_id=${user_id}`, {method: "GET"}) // first get the latest balance from user data base
      .then((response) =>  response.json())
      .then((data) => {
          // var i = 0;            
          // data.forEach((item) => {
          //     if (i === 0) {
          //       transaction_id = item.trans_id;
          //       //console.log("in inner loop")
          //     }
          //     i++;
          //     //console.log("item.trans_id is " + item.trans_id)
          //     //console.log("transaction ID is " + transaction_id);
          // });
          
          transaction_id = data[0].trans_id;
          console.log("test extraction: transaction ID is " + data[0].trans_id);

          //--Create json of input data
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
              trans_id: transaction_id,
              user_id: user_id,
              timestamp: today,
              risk_profile: risk_profile_,
              investment_name: fundChoice,
              amount: invest_amount,
              nav_price: nav_price_,
              brokerage: brokerage_,

            });
          
          var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
            };
          //--end of Create json of input data

          fetch(`http://localhost:3000/investment/add`, requestOptions) //generate command to update balance
            .then((response) => response.text())
            .then((result) => updateInvBalById())  // then update values displayed on HTML
            .catch((error) => console.log("error", error));

        

      })
      .catch((error) => console.log("error", error));

};

function updateInvBalById() {

  fetch(`http://localhost:3000/user/invest_bal?user_id=${user_id}`, {method: "GET"}) // first get the latest balance from user data base
      .then((response) =>  response.json())
      .then((data) => {            
          data.forEach((item) => {
              var DBSamt, OCBCamt, UOBamt
              DBSamt = 0;
              OCBCamt = 0;
              UOBamt = 0;

              if (fundChoice === "DBS Fund") {
                DBSamt = invest_amount;
              } else if (fundChoice === "OCBC Fund") {
                OCBCamt = invest_amount;
              } else if (fundChoice === "UOB Fund") {
                UOBamt = invest_amount;
              }

              var DBSbalNew = parseFloat(item.dbs_fund_bal) + parseFloat(DBSamt); //then calculate updated balance = retrieved balance + transaction amount
              var OCBCbalNew = parseFloat(item.ocbc_fund_bal) + parseFloat(OCBCamt); //then calculate updated balance = retrieved balance + transaction amount
              var UOBbalNew = parseFloat(item.uob_fund_bal) + parseFloat(UOBamt); //then calculate updated balance = retrieved balance + transaction amount
              console.log("Fund Balance New are " + DBSbalNew);
              console.log("Fund Balance New are " + OCBCbalNew);
              console.log("Fund Balance New are " + UOBbalNew);
              //balanceNew = 8000; 

              //--Create json of input data
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                  dbs_fund_bal: DBSbalNew,
                  ocbc_fund_bal: OCBCbalNew,
                  uob_fund_bal: UOBbalNew,
                });
              
              var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                };
              //--end of Create json of input data

              fetch(`http://localhost:3000/user/update_inv_bal?user_id=${user_id}`, requestOptions) //generate command to update balance
                .then((response) => response.text())
                .then((result) => updateValues())  //  .then((result) => updateValues()) 
                .catch((error) => console.log("error", error));
            

          });


      })
      .catch((error) => console.log("error", error));

};

function buySubmitButton() {
  event.preventDefault();
  input_amount = document.getElementById('buyAmount').value; // keep a separate input_amount variable to check that user did not enter negative/ invalid inputs. Code example: var val = document.querySelector('#newNumber').value;
  console.log("function start");
  console.log("input_amount is " + input_amount);
  //input_amount = 200; 
  trans_amount = input_amount * -1;
  invest_amount = trans_amount * -1;
  fundChoice = document.getElementById("fundBuy").value;
  console.log("trans_amount is " + trans_amount);
  console.log("invest_amount is " + invest_amount);  
  console.log("selected fund is " + fundChoice);
  trans_type_ = 'Investments'; 
  trans_des_ = fundChoice; 
  nav_price_ = 2.00;
  brokerage_ = 2.00;

  if((input_amount !== undefined) && (input_amount !== "") && (input_amount > 0)) {
      addTransInv(); // **to be updated
      closeFormTopUp(); // **to be updated
  }

}

function sellSubmitButton() {
  event.preventDefault();
  input_amount = document.getElementById('sellAmount').value; // keep a separate input_amount variable to check that user did not enter negative/ invalid inputs. Code example: var val = document.querySelector('#newNumber').value;
  trans_amount = input_amount;
  invest_amount = trans_amount * -1;
  fundChoice = document.getElementById("fundSell").value;
  console.log("trans_amount is " + trans_amount); 
  console.log("invest_amount is " + invest_amount); 
  console.log("selected fund is " + fundChoice);
  trans_type_ = 'Investments'; 
  trans_des_ = fundChoice; 
  nav_price_ = 2.00;
  brokerage_ = 2.00;

  if((input_amount !== undefined) && (input_amount !== "") && (input_amount > 0)) {
      addTransInv(); // **to be updated
      closeFormTopUp(); // **to be updated
  }


}


function init() {
    // document.querySelector('.transTable').innerHTML = 'Please login';
    // document.querySelector('.investTable').innerHTML = 'Please login';
    document.querySelector('#balance').innerHTML = `$ 0.00`;
    document.querySelector('#DBSfundVal').innerHTML = `$ 0.00`;
    document.querySelector('#OCBCfundVal').innerHTML = `$ 0.00`;
    document.querySelector('#UOBfundVal').innerHTML = `$ 0.00`;
}

window.onload = init();
// topUpSubmitButton();
// transactionButton();
// updateTransBalById();
// addTrans();
// getTransByIdRecent()
// getInvestByIdRecent()
// getTransBalById()
// getInvestByIdAll()

// 1. Update transaction record, by negative amount if buy
// 2. Update transaction balance 
// 3. Update investment record
// 4. Update investment balance, by negative amount if sell
// 5. Update display values

// function postData() {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
  
//     // Populate this data from e.g. form.
//     var raw = JSON.stringify({
//       type: 0,
//       name: "dixant mittal",
//       email: "dixant@email.com",
//       tolerance: 0.5,
//       wallet: 100000,
//     });
  
//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//     };
  
//     fetch("http://localhost:3000/user/add", requestOptions)
//       .then((response) => response.text())
//       .then((result) => $(".mypanel").html(result))
//       .catch((error) => console.log("error", error));
//   }


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

// function openForm() {
//   document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }

function openFormTopUp() {
    document.getElementById("myTopUpForm").style.display = "block";
  }
  
  function closeFormTopUp() {
    document.getElementById("myTopUpForm").style.display = "none";
  }
  
  function openFormTransfer() {
    document.getElementById("myTransferForm").style.display = "block";
  }
  
  function closeFormTransfer() {
    document.getElementById("myTransferForm").style.display = "none";
  }
  
  function openFormBuy() {
    document.getElementById("myBuyForm").style.display = "block";
  }
  
  function closeFormBuy() {
    document.getElementById("myBuyForm").style.display = "none";
  }
  
  function openFormSell() {
    document.getElementById("mySellForm").style.display = "block";
  }
  
  function closeFormSell() {
    document.getElementById("mySellForm").style.display = "none";
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
