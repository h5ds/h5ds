# 事件说明

一个图层上可以添加多个事件。事件数据格式：

layer对象：
{
  ...,
  events: [
    {
      id: '', // 随机id
      eventId: 'h5ds_event_click', // 事件标识
      eventParam: {}, // 参数传递
      name: 'event name' // 触发事件的函数ID，通过ID去执行对应的函数
    }
  ]
}
