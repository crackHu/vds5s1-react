import React from 'react';
import ReactDOM from 'react-dom';
import Forms from '../components/forms';
import {
	Table,
	Button,
	Glyphicon,
	Label
} from 'react-bootstrap';
import {
	get
} from '../utils/ajax';
import '../main.css';

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"loading": false,
			"list": [],
			"operateId" : "",
			"detail": false
		};
	}

	componentDidMount() {
		this.setState({
			"firstView": true,
			"detail": false
		});
	}
	componentWillReceiveProps(nextProps) {
		let searchWord = nextProps.searchWord;

		if (searchWord != null && searchWord != '') {
			this.setState({
				"loading": true,
				"firstView": false,
				"detail": false
			});
			let url = `https://api.github.com/search/users?q=${searchWord}`;
			get(url).then((data) => {
				this.setState({
					"loading": false,
					"list": data.items,
					"detail": false
				});
			}).catch((error) => {
				console.error(error);
			});
		}
	}

	handleOperate(peopleId, peopleLogin, peopleUrl) {
   		 this.setState({
				"detail": true,
				"peopleId": peopleId,
				"peopleLogin": peopleLogin,
				"peopleUrl": peopleUrl,
			});
	}

	render() {
		if (this.state.detail) {
			return <div><Forms 
							peopleId={this.state.peopleId}
							peopleLogin={this.state.peopleLogin}
							peopleUrl={this.state.peopleUrl}
						/></div>
		}
		if (this.state.firstView) {
			return (
				<div className="container">
						<div className="row">
							<Table striped bordered condensed hover>
								<thead>
								  <tr>
									<th>#</th>
									<th>Avatar</th>
									<th>Name</th>
									<th>WebSite</th>
									<th>操作</th>
								  </tr>
								</thead>
								<tbody>
									<tr>
										<h2>输入关键字搜索</h2>
									</tr>
								</tbody>
						  	</Table>
						</div>
				</div>
			);
		}
		if (this.state.loading) {
			return (
				<div className="container">
						<div className="row">
							<Table striped bordered condensed hover>
								<thead>
								  <tr>
									<th>#</th>
									<th>Avatar</th>
									<th>Name</th>
									<th>WebSite</th>
									<th>操作</th>
								  </tr>
								</thead>
								<tbody>
									<tr>
										<h2>搜索中...</h2>
									</tr>
								</tbody>
						  	</Table>
						</div>
				</div>
			);
		} else {
			if (this.state.list.length === 0) {
				return (
					<h2>No result.</h2>
				)
			} else {
				return (
					<div className="container">
						<div className="row">
							<Table striped bordered condensed hover>
								<thead>
								  <tr>
									<th>#</th>
									<th>Avatar</th>
									<th>Name</th>
									<th>WebSite</th>
									<th>操作</th>
								  </tr>
								</thead>
								<tbody>

								{this.state.list.map(people => {
									return (
									  <tr>
										<td>{people.id}</td>
										<td>
											<img width={64} height={64} src={people.avatar_url} alt="Image"/>
										</td>
										<td>{people.login}</td>
										<td><a href={people.url}>{people.url}</a></td>
										<td>
											<Button bsSize="large" bsStyle="link" block 
													onClick={this.handleOperate.bind(this, people.id, people.login, people.url)}>
												<Glyphicon className="operate" glyph="edit" />
											</Button>
										</td>
									  </tr>
									)
								})}

								</tbody>
							  </Table>
						</div>
					</div>
				);
			}
		}
	}
}