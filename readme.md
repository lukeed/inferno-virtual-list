# inferno-virtual-list [![NPM](https://img.shields.io/npm/v/inferno-virtual-list.svg)](https://www.npmjs.com/package/inferno-virtual-list)

> A "virtual" list that only renders visible items. Supports millions of rows. Recycles efficiently via [Inferno JS](https://infernojs.org).

This is a simple component that allows you to create very long, scrollable lists that perform extremely fast. It allows a configurable [buffer zone](#buffer) to render items above and below the visible viewport bounds.

#### [Demo](https://jsfiddle.net/developit/qqan9pdo/)

<a href="https://jsfiddle.net/developit/qqan9pdo/">
  <img alt="preview" src="https://i.gyazo.com/866e97be9075dd63260dbc5df30075ec.gif" width="420">
</a>

## Install

You must also include `inferno` and `inferno-component`.

### NPM

```
$ npm install --save inferno-virtual-list inferno inferno-component
```

### CDN

```html
<script src="https://unpkg.com/inferno@1.0.7/dist/inferno.min.js"></script>
<script src="https://unpkg.com/inferno@1.0.7/dist/inferno-component.min.js"></script>
<script src="https://unpkg.com/inferno-virtual-list@0.1.0/dist/inferno-virtual-list.min.js"></script>
```

## Usage

Provide the `List` of items as `data`, an item renderer as `rowRender`, and the height of a single row as `rowHeight`. Everything else is optional.

> **Note:** If installed via [CDN](#cdn), the component is exposed as `VirtualList`. Otherwise, you may call it whatever you'd like!

```js
import List from 'inferno-virtual-list';

const Item = row => (
  <div class="item">{ row }</div>
)

<List
  sync
  buffer={ 10 }
  rowHeight={ 22 }
  rowRender={ Item }
  data={ ['a', 'b', 'c'] }
/>
```

## Props

#### data
Type: `Array`<br>
Default: `[]`<br>
List of data items

#### sync
Type: `Boolean`<br>
Default: `false`<br>
If truthy, forces synchronous rendering.

> It's best to try without `sync` enabled first. You should only enable `sync` if you experience flickering. Doing so ensures every update is applies to the DOM before continuing, but does this at the cost of framerate.

#### buffer
Type: `Number`<br>
Default: `10`<br>
The number of extra rows to render above & below the visible list.

#### rowHeight
Type: `Number`<br>
Default: `none`<br>
The static height of a row (in pixels). Do not include units!

#### rowRender
Type: `Function`<br>
Default: `none`<br>
The renderer function for each list item.

#### id
Type: `String`<br>
Default: `none`<br>
The `id` attribute to pass down.

#### className
Type: `String`<br>
Default: `none`<br>
The `className` attribute to pass down.

## Examples

```js
const DIV = document.getElementById('container');
const DATA = [];
// Generate 100,000 rows of data
for (let x=1e5; x--; ) DATA[x] = `Item #${x+1}`;
```

### Functional

[**View this example on JSFiddle**](https://jsfiddle.net/developit/qqan9pdo/)

```js
import Inferno from 'inferno';
import List from 'inferno-virtual-list';

// renders a single row
const Row = row => (
  <div className="row">{row}</div>
);

Inferno.render((
  <List data={DATA} rowHeight={30} rowRender={Row} />
), DIV);
```

### Stateful

[**View this example on JSFiddle**](https://jsfiddle.net/developit/qqan9pdo/)

```js
import Inferno from 'inferno';
import Component from 'inferno-component';
import List from 'inferno-virtual-list';

class Demo extends Component {
  // 30px tall rows
  rowHeight = 30;

  // Renders a single row
  renderItem(row) {
    return <div className="row">{row}</div>;
  }

  render() {
    return (
      <List sync
        data={DATA}
        className="list"
        rowHeight={this.rowHeight}
        rowRender={this.renderItem}
      />
    );
  }
}

Inferno.render(Demo, DIV);
```

## Credit

Major hat tip to [@_developit](https://twitter.com/_developit) and his work on [`preact-virtual-list`](https://github.com/developit/preact-virtual-list), from which this module was ported.

## License

MIT © [Luke Edwards](https://lukeed.com)
