const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('.database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
var oracledb = require('oracledb');
/*var dbConfig = require('dbconfig');*/
var dbconfig =
{
  user : process.env.NODEORACLEDB_USER || "hr",
  password : process.env.NODEORACLEDB_PASSWORD || "hr",
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "61.111.14.78/youhostdb"
}

/*
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});*/

app.get('/api/customers', (req,res) => {
  oracledb.getConnection({
    user : dbconfig.user,
    password : dbconfig.password,
    connectString : dbconfig.connectString
    },
  
  function(err, connection){
      if(err) {
        console.error(err.message);
        return;
      }
      console.log('==> userlist search query');

      var query = 'SELECT * FROM CUSTOMER';

    connection.execute(query, function(err,result){
      if (err) {
        console.err(err.message);

        doRelease(connection);
        return;
      }

      console.log(result.rows);

      doRelease(connection, result.rows);
      });
    });

  function doRelease(connection, userlist){
    connection.close(function(err){
      if(err){
        console.error(err.message);
      }

      console.log('list size: ' + userlist.length);

      for(var i=0; i<userlist.length; i++){
        console.log('name: ' + userlist[i][1]);
      }

      res.send(userlist);
  });
};
});




/*
app.get('/api/customers', (req,res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
          res.send(rows);
        }
    );
});
*/

app.listen(port, () => console.log(`Listening on port ${port}`));
