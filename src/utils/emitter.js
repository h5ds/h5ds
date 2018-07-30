import events from 'events';

/**
 * @desc 用于全局事件绑定和响应, 具体可参考NodeLoading组件和higgsPromise搭配的使用.也可参考官方文档: https://nodejs.org/api/events.html#events_emitter_addlistener_eventname_listener
 */
const emitter = new events.EventEmitter();

export default emitter;