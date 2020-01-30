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
var dbconfig =
{
  user : process.env.NODEORACLEDB_USER || "triana",
  password : process.env.NODEORACLEDB_PASSWORD || "triana",
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "61.111.14.78/youhostdb"
}


app.get('/api/buffercache', (req,res) => {
  oracledb.getConnection(dbconfig,
  function(err, connection){
      if(err) {
        console.error(err.message);
        return;
      }
      console.log(req.body);

      var query = "SELECT	* FROM	TRIANA.BUF_BUFFER ORDER BY 1 ASC";

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
    
  function doRelease(connection, buffercache){
    connection.close(function(err){
      if(err){
        console.error(err.message);
      }

      console.log('list size: ' + buffercache.length);

      for(var i=0; i<buffercache.length; i++){
        console.log('buffer cache: ' + buffercache[i][i]);
      }

      res.send(buffercache);
    });
  }
});



app.get('/api/diccache', (req,res) => {
  oracledb.getConnection(dbconfig,
  function(err, connection){
      if(err) {
        console.error(err.message);
        return;
      }
      console.log(req.body);

      var query2 = "SELECT	* FROM	TRIANA.BUF_DICTIONARY ORDER BY 1 ASC";

      connection.execute(query2, function(err,result){
        if (err) {
          console.err(err.message);

          doRelease2(connection);
          return;
        }
        console.log(result.rows);
        doRelease2(connection, result.rows);
        });
    });
    
  function doRelease2(connection, diccache){
    connection.close(function(err){
      if(err){
        console.error(err.message);
      }

      console.log('list size: ' + diccache.length);

      for(var i=0; i<diccache.length; i++){
        console.log('dictionary cache: ' + diccache[i][i]);
      }

      res.send(diccache);
    });
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
