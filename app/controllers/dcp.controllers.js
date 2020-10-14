var mysql      = require('mysql2');
var connection = mysql.createConnection({
host     : 'localhost', 
  user     : 'root', 
  password : 'MySQL@123', 
  database : 'mypersonadb'
  });
  connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
  
exports.listall = (req, res) => {
  connection.query('select * from demographics_with_product_id', function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  
  exports.listbyid = (req, res) => {
   console.log(req);
     connection.query('select * from demographics_with_product_id where client_id=?', [req.params.client_id], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  exports.listbyfirst = (req, res) => {
   console.log(req);
     connection.query('select * from demographics_with_product_id where first=?', [req.params.first], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  exports.listbylast = (req, res) => {
   console.log(req);
     connection.query('select * from demographics_with_product_id where last=?', [req.params.last], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  exports.listbyemail = (req, res) => {
   console.log(req);
     connection.query('select * from demographics_with_product_id where email=?', [req.params.email], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  exports.listcid = (req, res) => {
     connection.query('select client_id,first,last,email from demographics_with_product_id ',function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  exports.listcid1 = (req, res) => {
     connection.query('select client_id,first from demographics_with_product_id ',function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  exports.cid = (req, res) => {
     connection.query('select client_id from demographics_with_product_id where client_id=?', [req.params.client_id],function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  
  exports.categorytop5 = (req, res) => {
    connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,CLIENT_ID,DATE_FORMAT(TRANSACTION_DATE,"%Y-%m-%d") as TRANSACTION_DATE,sum(AMOUNT) as AMOUNT FROM transaction where CLIENT_ID=? and TRANSACTION_DATE >= ? AND TRANSACTION_DATE <= ? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 5',[req.params.CLIENT_ID,req.params.FromDate,req.params.ToDate],function (error, results, fields) {
    if (error) 
     {
       console.log('categorytop5');
       throw error;
     }
     
     res.end(JSON.stringify(results));
   });
 };

exports.mapplot = (req, res) => {
    connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,CLIENT_ID,DATE_FORMAT(TRANSACTION_DATE,"%Y-%m-%d") as TRANSACTION_DATE,AMOUNT FROM transaction where CLIENT_ID=? and TRANSACTION_DATE >= ? AND TRANSACTION_DATE <= ?',[req.params.CLIENT_ID,req.params.FromDate,req.params.ToDate],function (error, results, fields) { 
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
 };
exports.childnodes = (req, res) => {
 //SELECT BILLING_PLACE,CATEGORY FROM (SELECT *, @count := IF(@current_category = CATEGORY, @count + 1, 1) AS count,@current_category := CATEGORY FROM transaction ORDER BY CATEGORY, TRANSACTION_DATE>= date_sub(CURDATE(), interval 3 year)) ranked WHERE count <= 2;
    connection.query('select CLIENT_ID,CATEGORY,BILLING_PLACE,AMOUNT,TRANSACTION_DATE from (SELECT CLIENT_ID,CATEGORY,BILLING_PLACE,AMOUNT,TRANSACTION_DATE,@product_rank := IF(@current_product = CATEGORY, @product_rank + 1, 1) AS product_rank,@current_product := CATEGORY FROM transaction  where CLIENT_ID=? and TRANSACTION_DATE>=? and TRANSACTION_DATE<=? ORDER BY CATEGORY, AMOUNT desc) ranked_rows where product_rank<=5',[req.params.CLIENT_ID,req.params.FromDate,req.params.ToDate],function (error, results, fields) { 
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
 };

  exports.categorytop10 = (req, res) => {
     connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,client_id,DATE,sum(AMOUNT) as AMOUNT FROM persona_weighted_transaction where CLIENT_ID=? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 10',[req.params.CLIENT_ID],function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  
  exports.getmapdetails = (req, res) => {
    connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,CATEGORY FROM persona_weighted_transaction limit 50',function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
  };
  
  exports.categorytop5withdate = (req, res) => {
     connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,CLIENT_ID,DATE_FORMAT(TRANSACTION_DATE,"%Y-%m-%d") as TRANSACTION_DATE,sum(AMOUNT) as AMOUNT FROM transaction where CLIENT_ID=? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 5',[req.params.CLIENT_ID],function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };