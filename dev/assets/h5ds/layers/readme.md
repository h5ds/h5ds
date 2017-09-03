# 规范说明
### css 命名规范：
所有扩展的组件css都以 ex- 开头命名，id 也是以 ex 开头命名

### 平台提供的属性方法
超链接方法：mt-exa-link='http://www.baidu.com'
强制数据单位：mt-type='px' 会强制设置单位, 使用该方法后，使用 changes 监听 change 事件
鼠标滚动事件：mt-wheel='1,2,10' 滚动后，会自动触发 changes 事件, 最小1,每次变化2，最大10

数据映射：mt-bind='id名字'
强制过滤数据（mt-bind 一起使用）：mt-filter="*360" 表示 当前的值 val * 360 为绑定的值
强制保留小数（mt-bind 一起使用）：mt-fixed="2" 表示保留小数点
