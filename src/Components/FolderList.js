import React from "react";
import { Link } from 'react-router-dom'
import FolderItem from "./FolderItem";
import NotefulContext from "../NotefulContext";


export default class FolderList extends React.Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders || [];
    console.log(this.context)
    const check = folders.map(folder => <FolderItem folder={folder} key={folder.id} />);

    return(
      <>
        {/* <NotefulContext.Consumer>
        {({ folders }) => ( */}
          <li className="sidebar__folder-list">
            {check}
          </li>
        {/* )} */}
      {/* </NotefulContext.Consumer> */}
      <Link to='/add-folder'><button type='button'>Add Folder</button></Link>
    </>
    );
  }
}
