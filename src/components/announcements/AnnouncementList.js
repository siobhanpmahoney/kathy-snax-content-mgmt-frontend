import React from 'react'
import AnnouncementListItem from './AnnouncementListItem'

const AnnouncementList = (props) => {
  return (
    <div className='announcement-list-wrapper'>
      {props.announcements.map((a) => {
        return <AnnouncementListItem handleDisplayAnnouncement={props.handleDisplayAnnouncement} announcement={a} key={a.id} />
      })}
    </div>
  )
}

export default AnnouncementList
