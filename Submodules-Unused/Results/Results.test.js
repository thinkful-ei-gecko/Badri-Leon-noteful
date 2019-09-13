import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Results from './Results';

const fakeBookData = {
  bookInfo: [
    {
      title: 'Apples',
      picture: 'http://books.google.com/books/content?id=FDEknQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      description: 'who loves apples',
      price: '501 usd',
      author: 'apple lady1'
    },
    {
      title: 'Apples2',
      picture: 'http://books.google.com/books/content?id=FDEknQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      description: 'who loves apples2',
      price: '502 usd',
      author: 'apple lady2'
    },
    {
      title: 'Apples3',
      picture: 'http://books.google.com/books/content?id=FDEknQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      description: 'who loves apples3',
      price: '503 usd',
      author: 'apple lady3'
    },
    {
      title: 'Apples4',
      picture: 'http://books.google.com/books/content?id=FDEknQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      description: 'who loves apples4',
      price: '504 usd',
      author: 'apple lady4'
    },
  ]
}

describe('<Results />', () => {
  //smoke test with data?
  it('renders book list with data', () => {
    const div= document.createElement('div');
    ReactDOM.render(<Results stateData={fakeBookData.bookInfo} />,div);
    ReactDOM.unmountComponentAtNode(div);
  });

  //snapshot with enzyme
  it('renders the Results UI with data', () => {
    const wrapper = shallow(<Results stateData={fakeBookData.bookInfo} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
});