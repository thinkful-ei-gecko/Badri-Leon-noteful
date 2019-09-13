import React from 'react';
import slugify from 'slugify';

export default class ComputerOption extends React.Component {


    render() {
        return (
            <div key={itemHash} className="feature__item">
              <input type="radio" id={itemHash} className="feature__option" name={slugify(feature)} checked={item.name === this.state.selected[feature].name} 
              onChange={e => this.updateFeature(feature, item)}
              />
              <label htmlFor={itemHash} className="feature__label">
                {item.name} ({USCurrencyFormat.format(item.cost)})
              </label>
            </div>
          );
    }
}