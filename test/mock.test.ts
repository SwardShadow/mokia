import Debug from 'debug'
import { expect } from 'chai'

import mock, { decorators } from '../src'

describe('mock', () => {

  class Person {

    @decorators.string('lower', 5, 10)
    public name: string

    @decorators.integer(0, 100)
    public age: number

    public canFly: boolean = false

  }

  class Superman extends Person {

    @decorators.integer(80, 100)
    public power: number

    public canFly: boolean = true

  }

  it('mock(plain object)', () => {
    const r = mock({ name: 'Harrie', age: 18 })

    expect(r).to.have.property('name').equal('Harrie')
    expect(r).to.have.property('age').equal(18)
  })

  it('mock(dynamic object)', () => {
    const r = mock({ name: mock.string('abc'), age: mock.natural(0, 100) })

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).below(100)
  })

  it('mock(object & object)', () => {
    const r = mock(
      { name: mock.string('abc') },
      { age: mock.natural(0, 100) }
    )

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).below(100)
  })

  it('mock(object & array)', () => {
    const r = mock(
      { name: mock.string('abc'), age: mock.natural(0, 100) },
      { friends: mock.array({ name: mock.string('abc'), age: mock.natural(0, 100) }, 2) }
    )

    const c = r.friends[0]

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).below(100)
    expect(r).to.have.property('friends').is.a('array').lengthOf(2)

    expect(c).to.have.property('name').is.a('string')
    expect(c).to.have.property('age').is.a('number').least(0).below(100)
  })

  it('mock(class)', () => {
    const r = mock(Person)

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).below(100)
    expect(r).to.have.property('canFly').equal(false)
    expect(r).to.have.not.property('power')

    const r2 = mock(Superman)
    expect(r2).to.have.property('name').is.a('string')
    expect(r2).to.have.property('age').is.a('number').least(0).below(100)
    expect(r2).to.have.property('power').is.a('number').least(80).below(100)
    expect(r2).to.have.property('canFly').equal(true)
  })

  it('mock(class & object)', () => {
    const r = mock(Person, { height: mock.integer(160, 180) })

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).below(100)
    expect(r).to.have.property('canFly').equal(false)
    expect(r).to.have.property('height').is.a('number').least(160).below(180)
  })

  it('mock(class & array)', () => {
    const r = mock(Person, { friends: mock.array(Person, 2) })
    const c = r.friends[0]

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').least(0).below(100)
    expect(r).to.have.property('friends').is.a('array').lengthOf(2)

    expect(c).to.have.property('name').is.a('string')
    expect(c).to.have.property('age').is.a('number').least(0).below(100)
  })

})
