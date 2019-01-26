const API_URL = 'http://localhost:3000/api/v1'
const ANN_URL = API_URL + '/announcements'

const token = localStorage.getItem('token')

const headers = () => {
  console.log("token: ", token)
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
    'Authorization': `Bearer ${token}` // wrapped Authorization key in double quotess
  }
}

export function fetchAnnouncements() {
  return fetch(`http://localhost:3000/api/v1/announcements`, {
    headers: headers()
  }).then(res => res.json())
}

export function createAnnouncement(announcement_data) {
  return fetch(ANN_URL, {
    headers: headers(),
    method: 'POST',
    body: JSON.stringify(announcement_data)
  })
  .then(res => res.json())
}

export function updateAnnouncement(announcement_data) {
  const url = ANN_URL + '/' + `${announcement_data.id}`
  return fetch(url, {
    headers: headers(),
    method: 'PATCH',
    body: JSON.stringify(announcement_data)
  })
  .then(res => res.json())
}
