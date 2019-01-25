import React from 'react'

export const BLOCK_TYPE_HEADINGS = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" }
]

const HeadingOptions = (props) => {
  const onToggle = (event) => {
    let value = event.target.value
    props.onToggle(value)
  }



  return (
    <span>
      <select value={props.active} onChange={onToggle}>
        <option value=''>Heading Levels</option>
        {BLOCK_TYPE_HEADINGS.map((heading) => {
          return <option className={props.active ? "RichEditor-styleButton RichEditor-activeButton" : "RichEditor-styleButton"} value={heading.style}>{heading.label}</option>
        })}
      </select>
    </span>
  )
}

export default HeadingOptions
