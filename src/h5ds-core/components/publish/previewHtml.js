export const previewHtml = `<!DOCTYPE html>
<html>
  <head lang="zh-cn">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <title>H5DS5.0</title>
    <meta name="renderer" content="webkit" />
    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="apple-mobile-web-app-title" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="x5-orientation" content="portrait" />
    <meta name="x5-page-mode" content="app" />
    <!--uc浏览器-->
    <meta name="screen-orientation" content="portrait" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="email=no" />
    <link rel="shortcut icon" href="/assets/images/favicon.ico" />
    <link href="http://cdn.h5ds.com/lib/plugins/swiper.min.css" rel="stylesheet"/>
    <link href="http://cdn.h5ds.com/umd/swiper/h5ds.preview.5.0.11.css" rel="stylesheet"/>
    <script src="http://cdn.h5ds.com/lib/plugins/swiper.min.js"></script>
    <script src="http://cdn.h5ds.com/lib/plugins/jquery.min.js"></script>
    <script src="http://cdn.h5ds.com/lib/plugins/h5ds.vendor.preview.min.js"></script>
    <script src="http://cdn.h5ds.com/umd/swiper/h5ds.preview.5.0.11.js"></script>
    <script>
      window.Component = React.Component;
    </script>
    <style>
      body {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
      }
    </style>
  </head>

  <body>
    <div id="H5DS-APP"></div>
  </body>
  <script>
    var h5dsData = {{__html}};
    $(function() {
      h5dsPreview({
        id: "H5DS-APP",
        data: h5dsData,
        pluginsHost: 'http://cdn.h5ds.com'
      });
    });
  </script>
</html>
`;
