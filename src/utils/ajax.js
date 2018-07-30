import { message } from 'antd';
// import { getStorage } from '@/utils/util';
/**
 * @desc 对ajax进行进一步的封装
 * @param set 继承ajax的 set, type 默认是get, tips提示信息
 * @return promise 对象
*/
export default function ajax(set) {

    return new Promise((resolve, reject) => {
        if (!set.type) {
            set.type = 'get';
        }
        
        // set.headers = {}

        $.ajax(set).done(res => {
            if (res.code) {
                if (set.successTips) {
                    message.success(set.successTips === true ? res.msg : set.successTips);
                }
            } else {
                if (set.errorTips) {
                    message.error(set.errorTips === true ? res.msg : set.errorTips);
                }
            }
            resolve(res);

        }).fail(( xhr, textStatus, errorThrown ) => {
            console.error(textStatus);
            reject(xhr);
        });
    });
}