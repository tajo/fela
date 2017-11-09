/* @flow */
import cssbeautify from 'cssbeautify'
import { objectReduce, objectEach } from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addBeautifier(renderer: DOMRenderer, options: Object): DOMRenderer {
  renderer.subscribe(() => {
    console.log('activate')
    console.log(renderer.cache)
    return objectEach(renderer.nodes, (node, key) => {
      node.textContent = cssbeautify(node.textContent, options)
    })
  })
  return renderer
}

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
}

export default function beautifier(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    addBeautifier(renderer, {
      ...defaultOptions,
      ...options
    })
}
