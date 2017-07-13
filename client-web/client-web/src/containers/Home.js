import React from 'react'
import MenuBar from '../components/MenuBar'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <MenuBar/>
        Home. Not Protected. Anyone can see this.
      </div>
    )
  }
}
