import React from "react";
import { Link } from 'react-router-dom'
import FolderItem from "./FolderItem";
import NotefulContext from "../NotefulContext";


export default function FolderList(props) {
  //static contextType = NotefulContext;
  //const { folders } = this.context;

  return (
    <>
      <NotefulContext.Consumer>
        {({ folders }) => (
          <li className="sidebar__folder-list">
            {folders.map(folder => <FolderItem folder={folder} key={folder.id} />)}
          </li>
        )}
      </NotefulContext.Consumer>
      <Link to='/add-folder'><button type='button'>Add Folder</button></Link>
    </>
  );
}
