


var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

var senecaWebConfig = {
  context: context,
  adapter: require('seneca-web-adapter-express'),
  options: { parseBody: false } // so we can use body-parser
}

var app = Express()
  .use(require('body-parser').json())
  .use(context)
  .listen(3000)

var seneca = require('seneca')()
  .use(SenecaWeb, senecaWebConfig)
  .use('basic')
  .use('entity')
  .use('math')
  .use('api-all')
  .client({
    port: 9004,
    pin: 'role:math'
  })
  .client({
    port: 9002,
    pin: 'role:store'
  })


seneca.act(
  'role:store,add:book', {
  data: {
    title: 'Action in Seneca',
    price: 9.99
  }
},
  console.log
)