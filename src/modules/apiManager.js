const remoteURL = "http://localhost:8088"

export default {
  get(database, id) {
    return fetch(`${remoteURL}/${database}/${id}`).then(data => data.json())
  },
  getAll(database, queryParams) {
    // return fetch(`${remoteURL}/${database}`)
    let url = `${remoteURL}/${database}`
    if (queryParams) {
      url += `?${queryParams}`
    }
    return fetch(url)
    .then(data => data.json())
  },
  delete(database, id, queryParams, DB2) {

    return fetch(`${remoteURL}/${database}/${id}`, {
      method: "DELETE"
    })
      .then(() => this.getAll(DB2, queryParams))
    },
  // deleteTwo(database, id, DB2, id2, queryParams) {
  //   debugger
  //     return fetch(`${remoteURL}/${database}/${id}`, {
  //         method: "DELETE"
  //       })
  //       .then(fetch(`${remoteURL}/${DB2}/${id2}`, {
  //           method: "DELETE"
  //         })
  //         )
  //       .then(() => this.getAll(DB2, queryParams))
  // },
  post(database, newData) {
    return fetch(`${remoteURL}/${database}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify(newData)
    }).then(data => data.json())
  },
  put(database, editedItem) {
    return fetch(`${remoteURL}/${database}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    }).then(data => data.json());
  },
  patch(database, id, boolean) {
    return fetch(`${remoteURL}/${database}/${id}`, {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(boolean)
    }).then(data => data.json());
  },

}