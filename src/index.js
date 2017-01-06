import Inferno from 'inferno';
import Component from 'inferno-component';

const STYLE_INNER = 'position:relative; overflow:hidden; width:100%; min-height:100%;';
const STYLE_CONTENT = 'position:absolute; top:0; left:0; height:100%; width:100%; overflow:visible;';

export default class extends Component {
	constructor() {
		super();
		this.state = {
			height: 0,
			offset: 0
		};

		this.elem = null;
		this.setRef = el => {
			this.elem = el;
		};

		this.resize = () => {
			if (this.state.height !== this.elem.offsetHeight) {
				this.setState({height: this.elem.offsetHeight});
			}
		};

		this.handleScroll = () => {
			this.setState({offset: this.elem.scrollTop});
			this.props.sync && this.forceUpdate();
		};
	}

	componentDidMount() {
		this.resize();
		addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
		removeEventListener('resize', this.resize);
	}

	render(props, state) {
		const extra = props.buffer | 10;

		let start = (state.offset / props.rowHeight) | 0;

		// # of visible items (before buffer)
		let visibles = (state.height / props.rowHeight) | 0;

		if (extra) {
			start = Math.max(0, start - (start % extra));
			visibles += extra;
		}

		// last visible + buffered row index
		const end = start + 1 + visibles;

		// slice what's currently in viewport ++ buffer count
		const selection = props.data.slice(start, end);

		return (
			<div id={props.id} ref={this.setRef} className={props.className} onScroll={this.handleScroll}>
				<div style={`${STYLE_INNER} height:${props.data.length * props.rowHeight}px;`}>
					<div style={`${STYLE_CONTENT} top:${start * props.rowHeight}px;`}>
						{ selection.map(props.rowRender) }
					</div>
				</div>
			</div>
		);
	}
}
