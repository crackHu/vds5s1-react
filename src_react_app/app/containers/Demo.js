import React from 'react';

import Header from './header';
import Body from './body';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
    };
    this.refreshKeyword = this.refreshKeyword.bind(this);
  }

  refreshKeyword(word) {
    this.setState({
      searchWord: word,
    });
  }

  render() {
    return (
      <div>
        <Header sendAction={this.refreshKeyword}/>
        <Body searchWord={this.state.searchWord}/>
      </div>
    )
  };
}