import React from 'react'

import AccordionPanel from 'src/modules/Accordion/AccordionPanel'
import AccordionTitle from 'src/modules/Accordion/AccordionTitle'
import * as common from 'test/specs/commonTests'

describe('AccordionPanel', () => {
  common.isConformant(AccordionPanel, { rendersChildren: false })

  // TODO: Reenable tests in future
  // https://github.com/airbnb/enzyme/issues/1553
  //
  // common.implementsShorthandProp(AccordionPanel, {
  //   assertExactMatch: false,
  //   propKey: 'content',
  //   ShorthandComponent: AccordionContent,
  //   mapValueToProps: content => ({ content }),
  // })
  // common.implementsShorthandProp(AccordionPanel, {
  //   propKey: 'title',
  //   ShorthandComponent: AccordionTitle,
  //   mapValueToProps: content => ({ content }),
  // })

  describe('active', () => {
    it('should passed to children', () => {
      const wrapper = shallow(<AccordionPanel active content='Content' title='Title' />).at(0)

      expect(wrapper.at(0)).have.prop('active', true)
      expect(wrapper.at(1)).have.prop('active', true)
    })
  })

  describe('index', () => {
    it('should passed to title', () => {
      const wrapper = shallow(<AccordionPanel content='Content' index={5} title='Title' />).at(0)

      expect(wrapper.at(0)).have.prop('index', 5)
      expect(wrapper.at(1)).have.not.prop('index')
    })
  })

  describe('onTitleClick', () => {
    it('is called with (e, titleProps) when clicked', () => {
      const event = { target: null }
      const onClick = jest.fn()
      const onTitleClick = jest.fn()

      mount(
        <AccordionPanel
          content='Content'
          onTitleClick={onTitleClick}
          title={{ content: 'Title', onClick }}
        />,
      )
        .find(AccordionTitle)
        .at(0)
        .simulate('click', event)

      expect(onClick).have.been.calledOnce()
      expect(onClick).have.been.calledWithMatch(event, { content: 'Title' })

      expect(onTitleClick).have.been.calledOnce()
      expect(onTitleClick).have.been.calledWithMatch(event, { content: 'Title' })
    })
  })
})
