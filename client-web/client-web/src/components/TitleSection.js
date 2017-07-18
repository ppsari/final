import React from 'react'

export default class TitleSection extends React.Component {
  render () {
    return (
      <div>
        <h4 className="text-center m-t-50">
          <span className="light">{this.props.lightTitle || null} </span>
          <span className="extra-bold green">{this.props.boldTitle || null}</span>
        </h4>
        <div className="devider">
          <div className="line-light"></div>
          <div className="line-bold"></div>
        </div>
      </div>
    )
  }
}
