/**
 * 图层对于JSON数据
 */
export class LayerJSON {
  id = null;
  className = null;
  animate = [];
  style = { width: 200, height: 200, top: 0, left: 0 }; // div.layer 的样式
  estyle = {}; // div.element 的样式
  events = [];
  data = 'test hello!';
}
