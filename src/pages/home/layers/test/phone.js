import './phone.less';

// 地图手机端执行
$(document)
    .off('h5ds.swiperAfter.test')
    .on('h5ds.swiperAfter.test', function(e, data) {
        const { $in, $out } = data;
        $in.find('.test-inner').each(function() {
            console.log(this);
        });
    });
