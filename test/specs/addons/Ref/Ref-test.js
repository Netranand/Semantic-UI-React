import faker from 'faker'
import React from 'react'

import Ref from 'src/addons/Ref/Ref'
import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'
import { CompositeClass, CompositeFunction, DOMClass, DOMFunction } from './fixtures'

const mountNode = (Component, innerRef) =>
  mount(
    <Ref innerRef={innerRef}>
      <Component />
    </Ref>,
  )
    .find('#node')
    .getDOMNode()

describe('Ref', () => {
  common.hasValidTypings(Ref)

  describe('children', () => {
    it('renders single child', () => {
      const child = <div data-child={faker.hacker.noun()} />

      expect(shallow(<Ref>{child}</Ref>)).toContain(child)
    })
  })

  describe('innerRef', () => {
    it('returns node from a functional component with DOM node', () => {
      const innerRef = sandbox.spy()
      const node = mountNode(DOMFunction, innerRef)

      expect(innerRef).have.been.calledOnce()
      expect(innerRef).have.been.calledWithMatch(node)
    })

    it('returns node from a functional component', () => {
      const innerRef = sandbox.spy()
      const node = mountNode(CompositeFunction, innerRef)

      expect(innerRef).have.been.calledOnce()
      expect(innerRef).have.been.calledWithMatch(node)
    })

    it('returns node from a class component with DOM node', () => {
      const innerRef = sandbox.spy()
      const node = mountNode(DOMClass, innerRef)

      expect(innerRef).have.been.calledOnce()
      expect(innerRef).have.been.calledWithMatch(node)
    })

    it('returns node from a class component', () => {
      const innerRef = sandbox.spy()
      const node = mountNode(CompositeClass, innerRef)

      expect(innerRef).have.been.calledOnce()
      expect(innerRef).have.been.calledWithMatch(node)
    })
  })
})
