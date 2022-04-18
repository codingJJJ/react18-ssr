import React from 'react';
import App from './src/App';
import { renderToString, renderToPipeableStream } from 'react-dom/server';
function render(req, res, assets) {
  //在以前的，需要在此后台先获取数据，数据获取回来以后再渲染组件，再返回给客户端
  //renderToString();
  const { pipe } = renderToPipeableStream(
    <App />,
    {
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ssr</title>
        </head>
        <body><div id="root">`);
        pipe(res);
        res.write(`</div>
    </body>
    </html>`);

      }
    }
  );
  /* 
  const html = renderToString(<App />);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ssr</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="${assets['main.js']}"></script>
    </body>
    </html>
  `); */
}
module.exports = render;