const database = require("./database");
const express = require("express");

router = express.Router();

//API_ID=1
router.get("/transaction/recent", (request, response) => {
    database.connection.query(`select trans_type, trans_des, timestamp, amount
                               from transaction
                               where user_id = ${request.query.user_id}
                               order by timestamp desc
                               limit 5`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=2
router.get("/transaction/all", (request, response) => {
    database.connection.query(`select trans_type, trans_des, timestamp, amount
                               from transaction
                               where user_id = ${request.query.user_id}
                               order by timestamp desc`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=12
router.get("/transaction/all_allCol", (request, response) => {
    database.connection.query(`select *
                               from transaction
                               where user_id = ${request.query.user_id}
                               order by timestamp desc`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=7
router.post("/transaction/add", (request, response) => {
    database.connection.query(`insert into transaction (user_id, timestamp, trans_type, trans_des, amount)
               values ('${request.body.user_id}', 
               '${request.body.timestamp}', 
               '${request.body.trans_type}', 
               '${request.body.trans_des}',
               '${request.body.amount}')`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});


// //POST transaction

// router.post("/transaction/add", add_new_transaction);

// function add_new_transaction(request, response) {
//     database.connection.query(
//       `insert into transaction (user_id, timestamp, trans_type, trans_des, amount) 
//           values ('${request.body.user_id}', 
//           '${request.body.timestamp}', 
//           '${request.body.trans_type}', 
//           '${request.body.trans_des}',
//           '${request.body.amount}')`,
//       (error, results) => {
//         if (error) {
//           console.log(error);
//           response.status(500).send("Internal Server Error");
//         } else {
//           response.status(200).send("Added new transaction successfully!");
//         }
//       }
//     );
//   }

module.exports = {
    router,
};


/*
router.get("/transaction/by-tid", (request, response) => {
    if (request.query.id.length === 0 || isNaN(request.query.id)) {
        console.log(`Invalid ID received. ID: ${request.query.id}`);
        response.status(400).send("Invalid ID received.");
        return;
    }
    database.connection.query(
        `select *
         from transaction
         where transaction_id = ${request.query.id}`,
        (errors, results) => {
            if (errors) {
                console.log(errors);
                response.status(500).send("Internal Serve Error");
            } else {
                response.status(200).send(results);
            }
        }
    );
});
*/