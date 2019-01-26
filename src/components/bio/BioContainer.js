import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loadBio, updateBioAction} from '../../actions'
import BioEditor from './BioEditor'
import BioPReview from './BioPreview'

class BioContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      content: null
    }
  }

  componentDidMount() {
    this.props.loadBio()
    if (this.props.bio.content) {
      this.setState({
       content: this.props.bio.content
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bio != this.props.bio) {
      this.setState({
        content: this.props.bio.content
      })
    }
  }


  handleUpdateBio = () => {
    let bio_state = Object.assign({}, this.state)
    console.log("bio_state", bio_state)
    this.props.updateBioAction(bio_state)
  }

  handleSaveEditorUpdates = (edits) => {
    this.setState({
      content: edits
    }, this.handleUpdateBio)

  }





  render() {
    return (
      <div className='bio-page-container'>
        <div className='header'>
          Bio <button onClick={this.onSubmitEdits}>save</button>
        </div>

        <BioEditor bio={this.props.bio} handleSaveEditorUpdates={this.handleSaveEditorUpdates} />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    bio: state.bio
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadBio, updateBioAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BioContainer)
