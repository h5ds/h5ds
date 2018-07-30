import ajax from '../utils/ajax';
/**
 * @desc 测试用
*/
export function test(data) {
    return ajax({
        url: '/api/getlist.json',
        successTips: 'mock测试成功！',
        data: data
    });
}