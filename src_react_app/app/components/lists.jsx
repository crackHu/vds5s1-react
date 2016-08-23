import React from 'react';
import {get} from '../utils/ajax';
/*import '../main.scss';*/
import {
	Media
} from 'react-bootstrap';

export default class ListCustom extends React.Component {

	constructor(props) {
		super(props);
		this.state = {"list": []};
	}


	render() {
		
		let url = `https://api.github.com/search/users?q=a`;
		get(url).then((data) => {
			this.setState({"list": data.items});
		}).catch((error) => {
			console.error(error);
		});
		
		const imgStyle = {
			width: '50px'
		}
		return(
			<div className="container">
				{this.state.list.map(people => {
					return (
					<Media>
					 <Media.Left>
						<img width={64} height={64} src={people.avatar_url} alt="Image"/>
					  </Media.Left>
					  <Media.Body>
						<Media.Heading>{people.login}</Media.Heading>
						<p>{people.url}</p>
					  </Media.Body>
					</Media>
					)
				})}
			</div>
		)
	};
}