const express = require('express');

const SqlConnection = require('../dbConnection');


const Router = express.Router();

// Router.get('/', (req, res) => {
//     res.send('jhg');
// });

// ------------------------------------------------------------------------------------------- //
Router.post('/', (req, res) => {

    const Query =
        "SELECT" +
        " tbl_agent_prv.add_new_invoice," +
        " tbl_agent_prv.edit_invoice," +
        " tbl_agent_prv.prd_delivary," +
        " tbl_agent_prv.add_new_store," +
        " tbl_agent_prv.pending_payment," +
        " tbl_agent_prv.return_prd," +
        " tbl_agent_mst.pass," +
        " tbl_agent_mst.agent_id" +
        " FROM" +
        " tbl_agent_mst" +
        " INNER JOIN tbl_agent_prv ON tbl_agent_prv.agent_id = tbl_agent_mst.agent_id " +
        " WHERE" +
        " tbl_agent_mst.user_name = '" + `${req.body.user}` + "'";

    let data = [];

    SqlConnection.query(Query,
        (err, rows, fields) => {

            console.log(rows.length);

            if (!err) { // has not seql err
                if (rows.length > 0) { // has data

                    if (rows[0].pass == null) {
                        data = [{
                            status: '200',
                            message: 'Null Password',
                            data: [{
                                agentId: rows[0].agent_id,
                                addNewInv: rows[0].add_new_invoice[0],
                                editInv: rows[0].edit_invoice[0],
                                prdDev: rows[0].prd_delivary[0],
                                addNewStore: rows[0].add_new_store[0],
                                penPay: rows[0].pending_payment[0],
                                retPrd: rows[0].return_prd[0]
                            }]
                        }];
                        res.send(data);
                        return;

                    } else if (rows[0].pass == req.body.pass) {
                        data = [{
                            status: '200',
                            message: 'ok',
                            data: [{
                                agentId: rows[0].agent_id,
                                addNewInv: rows[0].add_new_invoice[0],
                                editInv: rows[0].edit_invoice[0],
                                prdDev: rows[0].prd_delivary[0],
                                addNewStore: rows[0].add_new_store[0],
                                penPay: rows[0].pending_payment[0],
                                retPrd: rows[0].return_prd[0]
                            }]
                        }];
                        res.send(data);
                        return;

                    } else { // wrong password and user name
                        data = [{
                            status: '400',
                            message: 'Unmatch Password'
                        }];
                        res.send(data);
                        return;
                    }

                } else { // has not data
                    data = [{
                        status: '400',
                        message: 'Bad Request'
                    }];
                    return;
                }
            }

            else { // server err
                console.log(err);
                data = [{
                    status: '500',
                    message: 'internal server Err'
                }];
                res.send(data);
            }
        });

});

// ------------------------------- setPassword ------------------------------- //
Router.put('/resPass', (req, res) => {

    console.log(req.body);

    const Query =
        "UPDATE" +
        " tbl_agent_mst" +
        " SET" +
        " tbl_agent_mst.pass = '" + `${req.body.pass}` + "'" +
        " WHERE" +
        " tbl_agent_mst.agent_id = '" + `${req.body.aId}` + "'";

    console.log(Query);

    SqlConnection.query(Query,
        (err, rows, fields) => {

            // console.log(rows.length);


            if (!err) { // has not seql err
                console.log('updateSuccessFull');
                data = [{
                    status: '200',
                    message: 'successfully password set'
                }];
                res.send(data);
            } else { // server err
                console.log(err);
                data = [{
                    status: '500',
                    message: 'internal server Err'
                }];
                res.send(data);
            }

        });

});


module.exports = Router;