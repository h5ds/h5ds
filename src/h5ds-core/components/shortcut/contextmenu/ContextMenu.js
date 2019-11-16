import { bindSelf } from '../../../utils';
import { inject, observer } from 'mobx-react';

import { Component } from 'react';
import domtoimage from 'dom-to-image';
import { message } from 'antd';
import { toJS } from 'mobx';

/**
 * @desc 鼠标右键操作
 */
@inject('h5ds', 'scope')
@observer
class ContextMenu extends Component {
  @bindSelf
  async getLayerImage() {
    const layerDom = this.props.h5ds.getLayerDom();
    return domtoimage.toPng(layerDom[0], {
      cacheBust: true,
      style: {
        top: 0,
        left: 0,
        background: '#fff'
      },
      filter: node => {
        const exclass = ['h5ds-control'];
        return exclass.indexOf(node.className) === -1;
      }
    });
  }

  // 鼠标右键
  @bindSelf
  mouseright() {
    const { edata, exChangeLayer, getLayers, delLayer, getLayerData, setLayer, copyAnimate, pasteAnimate } = this.props.h5ds;
    $(document)
      .on('contextmenu.h5ds', '#h5dsCanvas', function(e) {
        e.preventDefault();
      })
      .on('contextmenu.menu', '.h5ds-canvas-app > div > .h5ds-swiper-layers > .layer, .h5ds-contextmenu, #h5dsCanvasApp', e => {
        e.preventDefault();
        e.stopPropagation();
        // 如果单纯的选择 layer
        const $layer = $(e.target).closest('.layer');
        let activeIndex = $layer.index();
        let targetType = 'layer'; // 默认是layer，选择图层组group，如果是空白处是null
        let vals = null;
        // 如果点击空白处的右键
        if (edata.selectGroup) {
          targetType = 'group';
        } else if (activeIndex === -1) {
          targetType = 'null';
        } else {
          setLayer(activeIndex);
          window.pubSubEditor.publish('h5ds.initControl');
        }

        switch (targetType) {
          case 'layer':
            vals = [
              { name: '<i class="h5ds-ico h5ds-ico-dingceng"></i> 置顶', val: 'top' },
              { name: '<i class="h5ds-ico h5ds-ico-diceng"></i> 置底', val: 'bottom' },
              { name: '<i class="h5ds-ico h5ds-ico-shangyiyiceng"></i> 上移一层', val: 'prev' },
              { name: '<i class="h5ds-ico h5ds-ico-xiayiyiceng"></i> 下移一层', val: 'next' },
              { name: '<i class="h5ds-ico h5ds-ico-fuzhi"></i> 复制图层', val: 'copy' },
              { name: '<i class="h5ds-ico h5ds-ico-niantie"></i> 粘贴图层', val: 'paste' },
              { name: '<i class="h5ds-ico h5ds-ico-fuzhi"></i> 复制动画', val: 'copyAnimate' },
              { name: '<i class="h5ds-ico h5ds-ico-niantie"></i> 粘贴动画', val: 'pasteAnimate' },
              { name: '<i class="h5ds-ico h5ds-ico-icodel"></i> 删除图层', val: 'del' },
              { name: '<i class="h5ds-ico h5ds-ico-baocun"></i> 保存图层', val: 'save' }
            ];
            if ($layer.hasClass('layer-h5ds_combin')) {
              vals.push({ name: '<i class="h5ds-ico h5ds-ico-fuzhi"></i> 取消合并', val: 'uncombin' });
            }
            break;
          case 'group':
            vals = [
              { name: '<i class="h5ds-ico h5ds-ico-fuzhi"></i> 合并图层', val: 'combin' },
              { name: '<i class="h5ds-ico h5ds-ico-fuzhi"></i> 复制图层', val: 'copy' },
              { name: '<i class="h5ds-ico h5ds-ico-niantie"></i> 粘贴图层', val: 'paste' },
              { name: '<i class="h5ds-ico h5ds-ico-icodel"></i> 删除图层', val: 'del' }
            ];
            break;
          case 'null':
            vals = [{ name: '<i class="h5ds-ico h5ds-ico-niantie"></i> 粘贴图层', val: 'paste' }];
            break;
        }

        $.contextMenu({
          x: e.pageX,
          y: e.pageY,
          vals,
          callback: async val => {
            switch (val) {
              // 取消合并
              case 'uncombin':
                {
                  this.props.uncombin(activeIndex);
                }
                break;
              // 置顶
              case 'top':
                {
                  if (activeIndex === 0) {
                    message.warn('已经是最顶层了');
                  } else {
                    exChangeLayer(activeIndex, 0);
                    window.pubSubEditor.publish('h5ds.setHistory');
                  }
                }
                break;
              // 置底
              case 'bottom':
                {
                  if (activeIndex === getLayers().length - 1) {
                    message.warn('已经是最底层了');
                  } else {
                    exChangeLayer(activeIndex, getLayers().length - 1);
                    window.pubSubEditor.publish('h5ds.setHistory');
                  }
                }
                break;

              // 上移一层
              case 'prev':
                {
                  if (activeIndex === 0) {
                    message.warn('已经是最顶层了');
                  } else {
                    exChangeLayer(activeIndex, activeIndex - 1);
                    window.pubSubEditor.publish('h5ds.setHistory');
                  }
                }
                break;

              // 下移一层
              case 'next':
                {
                  if (activeIndex === getLayers().length - 1) {
                    message.warn('已经是最底层了');
                  } else {
                    exChangeLayer(activeIndex, activeIndex + 1);
                    window.pubSubEditor.publish('h5ds.setHistory');
                  }
                }
                break;

              // 复制图层
              case 'copy':
                {
                  this.props.copyLayer();
                  window.pubSubEditor.publish('h5ds.setHistory');
                }
                break;

              // 复制动画
              case 'copyAnimate':
                {
                  copyAnimate();
                }
                break;

              // 粘贴图层
              case 'paste':
                {
                  this.props.pasteLayer();
                }
                break;

              // 粘贴图层
              case 'pasteAnimate':
                {
                  pasteAnimate();
                }
                break;

              case 'combin':
                this.props.combinLayers();
                break;

              // 删除图层
              case 'del':
                {
                  delLayer(activeIndex);
                  window.pubSubEditor.publish('h5ds.setHistory');
                }
                break;
              // save图层
              case 'save':
                {
                  let data = getLayerData(activeIndex);
                  const { saveLayer, appId } = this.props.scope.options;
                  try {
                    const url = await this.getLayerImage();
                    saveLayer({
                      plugins: [data.pid],
                      updateTime: +new Date(),
                      appId,
                      data: toJS(data),
                      url
                    });
                  } catch (e) {
                    message.error('保存失败，没有配置saveLayer');
                  }
                }
                break;
            }
          }
        });
      });
  }

  componentDidMount() {
    this.mouseright();
  }

  componentWillUnmount() {
    $(document).off('contextmenu.h5ds');
    $(document).off('contextmenu.menu');
  }

  render() {
    return null;
  }
}

export default ContextMenu;
