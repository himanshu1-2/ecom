var paypal = require('paypal-rest-sdk');
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AYuZ_dh_X4BxMT7lJPqG_t8DZus8PzgFHnbaY5WniZ0KwH7QSySOgXLUDFMso9mpve4rgCtfpIeoVqb8', 
  'client_secret': 'EOrinuqDOB5gUaTHKMi8Ti86DrwG5LKDyrSEoLuSko0OVHJDV8lFYL9fpXsJtVqj_VwNAP8P03ZPojHR' // provide your client secret here 
});



router.get('/buy' , ( req , res ) => {
	// create payment object 
    var payment = {
            "intent": "authorize",
	"payer": {
		"payment_method": "paypal"
	},
	"redirect_urls": {
		"return_url": "http://127.0.0.1:3008/success",
		"cancel_url": "http://127.0.0.1:3008/err"
	},
	"transactions": [{
		"amount": {
			"total": 39.00,
			"currency": "INR"
		},
		"description": " a book on mean stack "
	}]
    }
	
	
	// call the create Pay method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
					// redirect to paypal where user approves the transaction 
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });
}); 


// success page 
router.get('/success' , (req ,res ) => {
    console.log(req.query); 
    res.redirect('/success.html'); 
})

// error page 
router.get('/err' , (req , res) => {
    console.log(req.query); 
    res.redirect('/err.html'); 
})

// app listens on 3000 port 




// helper functions 
var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
         if ( err ) {
             reject(err); 
         }
        else {
            resolve(payment); 
        }
        }); 
    });
}				



module.exports=router