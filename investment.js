
// Import database file to use the established mysql connection.
const database = require("./database");

// Import express to define URI mappings
const express = require("express");

// Define a router object which will hold the URI mappings.
router = express.Router();

//API_ID=4
// Define a mapping for a GET request on API path /investment/user_id
// to an arrow function which calls a mysql query and populates the response with the data.
router.get("/investment/all", (request, response) => {
    // Make a mysql query to get all the records from investment table.
    database.connection.query(
        `select investment_name, timestamp, amount
         from investment
         where user_id = ${request.query.user_id}
         order by timestamp desc`,
        (errors, results) => {
            // if the query failed, return a "failure" message to the frontend client.
            if (errors) {
                console.log(errors);
                response.status(500).send("Internal Serve Error"); // status(500) sets the status code to 500, which means some error occurred in the server.
            }
            // Otherwise, populate the response with the results.
            else {
                response.status(200).send(results); // status(200) sets the status code to 200, which means response is OK.
            }
        });
});

//API_ID=13
// Define a mapping for a GET request on API path /investment/by-invest_id
// to an arrow function which requires a parameter named id from the request
// and calls a mysql query and populates the response with the data.
router.get("/investment/all_allCol", (request, response) => {
    // Make a mysql query to get all the records from investment table.
    database.connection.query(
        `select *
         from investment
         where user_id = ${request.query.user_id}
         order by timestamp desc`,
        (errors, results) => {
            // if the query failed, return a "failure" message to the frontend client.
            if (errors) {
                console.log(errors);
                response.status(500).send("Internal Serve Error"); // status(500) sets the status code to 500, which means some error occurred in the server.
            }
            // Otherwise, populate the response with the results.
            else {
                response.status(200).send(results); // status(200) sets the status code to 200, which means response is OK.
            }
        });
});

// Define a mapping for a GET request on API path /investment/by-invest_id
// to an arrow function which requires a parameter named id from the request
// and calls a mysql query and populates the response with the data.
// router.get("/investment/all_allCol", (request, response) => {
//     // Before making a query, validate the id received from the request.
//     // If the id is empty or if the id is not a number, then return a "bad request" response.
//     if (request.query.id.length === 0 || isNaN(request.query.id)) {
//         console.log(`Invalid ID received. ID: ${request.query.id}`);
//         response.status(400).send("Invalid ID received.");
//         return;
//     }
//     // After the validation check, call a mysql query to request data from investment using the user_id received in the request.
//     database.connection.query(
//         `select *
//          from investment
//          where user_id = ${request.query.id}`,
//         (errors, results) => {
//             // if the query failed, return a "failure" message to the frontend client.
//             if (errors) {
//                 console.log(errors);
//                 response.status(500).send("Internal Serve Error"); // status(500) sets the status code to 500, which means some error occurred in the server.
//             }
//             // Otherwise, populate the response with the results.
//             else {
//                 response.status(200).send(results); // status(200) sets the status code to 200, which means response is OK.
//             }
//         }
//     );
// });

//API_ID=3
// Define a mapping for a GET request on API path /investment/by-uid
// to an arrow function which requires a parameter named id from the request
// and calls a mysql query and populates the response with the data.
router.get("/investment/recent", (request, response) => {
    // Make a mysql query to get all the records from investment table.
    database.connection.query(
        `select investment_name, timestamp, amount
         from investment
         where user_id = ${request.query.user_id}
         order by timestamp desc
         limit 5`,
        (errors, results) => {
            // if the query failed, return a "failure" message to the frontend client.
            if (errors) {
                console.log(errors);
                response.status(500).send("Internal Serve Error"); // status(500) sets the status code to 500, which means some error occurred in the server.
            }
            // Otherwise, populate the response with the results.
            else {
                response.status(200).send(results); // status(200) sets the status code to 200, which means response is OK.
            }
        });
});
// router.get("/investment/recent", (request, response) => {
//     if (request.query.id.length === 0 || isNaN(request.query.id)) {
//         console.log(`Invalid ID received. ID: ${request.query.id}`);
//         response.status(400).send("Invalid ID received.");
//         return;
//     }
//     database.connection.query(
//         `select investment_name, timestamp, amount
//         from investment
//         where user_id = ${request.query.user_id}
//         order by timestamp desc
//         limit 5`,
//         (errors, results) => {
//             if (errors) {
//                 console.log(errors);
//                 response.status(500).send("Internal Serve Error");
//             } else {
//                 response.status(200).send(results);
//             }
//         }
//     );
// });

//API_ID=8
router.post("/investment/add", (request, response) => {
    database.connection.query(`insert into investment (trans_id, user_id, timestamp, risk_profile, investment_name, amount, nav_price, brokerage)
                               values ('${request.body.trans_id}', 
                                '${request.body.user_id}', 
                                '${request.body.timestamp}', 
                                '${request.body.risk_profile}', 
                                '${request.body.investment_name}', 
                                '${request.body.amount}', 
                                '${request.body.nav_price}', 
                                '${request.body.brokerage}')`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});


module.exports = {
    router,
};



