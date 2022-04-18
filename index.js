const register = require("@babel/register");

register({
  ignore: [/node_modules/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-modules-commonjs"]
});
const webpack = require('webpack');
const express = require('express');
const static = require('serve-static')
const webpackConfig = require('./webpack.config');
const render  = require("./render");

webpack(webpackConfig, (err, data) => {
  if (err) {
    throw Error('webpack build error')
  }
  const json = data.toJson({ assets: true })

  const assets = json.assets.reduce((memo, { name }) => {
    memo[name] = `/` + name;
    return memo;
  }, {});

  const app = express()
  app.get('/', (req, res) => {
    console.log(assets);

    render(req, res, assets)
  })
  app.use(static('dist'))
  app.listen(8888, () => {
    console.log('start at 8888');
  })
})