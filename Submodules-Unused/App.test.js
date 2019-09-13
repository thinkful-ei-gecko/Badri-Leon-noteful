import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

describe('<App />', () => {

  //smoke test
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

    //snapshot with enzyme
  it('renders empty with no data', () => {
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

});