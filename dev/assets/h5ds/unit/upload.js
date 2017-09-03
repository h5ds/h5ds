import g from '../conf/global';

(function($) {
    $.fn.upload = function(opts) {
        var itemTpl = `<div class="mt-upload-item">
						<div class="mt-upload-progress">
							<div class="mt-upload-progress-bar"></div>
						</div>
						<span class="mt-upload-filename">{{fileName}}</span>
						<span class="delfilebtn">删除</span>
					</div>`;
        var defaults = {
            type: 'jpg,png,gif,jpeg', //允许上传的文件类型，格式'jpg,png,gif'
            url: '', //文件提交的地址
            auto: true, //是否开启自动上传
            method: 'post', //发送请求的方式，get或post
            multi: true, //是否允许选择多个文件,如果是单图上传，imgbox 设置为img对象
            data: null, //发送给服务端的参数，格式：{key:value}
            fileName: 'file', //在后端接受文件的参数名称，如PHP中的$_FILES['file']
            limit: 2048, //允许上传的文件大小，单位KB
            imgbox: null,
            itemTpl: itemTpl, //上传队列显示的模板
            uploadStart: null, //上传开始时的动作
            uploadSuccess: null, //上传成功的动作
            uploadComplete: null, //上传完成的动作
            uploadError: null, //上传失败的动作
            init: null, //初始化时的动作
            cancel: null //删除掉某个文件后的回调函数
        }

        var set = $.extend(defaults, opts);
        var _this = this;

        //设置BTN_HTML
        function setBtnHTML() {
            var shtml = $(_this).html();
            $(_this).html(shtml + '<input class="mt-upload-input" type="file" ' + (set.multi ? 'multiple="true"' : '') + ' />')
        }

        //将文件的单位由bytes转换
        function bytesToSize(bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024;
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)) + '' + sizes[i];
            //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
        }

        //数据过滤
        function fileFilter(file) {

            var type = file.type.split('/');
            var size = file.size;
            if (set.type.indexOf(type[1]) == -1) {
                //alert('文件格式错误！');
                $.tip({
                    msg: '文件格式错误！',
                    type: 'danger'
                })
                return false
            }
            if (size > set.limit * 1024) {
                $.tip({
                    msg: '文件尺寸不能超过' + bytesToSize(set.limit * 1024),
                    type: 'danger'
                })
                return false
            }
            return true
        }

        //上传
        function uploadFun(file) {

            //上传开始
            // $(_this).trigger('uploadStart', file);
            if (set.uploadStart) {
                set.uploadStart(file);
            }

            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                //上传进度条
                xhr.upload.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        var percentage = Math.round((e.loaded * 100) / e.total);
                        console.log(percentage)
                    }
                }, false);

                xhr.upload.addEventListener("load", function(e) {
                    //console.log("上传完毕...",e)
                    //完成
                    if (set.uploadComplete) {
                        set.uploadComplete(e);
                    }
                }, false);

                xhr.open(set.method, set.url, true);
                xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
                xhr.overrideMimeType("text/plain; charset=utf-8");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var obj = JSON.parse(xhr.responseText);

                            //设置HTML
                            var tpl = set.itemTpl.replace('{{fileName}}', obj.data.name);

                            //单图上传
                            if (!set.multi) {
                                if (set.imgbox) {
                                    $(set.imgbox).attr('src', obj.data.url)
                                } else {
                                    // $(_this).append(tpl)
                                }
                            } else {
                                if (set.imgbox) {
                                    $(set.imgbox).append(tpl)
                                } else {
                                    // $(_this).append(tpl)
                                }
                            }
                            //成功！
                            if (set.uploadSuccess) {
                                set.uploadSuccess(obj, xhr);
                            }
                            // $(_this).trigger('uploadSuccess', obj, xhr);

                        } else {
                            //失败！
                            if (set.uploadError) {
                                set.uploadError(xhr);
                            }
                            // $(_this).trigger('uploadError', xhr);
                        }
                    }
                };
                var fd = new FormData();
                fd.append(file.name, file);
                if (set.data) {
                    for (var key in set.data) {
                        fd.append(key, set.data[key]);
                    }
                }
                xhr.send(fd);
            } else {
                // $(_this).trigger('uploadError', xhr);
                if (set.uploadError) {
                    set.uploadError(xhr);
                }
            }
        }

        //事件方法
        function eventFun() {
            //事件绑定, 如果采用事件委托，会导致 uploadFun 暴露给window对象，这样形成闭包函数，upload函数被新的upload覆盖
            $(_this).find('.mt-upload-input').off('change.upload').on('change.upload', function(e) {
                // 获取文件列表对象
                var files = e.target.files;
                for (var i = 0; i < files.length; i++) {
                    //上传图片
                    if (fileFilter(files[i])) {
                        uploadFun(files[i]);
                    }
                }
            })
        }

        //init
        function initFun() {
            setBtnHTML()
            eventFun()
        }

        initFun()

        return $(this);
    }
})(jQuery);