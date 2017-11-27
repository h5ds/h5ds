import { getStyle } from '../../unit/getCssInStyle';
/**
 * 设置模板
*/
export function setTpl(self) {
    let obj = self.layer;
    let str = `<div class="ex-set-video">
        <textarea id="videoUrl">${obj.data}</textarea>
        </div>`;
    return str;
}