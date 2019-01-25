import React from 'react'

import BioEditor from './BioEditor'
import BioPReview from './BioPreview'

class BioContainer extends React.Component {
  render() {
    return (
      <div className='bio-page-container'>
        <div className='header'>
          Bio
        </div>

        <BioEditor />
      </div>
    )
  }
}

export default BioContainer
