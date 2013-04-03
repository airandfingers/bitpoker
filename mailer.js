module.exports = (function () {
  var nodemailer = require ('nodemailer');

  //create reusable transport method (opens pool of SMTP connections)
  var smtp_transport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'red5wanderer@gmail.com',
      pass: 'Usetheforce'
    }
  });

  var mail_options = {
    from: 'Bobby Poker Jedi <red5wanderer@gmail.com>', //sender address
    to: 'robertnakano@gmail.com', //list of receivers
    subject: 'E-mail Confirmation', // subject line
    text: 'This should only be sent when the mail route is called.',
  };

  // send confirmation email with a link to the confirmation route
  var sendConfirmationEmail = function(email_address, confirmation_code, username) {
    var confirmation_url = 'http://localhost:9000/verify_email?email=' + email_address +
                           '&confirmation_code=' + confirmation_code
      , greeting = 'Hi ' + username + '!'
      , confirmation_email = {
          from: 'Bobby Poker Jedi <red5wanderer@gmail.com>' //sender address
        , to: email_address //list of receivers
        , subject: 'Bitpoker E-mail Confirmation' // subject line
        , text: greeting + '\nClick here to confirm your email address for bitpoker:\n' + confirmation_url
        , html: '<b>' + greeting + '</b><br />' +
                'Click <a href="' + confirmation_url +
                '">here</a> to confirm your email address for bitpoker.'
    };
    smtp_transport.sendMail(confirmation_email, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log('Message sent: ' + response.message);
      }
      // if you don't want to use this transport object anymore, uncomment following line
      smtp_transport.close(); // shut down the connection pool, no more messages
    });
  };

  return {sendConfirmationEmail: sendConfirmationEmail};
})();