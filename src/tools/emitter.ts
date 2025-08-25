import mitt from 'mitt';

// 创建智能事件总线
const createSmartEmitter = () => {
  const emitter = mitt();
  const eventCache = new Map(); // 存储未消费的事件

  // 增强 emit 方法：添加缓存功能
  const originalEmit = emitter.emit.bind(emitter);
  emitter.emit = (event, data) => {
    const hasListeners = emitter.all.get(event)?.length > 0;

    if (hasListeners) {
      originalEmit(event, data); // 直接触发监听器
    } else {
      // 无监听器时缓存事件
      if (!eventCache.has(event)) {
        eventCache.set(event, []);
      }
      eventCache.get(event).push(data);
    }
  };

  // 增强 on 方法：注册时重放缓存事件
  const originalOn = emitter.on.bind(emitter);
  emitter.on = (event, handler) => {
    // 注册监听器
    originalOn(event, handler);

    // 重放缓存事件
    if (eventCache.has(event)) {
      const cachedEvents = eventCache.get(event);
      cachedEvents.forEach(data => handler(data));
      eventCache.delete(event); // 清除已重放事件
    }
  };

  // 添加清除缓存方法
  emitter.clearCache = (event) => {
    if (event) {
      eventCache.delete(event);
    } else {
      eventCache.clear();
    }
  };

  return emitter;
};

// 导出智能事件总线实例
export const emitter = createSmartEmitter();