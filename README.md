

## Stack of technologies

**Spring:** Boot, MVC, Data, Security

**Web:** Angular Framework, Bootstrap, Bower, Gulp

**Tests:** JUnit, Mockito, AssertJ

**CI:** Travis

**Third-party libraries:** [Letter avatar](https://agentejo.com/blog/tired-of-gravatar-try-letter-avatar) (by Artur Heinze)

## How to Build & Run application from Intellij IDEA

```
git clone https://github.com/ASaunin/social-network-spring.git
cd social-network-spring
./mvnw clean install
```
Start Spring boot application from the main class: `org.asaunin.socialnetwork.SocialNetworkApplication`

Open [http://localhost:8080](http://localhost:8080) in your browser


## Social sign-in feature

To enable Google & Facebook sing-in feature, register appropriate application and set it's credentials in [application.properties](api/src/main/resources/application.yml) file    

The links below to get an application ids and secrets:

- Google: [https://developers.google.com/+/web/signin/server-side-flow#step_1_create_a_client_id_and_client_secret](https://developers.google.com/+/web/signin/server-side-flow#step_1_create_a_client_id_and_client_secret)
- Facebook: [https://developers.facebook.com/docs/facebook-login/v2.2](https://developers.facebook.com/docs/facebook-login/v2.2)

## Deployment


Configure `${SOCIAL_NETWORK_API_URL}` and `${SOCIAL_NETWORK_WEB_URL}` system variables according to your deployment urls

Configure `URL` constant in [app.js](webapp/src/scripts/app.js) to be equal to `${SOCIAL_NETWORK_API_URL}` value

NB: It is considered to be `http://localhost:8080` by default both for api & web components

Build your application:
```
./mvnw clean install
```

Deploy **jar-file** from `api\target` folder to the backend-server

Deploy **war-file** from `webapp\target` folder to the web-server

Open `${SOCIAL_NETWORK_WEB_URL}` in your browser and enjoy!

### Heroku deployment example
```
git checkout heroku
./mvnw clean install
heroku plugins:install heroku-cli-deploy
heroku deploy:jar api/target/social-network-api-1.0.0-SNAPSHOT.jar --app social-network-spring
heroku deploy:war webapp/target/social-network-web-1.0.0-SNAPSHOT.war --app social-network-angularjs
```
