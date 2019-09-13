import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {

  },
  postAPI: () => {

  },
  
})

export default NotefulContext;