import { H5DSPlus } from './plusClasses.js';
import PhoneDom from './dom/phone.js';
import QrcodeDom from './qrcode/phone.js';

// 装载插件
new H5DSPlus([PhoneDom, QrcodeDom]);
