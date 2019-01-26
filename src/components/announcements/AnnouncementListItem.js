import React from 'react'

class AnnouncementListItem extends React.Component {
  render() {
    console.log(this.props.announcement.headline)
    return (
      <div className='announcement-item-wrapper' id={this.props.announcement.id}>

        {this.props.announcement.headline}
      </div>
    )
  }
}

export default AnnouncementListItem
