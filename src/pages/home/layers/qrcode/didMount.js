// layer渲染后执行
export function didMount(target, layer) {
    // console.log('layer渲染后执行！只在PC上执行', layer.data);
    $(target).find('.qrcode-inner').empty().qrcode(layer.data);
}
