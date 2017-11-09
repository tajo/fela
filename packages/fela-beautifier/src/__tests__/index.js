import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'
import beautifier from '../index'

describe('Beautifier enhancer', () => {
  it('beautify', () => {
    const renderer = createRenderer({
      enhancers: [beautifier()]
    })
    renderer.renderRule(() => ({ color: 'blue' }))
    renderer.renderRule(() => ({ color: 'red', fontSize: '12px' }))
    expect(renderToString(renderer)).toMatchSnapshot()
  })
})
