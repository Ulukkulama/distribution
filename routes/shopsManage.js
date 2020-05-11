const express = require('express');

const SqlConnection = require('../dbConnection');


const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('jhg');
    console.log('shopManageRoute');
});

// ------------------------------- Add Shop ------------------------------- //
Router.put('/addShop', (req, res) => {

    console.log(req.body);

    const Query =

    "INSERT INTO tbl_shops " +
    " ( add_agent_id,branch_id , bis_name, bis_owner, contact_1, contact_2, add_line_1, add_line_2, add_line_3, email ) " +
    " VALUES " +
    ` ( "${req.body.agentId}","${req.body.branch_id}" ,"${req.body.sName}","${req.body.oName}","${req.body.cNum1}","${req.body.cNum2}","${req.body.add1}","${req.body.add2}","${req.body.add3}","${req.body.semail}" ) `;

        // "UPDATE" +
        // " tbl_agent_mst" +
        // " SET" +
        // " tbl_agent_mst.pass = '" + `${req.body.pass}` + "'" +
        // " WHERE" +
        // " tbl_agent_mst.agent_id = '" + `${req.body.aId}` + "'";

    console.log(Query);

    SqlConnection.query(Query,
        (err, rows, fields) => {

            // console.log(rows.length);


            if (!err) { // has not seql err
                console.log('updateSuccessFull');
                data = [{
                    status: '200',
                    message: 'Add Shope SuccessFully'
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

// ------------------ fetch shops ---------------------------------- //
Router.post('/fetch',(req,res)=>{

 	const Query='SELECT tbl_shops.id, tbl_shops.bis_name, tbl_shops.add_line_1, tbl_shops.add_line_2, tbl_shops.add_line_3' + 
				' FROM tbl_shops '+
				` WHERE tbl_shops.branch_id='${req.body.branch_id}' AND tbl_shops.bis_name LIKE '${req.body.bis_name}%' `;

	console.log(Query);

	 SqlConnection.query(Query,
        (err, rows, fields) => {

            console.log(rows);

            if (!err) { // has not seql err
                // console.log('updateSuccessFull');
                data = rows
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