import './tools/pubsub';
import { Fixed, Layer, Page, Popup } from './pages';
import { LoadSource, appUtil, cleanData, cleanLayers, installPlugins, loadExtensionScripts, mountBasicLayerPlugins, mountExtensionPlugins, trackingHelper } from './tools';
import { getInitData, renderIn } from '../config';
import H5dsSwiper from './swiper';
import { mountValue } from 'h5ds-mount-plugin';
const enums = { ...renderIn };

// 挂载到H5DS_GLOBAL
mountValue('swiper', {
  installPlugins,
  H5dsSwiper,
  mountBasicLayerPlugins,
  loadExtensionScripts,
  mountExtensionPlugins,
  appUtil,
  cleanLayers,
  cleanData,
  trackingHelper,
  LoadSource,
  Page,
  Popup,
  Fixed,
  Layer,
  enums,
  getInitData
});

export default {
  installPlugins,
  H5dsSwiper,
  mountBasicLayerPlugins,
  loadExtensionScripts,
  mountExtensionPlugins,
  appUtil,
  cleanLayers,
  cleanData,
  trackingHelper,
  LoadSource,
  Page,
  Popup,
  Fixed,
  Layer,
  enums,
  getInitData
};
