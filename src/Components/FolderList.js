import React from "react";
import { Link } from 'react-router-dom'
import FolderItem from "./FolderItem";
import NotefulContext from "../NotefulContext";
import Button from "@material-ui/core/Button";


export default class FolderList extends React.Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders || [];

    const check = folders.map(folder => <FolderItem folder={folder} key={folder.id} />);

    return(
      <>
          <li className="sidebar__folder-list">
            {check}
          </li>
      <Link to='/add-folder'><Button variant="contained" color="primary" type='button'>Add Folder</Button></Link>
    </>
    );
  }
}
