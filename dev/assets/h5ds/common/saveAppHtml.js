import { getLayerDom } from './layerSwitch';

/**
 * @desc 合作HTML字符串的方法集合
*/
export function popupHtml(popups) {
    return popups.map((popup, index) => {
        let noSwiper = '';
        if (popup.style.height && parseInt(popup.style.height, 10) > 486) {
            noSwiper = 'noSwiper';
        }
        return `<div class="h5ds-swiper-page" id="${popup.id || ''}">
                    <div data-noSwiper="${noSwiper}" class="h5ds-swiper-pageinner ${noSwiper}" style="${$.toStyle(popup.style)}">
                        <div class="h5ds-swiper-layers">
                        ${popup.layers.map((layer, index) => {
                            return getLayerDom(layer);
                        }).join('')}
                        </div>
                    </div>
                </div>`;
    }).join('');
}

export function fixedUpHtml(fixedUp) {
    return `<div id="${fixedUp.id || ''}" class="h5ds-swiper-page" style="${$.toStyle(fixedUp.style)}">
        <div class="h5ds-swiper-layers">
        ${ fixedUp.layers.map((layer, index) => {
            return getLayerDom(layer);
        }).join('')}
        </div>
    </div>`;
}

export function fixedDownHtml(fixedDown) {
    return `<div id="${fixedDown.id || ''}" class="h5ds-swiper-page" style="${$.toStyle(fixedDown.style)}">
        <div class="h5ds-swiper-layers">
        ${ fixedDown.layers.map((layer, index) => {
            return getLayerDom(layer);
        }).join('')}
        </div>
    </div>`;
}

export function pageHtml(pages) {
    return pages.map((page, index) => {
        let noSwiper = '';
        if(page.style.height && parseInt(page.style.height, 10) > 486) {
            noSwiper = 'noSwiper';
        }
        return `
                <div id="${page.id || ''}" data-autoplay="${page.slider.autoplay ? page.slider.time : false}" data-lock="${page.slider.lock}" class="h5ds-swiper-page">
                    <div data-noSwiper="${noSwiper}" class="h5ds-swiper-pageinner ${noSwiper}" style="${$.toStyle(page.style)}">
                        <div class="h5ds-swiper-layers">
                        ${
                            page.layers.map((layer, index) => {
                                return getLayerDom(layer);
                            }).join('')}
                        </div>
                    </div>
                </div>`;
    }).join('');
}