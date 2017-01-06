(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno'), require('inferno-component')) :
	typeof define === 'function' && define.amd ? define(['inferno', 'inferno-component'], factory) :
	(global.VirtualList = factory(global.Inferno,global.Inferno.Component));
}(this, (function (Inferno,Component) { 'use strict';

Inferno = 'default' in Inferno ? Inferno['default'] : Inferno;
Component = 'default' in Component ? Component['default'] : Component;

var STYLE_INNER = 'position:relative; overflow:hidden; width:100%; min-height:100%;';
var STYLE_CONTENT = 'position:absolute; top:0; left:0; height:100%; width:100%; overflow:visible;';

var vn = Inferno.createVNode;

var index = (function (Component$$1) {
	function anonymous() {
		var this$1 = this;

		Component$$1.call(this);
		this.state = {
			height: 0,
			offset: 0
		};

		this.elem = null;
		this.setRef = function (el) {
			this$1.elem = el;
		};

		this.resize = function () {
			if (this$1.state.height !== this$1.elem.offsetHeight) {
				this$1.setState({height: this$1.elem.offsetHeight});
			}
		};

		this.handleScroll = function () {
			this$1.setState({offset: this$1.elem.scrollTop});
			this$1.props.sync && this$1.forceUpdate();
		};
	}

	if ( Component$$1 ) anonymous.__proto__ = Component$$1;
	anonymous.prototype = Object.create( Component$$1 && Component$$1.prototype );
	anonymous.prototype.constructor = anonymous;

	anonymous.prototype.componentDidMount = function componentDidMount () {
		this.resize();
		addEventListener('resize', this.resize);
	};

	anonymous.prototype.componentWillUnmount = function componentWillUnmount () {
		removeEventListener('resize', this.resize);
	};

	anonymous.prototype.render = function render (props, state) {
		var extra = props.buffer | 10;

		var start = (state.offset / props.rowHeight) | 0;

		// # of visible items (before buffer)
		var visibles = (state.height / props.rowHeight) | 0;

		if (extra) {
			start = Math.max(0, start - (start % extra));
			visibles += extra;
		}

		// last visible + buffered row index
		var end = start + 1 + visibles;

		// slice what's currently in viewport ++ buffer count
		var selection = (props.data || []).slice(start, end);

		return vn(2, 'div', {id: props.id, className: props.className}, (
			vn(2, 'div', {style: (STYLE_INNER + " height:" + (props.data.length * props.rowHeight) + "px;")},
				vn(2, 'div', {style: (STYLE_CONTENT + " top:" + (start * props.rowHeight) + "px;")},
					selection.map(props.rowRender)
				)
			)
		), {onScroll: this.handleScroll}, null, this.setRef);
	};

	return anonymous;
}(Component));

return index;

})));
