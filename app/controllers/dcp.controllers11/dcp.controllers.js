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
  exports.cid = (req, res) => {
     connection.query('select client_id from demographics_with_product_id where client_id=?', [req.params.client_id],function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  };
  
  exports.categorytop5 = (req, res) => {
     connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,CLIENT_ID,DATE_FORMAT(TRANSACTION_DATE,"%Y-%m-%d") as TRANSACTION_DATE,sum(AMOUNT) as AMOUNT FROM transaction where CLIENT_ID=? and TRANSACTION_DATE >= ? AND TRANSACTION_DATE <= ? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 5',[req.params.CLIENT_ID,req.params.FromDate,req.params.ToDate],function (error, results, fields) {
      //connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,CLIENT_ID,DATE_FORMAT(TRANSACTION_DATE,"%Y-%m-%d") as TRANSACTION_DATE,sum(AMOUNT) as AMOUNT FROM transaction where CLIENT_ID=? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 5',[req.params.CLIENT_ID],function (error, results, fields) { 
     if (error) 
      {
        console.log('categorytop5');
        throw error;
      }
      
      res.end(JSON.stringify(results));
    });
  };
  
  exports.mapplot = (req, res) => {
     connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,BILLING_PLACE,CATEGORY,CLIENT_ID,TRANSACTION_DATE,AMOUNT FROM transaction where CLIENT_ID=?',[req.params.CLIENT_ID],function (error, results, fields) {
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
  
  exports.login= (req, res) => {
     var client_id = request.body.client_id;
    if (client_id) {
      connection.query('SELECT * FROM demographics_with_product_id WHERE client_id = ?', [client_id], function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.client_id = client_id;
          response.redirect('/persona');
        } else {
          response.send('Incorrect Username and/or Password!');
        }     
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  };
  
  exports.getmapdetails = (req, res) => {
    connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,CATEGORY FROM persona_weighted_transaction limit 50',function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
  };