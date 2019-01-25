import React from 'react'

const LinkInput = (props) => {
  return (
    <div>
      {!!props.showURLInput &&
        <div>
          <input defaultValue="" value={props.urlValue} type="text" onChange={props.onURLChange} onKeyDown={props.onLinkInputKeyDown} />
          <button onMouseDown={props.confirmLink}>
            Confirm
          </button>

        </div>
      }
      <button onMouseDown={props.promptForLink}>
        Add Link
      </button>
      <button onMouseDown={props.removeLink}>
        Remove Link
      </button>
    </div>
)
}

export default LinkInput
