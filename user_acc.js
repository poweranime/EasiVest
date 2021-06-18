const database = require("./database");
const express = require("express");

router = express.Router();

//API_ID=5
router.get("/user/trans_bal", (request, response) => {
    database.connection.query(`select trans_bal
                               from user
                               where user_id = ${request.query.user_id}`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=9
router.post("/user/update_trans_bal", (request, response) => {
    database.connection.query(`update user
                               set trans_bal = ${request.body.trans_bal}
                               where user_id = ${request.query.user_id}`, (errors, results) => { //                               from transaction`, (errors, results) =>  //set trans_bal = ${request.body.trans_bal}
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=6
router.get("/user/invest_bal", (request, response) => {
    database.connection.query(`select dbs_fund_bal, ocbc_fund_bal, uob_fund_bal
                               from user
                               where user_id = ${request.query.user_id}`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=14
router.get("/user/allCol", (request, response) => {
    database.connection.query(`select *
                               from user
                               where user_id = ${request.query.user_id}`, (errors, results) => { //                               from transaction`, (errors, results) => 
        if (errors) {
            console.log(errors);
            response.status(500).send("Internal Serve Error");
        } else {
            response.status(200).send(results);
        }
    });
});

//API_ID=10
router.post("/user/update_inv_bal", update_inv_bal);

function update_inv_bal(request, response) {
    database.connection.query(  `update user
                                set dbs_fund_bal = ${request.body.dbs_fund_bal}, ocbc_fund_bal = ${request.body.ocbc_fund_bal}, uob_fund_bal = ${request.body.uob_fund_bal}
                                where user_id = ${request.query.user_id}`,
                                (error, results) => {
                                    if (error) {
                                      console.log(error);
                                      response.status(500).send("Internal Server Error");
                                    } else {
                                      response.status(200).send("Updated successfully!");
                                    }
                                  }
                                );
                              }


module.exports = {
    router,
};


router.post("/user/update_inv_bal", update_inv_bal);



// router.get("/user/by-uid", (request, response) => {
//     if (request.query.id.length === 0 || isNaN(request.query.id)) {
//         console.log(`Invalid ID received. ID: ${request.query.id}`);
//         response.status(400).send("Invalid ID received.");
//         return;
//     }
//     database.connection.query(
//         `select *
//          from user  
//          where user_id = ${request.query.id}`, // from user where id = ${request.query.id}`,
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