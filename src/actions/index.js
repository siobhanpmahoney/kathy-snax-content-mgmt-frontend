export const SET_USER = 'SET_USER'
export const LOAD_BIO = 'LOAD_BIO'
export const UPDATE_BIO = 'UPDATE_BIO'

export function setUser(user) {
  return (dispatch) => {
    return dispatch({
      type: SET_USER,
      payload: user
    })
  }
}

export function loadBio() {
 return dispatch => {
  fetch("http://localhost:3000/api/v1/bios/1")
   .then(response => response.json())
   .then(json => dispatch({ type: LOAD_BIO, payload: json })
 )}
}

export function updateBio(bio_content) {
  console.log(bio_content)
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/bios/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Accepts: "application/json" },
      body: JSON.stringify({ content: bio_content })
    })
    .then(response => response.json())
    .then(json =>
      dispatch({ type: UPDATE_BIO, payload: json })
    );
  }
}
