import React from 'react';
import ReactDOM from 'react-dom';
import {
	Navbar,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    let searchWord = ReactDOM.findDOMNode(this.refs.searchWord).value;
    if (searchWord === '') {
      return;
    }
    this.props.sendAction(searchWord);
  }

  render() {
  	return (
  		<div>
  			<Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#demo">VDS基础平台</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text pullRight>
              柏道科技
            </Navbar.Text>
            <Navbar.Text>
              <Navbar.Link href="#">组件DEMO</Navbar.Link>
            </Navbar.Text>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl ref="searchWord" type="text" placeholder="Search" />
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.handleSearch}>搜索</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
  		</div>
  	)
  }
}