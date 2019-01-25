import React from 'react'
import {inlineStyles} from './styles'

class StyleMenu extends React.Component {
  render() {
    return (
      <div className='style-menu'>
        {inlineStyles.map((s) => {
          return <button key = {s.buttonId} name={s.style} onClick={this.props.handleStyleButton}>
            {s.style[0]}
          </button>
        })}
      </div>
    )
  }
}

export default StyleMenu
