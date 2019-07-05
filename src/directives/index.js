/**
 * 全局指令
 */

// 获取鼠标坐标
const mousePosition = function (event) {
	let e = event || window.event;
	let ret = '';

	e.preventDefault();
	e.stopPropagation();

	if (e.type === 'touchmove') {
		e.clientY = e.touches[0].clientY;
		e.clientX = e.touches[0].clientX;
	}
	ret = {
		x: e.clientX || e.pageX || e.x,
		y: e.clientY || e.pageY || e.y,
		mx: e.movementX,
		my: e.movementY
	};
	
	return ret;
}
// 给元素绑定/解绑事件
const toggleListener = function (el, type, eventName, handler) {

	let eventNames = eventName.split(',');
	
	type = type || 'add';

	if (eventName === 'mousemove' || eventName === 'touchmove') {
		eventNames = ['mousemove', 'touchmove'];
	}

	eventNames.forEach(function (item) {
		if (type === 'add') {
			el.addEventListener(item, handler);
		} else {
			el.removeEventListener(item, handler);
		}
	});
	
}

// 指令 - touchmove
Vue.directive('touchmove', {
	// 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	bind: function () {},
	unbind: function () {},
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {

		let elWidth = '';
		let pel = el.parentElement || el.parentNode || el.offsetParent;
		let last_mx = 0;
		// let setTranslateX = function () {}
		let handler = function (event) {
			let e = event || window.event;

			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}

			elWidth = el.offsetWidth || el.clientWidth || el.scrollWidth;
			let pelWidth = pel.offsetWidth || pel.clientWidth || pel.scrollWidth;
			// 最大移动距离
			let maxMove = elWidth - pelWidth;
			let msp = event ? mousePosition() : {mx: 10000 * -1};

			last_mx += msp.mx;
			if (last_mx > 0 || maxMove < 0)  {
				last_mx = 0;
			} else if (last_mx < maxMove * -1) {
				last_mx = maxMove * -1;
			}
			el.style.transform = 'translateX(' + last_mx + 'px)';

		}

		// 添加 mousedown,touchstart 事件
		toggleListener(el, 'add', 'mousedown,touchstart', function (event) {
			let e = event || window.event;
			e.preventDefault();
			e.stopPropagation();

			// window 添加mousemove事件
			toggleListener(window, 'add', 'mousemove', handler);
		});
		toggleListener(window, 'add', 'mouseup,touchend', function (event) {
			let e = event || window.event;
			e.preventDefault();
			e.stopPropagation();

			// window 移除mousemove事件
			toggleListener(window, 'remove', 'mousemove', handler);
		});

		// dom节点变化监听
		var observe = new MutationObserver(function (mutations, observe) {
			let _elWidth = el.offsetWidth || el.clientWidth || el.scrollWidth;

			if (_elWidth !== elWidth) {
				handler('');
			}
		});
		observe.observe(el, {childList: true});

  }
})