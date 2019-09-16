import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types'

class FolderItem extends Component {
  render() {
    const { location, folder } = this.props;

    return (
      <div className="folder-item" >
        <Link to={`/folder/${folder.id}`}>
          {(location.pathname.slice(8) === folder.id) && <Button variant="text" color="primary" type="button" className="folder__button--active">{folder.name}</Button>}
          {(location.pathname.slice(8) !== folder.id) && <Button variant="text" color="primary" type="button" >{folder.name}</Button>}
        </Link>
      </div>
    )
  }
}

FolderItem.propTypes = {
  location: PropTypes.object.isRequired,
  folder: PropTypes.object.isRequired
};

export default withRouter(FolderItem);