import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import './FolderItem.css';

class FolderItem extends Component {
  render() {
    const { location, folder } = this.props;

    return (
      <div className="folder-item" >
        <Link to={`/folder/${folder.id}`}>
          {(location.pathname.slice(8) === folder.id) && <button type="button" className="folder__button--active">{folder.name}</button>}
          {(location.pathname.slice(8) !== folder.id) && <button type="button" >{folder.name}</button>}
        </Link>
      </div>
    )
  }
}

export default withRouter(FolderItem);

FolderItem.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  })
}