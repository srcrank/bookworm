const remoteURL = "http://localhost:8088";

//fetches the Library, all lib items
export const getLibrary = () => {
  return fetch(`${remoteURL}/library`).then((res) => res.json());
};

export const getUsersLibrary = (userId) => {
  return fetch(`${remoteURL}/library?userId=${userId}`).then((results) =>
    results.json()
  );
};

export const getLibItemById = (id) => {
  return fetch(`${remoteURL}/library?id=${id}`).then((results) =>
    results.json()
  );
};

export const getStatusFromLib = (status) => {
  return fetch(`${remoteURL}/library?status=${status}`).then((results) =>
    results.json()
  );
};

//will post books to user's list
export const addBook2Lib = (libObj) => {
  return fetch(`${remoteURL}/library/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(libObj),
  }).then((response) => response.json());
};

export const updateLibItem = (editedLib, libId) => {
  return fetch(`${remoteURL}/library/${libId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedLib[0]),
  }).then((data) => data.json());
};

export const deleteBookInLib = (id) => {
  return fetch(`${remoteURL}/library/${id}`, {
    method: "DELETE",
  }).then((result) => result.json());
};
