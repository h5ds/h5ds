export const previewHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>H5DS</title>
    <link rel="stylesheet" href="https://cdn.h5ds.com/umd/swiper/style.css" />
    <link href="https://cdn.h5ds.com/lib/plugins/swiper.min.css" rel="stylesheet">
    <!-- 编辑器所需第三方资源库 -->
    <script src="https://cdn.h5ds.com/lib/plugins/swiper.min.js"></script>
    <script src="https://cdn.h5ds.com/lib/plugins/jquery.min.js"></script>
    <script src="https://cdn.h5ds.com/lib/plugins/h5ds.vendor.preview.min.js"></script>
    <!-- es6语法支持 -->
    <script src="https://cdn.h5ds.com/lib/babel/6.26.0/babel.min.js"></script>
    <!-- H5DS资源 -->
    <script src="https://cdn.h5ds.com/umd/swiper/index.js"></script>
    <script>
      {{__html}}
      window.Component = React.Component;
    </script>
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      #H5DS-APP {
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="H5DS-APP"></div>
  </body>
  <script type="text/babel">
    class App extends Component {
      state = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      resize = () => {
        this.setState(
          {
            width: window.innerWidth,
            height: window.innerHeight
          },
          () => {
            this.H5SwiperRef.swiperInstance.update();
          }
        );
      };

      setSize = (width, height) => {
        this.setState({ width, height }, () => {
          this.H5SwiperRef.swiperInstance.update();
        });
      };

      componentDidMount() {
        const innerHeight = window.innerHeight;

        // 兼容安卓键盘弹起事件
        window.addEventListener("resize", () => {
          const newInnerHeight = window.innerHeight;
          if (innerHeight > newInnerHeight) {
            // 键盘弹出事件处理
            this.resize();
          } else {
            // 键盘收起事件处理
            this.resize();
          }
        });

        // 兼容 IOS 键盘弹起事件，兼容IOS表单的问题
        document.body.addEventListener("focusin", () => {
          window.scroll(0, 0);
        });
        document.body.addEventListener("focusout", () => {
          window.scroll(0, 0);
        });
      }

      componentWillUnmount() {
        if (this.settime) {
          clearTimeout(this.settime);
        }
      }

      render() {
        const { width, height } = this.state;
        let scale = 1;
        switch(this.props.data.type) {
          case 'phone':
          case 'horizontal-phone':
            scale = width / 320;
            break;
          case 'ppt':
            scale = window.innerHeight / 720;
            break;
        }
        return (
          <H5dsSwiper
            ref={c => (this.H5SwiperRef = c)}
            scale={scale}
            style={{ width, height }}
            renderIn="render_in_publish"
            data={this.props.data}
            plugins={{
              pluginsKey: window.H5DS_GLOBAL.plugins,
              scripts: window.H5DS_GLOBAL.scripts
            }}
          />
        );
      }
    }

    function initData(appId, data) {
      document.title = data.name;
      const plus = data.plugins || [];

      const { installPlugins } = window.H5DS_GLOBAL.swiper;

      installPlugins(plus, 'https://www.h5ds.com').then(plugins => {
        ReactDOM.render(
          <App appId={appId} data={data} plugins={plugins} />,
          document.getElementById("H5DS-APP")
        );
      });
    }

    initData("demo", h5dsAppData);
  </script>
</html>
`;
