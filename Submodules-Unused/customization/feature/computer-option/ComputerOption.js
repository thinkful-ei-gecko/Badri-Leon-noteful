import React from 'react';
import slugify from 'slugify';


export default class ComputerOption extends React.Component {


    render() {
        return (
            <div className="feature__item" key={this.props.itemHash}>
                <input
                    type="radio"
                    id={this.props.itemHash}
                    className="feature__option"
                    // name={slugify(this.props.feature)}
                    // checked={this.props.name === this.props.selected[this.props.feature].name}
                    // onChange={e => this.updateFeature(this.props.feature, this.props.item)}
                />
                <label htmlFor={this.props.itemHash} className="feature__label">
                    {this.props.name} ({this.props.cost})
              </label>
            </div>
        );
    }
}