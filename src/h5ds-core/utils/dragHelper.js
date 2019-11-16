/**
 * @desc touch 和 mouse 事件
 */
export function getDragEventName() {
  const drag = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup',
    touch: false,
    touchEvent: e => e.originalEvent.targetTouches[0]
  };
  if ('ontouchend' in document) {
    drag.start = 'touchstart';
    drag.move = 'touchmove';
    drag.end = 'touchend';
    drag.touch = true;
  }

  return drag;
}
