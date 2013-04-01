module.exports = (function () {
  var nodemailer = require ('nodemailer');

  //create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "red5wanderer@gmail.com",
      pass: "Usetheforce"
    }
  });

  var mailOptions = {
    from: "Bobby Poker Jedi <red5wanderer@gmail.com>", //sender address
    to: "robertnakano@gmail.com", //list of receivers
    subject: "E-mail Confirmation", // subject line
    text: "This should only be sent when the mail route is called.",
  }

  var confirmationEmail = {
    from: "Bobby Poker Jedi <red5wanderer@gmail.com>", //sender address
    to: "robertnakano@gmail.com", //list of receivers
    subject: "E-mail Confirmation", // subject line
    text: "This is a confirmation e-mail for bitpoker.",
  }

  // send mail with defined transport object
  var sendMessage = function() {
      smtpTransport.sendMail(confirmationEmail, function(error, response){
        if(error){
          console.log(error);
        }else{
          console.log("Message sent: " + response.message);
        }
        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
      });
  }

  return {sendMessage: sendMessage};
})();