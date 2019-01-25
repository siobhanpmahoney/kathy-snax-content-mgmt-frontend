import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import StyleButton from "./StyleButton";
// import HeadingStyleDropDown from './HeadingStyleDropDown'




export const BLOCK_TYPES = [
	{ label: " “ ” ", style: "blockquote" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
];

const BlockStyles = props => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<span className="RichEditor-controls">


			{BLOCK_TYPES.map(type => (
				 <StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</span>
	);
};

export default BlockStyles
