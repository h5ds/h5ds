import { setAppDataEdit } from './AppDataFun.js';
/**
 * 设置 全局page 对象
 */
export function setPage(index, self) {
    if (index !== null) {
        setAppDataEdit({
            pageIndex: index
        });
    }
}