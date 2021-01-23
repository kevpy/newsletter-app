
### newsletter-app
This is a simple newsletter service.

It implements a small set of Mailgun APIs. Only 3 currently.
 - Subscribe
 - Unsubscribe
 - Send newsletter.

It does not seek to be a replacement of the Mailgun official client libraries but can be used a learning tool.

My main objective was to:
- learn more about Typescript's type systems 
- how useful the type system can be to model programming tasks 
- as well as it's use in a functional programming kind of way.
- TODO - sek to integrate with a client side JS/TS framework <could use more than a single one>

I also wanted to have a test deploy of a a service on Google Cloud Functions

####  project setup
 To run this project, inside the `functions/` directory; add a `.runtimeconfig.json` file.
 
 Add an object as the one below: with your specific credentials
 ```json
 {
  "newsletter": {
    "mailgun_api_key": "Your Mailgun API key",
    "email_sender_domain": "Your Mailgun email sender domain",
    "auth_secret": "This is a super secret string of your creation."
  }
}
 ```
 
 The root directory is just the main project directory. Running and execiting your functions is done on the `functions/` directory.
 
 To run locally:
 ```
 npm run serve
 ```
 
 To deploy to Cloud Functions:
 - Set the above keys on your functions environment. Ensure you have `firebase cli` installed in your local machine
 `firebase functions:config:set newsletter.auth_secret="Your super secret"`

Deploy
 ```
 npm run deploy
 ```
 
 Have fun hacking 
