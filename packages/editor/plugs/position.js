import { Quill } from 'vue-quill-editor'
const BlockEmbed = Quill.import('blots/block/embed');
const sanitize = Quill.import('formats/link');

// import Parchment from 'parchment';
// import { sanitize } from '../formats/link';

const ATTRIBUTES = [
  'alt',
  'height',
  'width'
];


class Position extends BlockEmbed {
  static create(value) {
    let node = super.create(value);
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value));
    }
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Position.blotName = 'image';
Position.tagName = 'IMG';

// Quill.register(Audio)
export default Position;
