(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno'), require('inferno-component')) :
	typeof define === 'function' && define.amd ? define(['inferno', 'inferno-component'], factory) :
	(global.VirtualList = factory(global.Inferno,global.Inferno.Component));
}(this, (function (Inferno,Component) { 'use strict';

Inferno = 'default' in Inferno ? Inferno['default'] : Inferno;
Component = 'default' in Component ? Component['default'] : Component;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE_INNER = 'position:relative; overflow:hidden; width:100%; min-height:100%;';
var STYLE_CONTENT = 'position:absolute; top:0; left:0; height:100%; width:100%; overflow:visible;';

var createVNode = Inferno.createVNode;

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.state = {
			height: 0,
			offset: 0
		};

		_this.elem = null;
		_this.setRef = function (el) {
			_this.elem = el;
		};

		_this.resize = function () {
			if (_this.state.height !== _this.elem.offsetHeight) {
				_this.setState({ height: _this.elem.offsetHeight });
			}
		};

		_this.handleScroll = function () {
			_this.setState({ offset: _this.elem.scrollTop });
			_this.props.sync && _this.forceUpdate();
		};
		return _this;
	}

	_class.prototype.componentDidMount = function componentDidMount() {
		this.resize();
		addEventListener('resize', this.resize);
	};

	_class.prototype.componentWillUnmount = function componentWillUnmount() {
		removeEventListener('resize', this.resize);
	};

	_class.prototype.render = function render(props, state) {
		var extra = props.buffer | 10;

		var start = state.offset / props.rowHeight | 0;

		// # of visible items (before buffer)
		var visibles = state.height / props.rowHeight | 0;

		if (extra) {
			start = Math.max(0, start - start % extra);
			visibles += extra;
		}

		// last visible + buffered row index
		var end = start + 1 + visibles;

		// slice what's currently in viewport ++ buffer count
		var selection = (props.data || []).slice(start, end);

		return createVNode(2, 'div', {
			'id': props.id,
			'className': props.className
		}, createVNode(2, 'div', {
			'style': STYLE_INNER + ' height:' + props.data.length * props.rowHeight + 'px;'
		}, createVNode(2, 'div', {
			'style': STYLE_CONTENT + ' top:' + start * props.rowHeight + 'px;'
		}, selection.map(props.rowRender))), {
			'onScroll': this.handleScroll
		}, null, this.setRef);
	};

	return _class;
}(Component);

return _class;

})));
