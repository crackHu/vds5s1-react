import {
	GET_AGE_PERCENT,
	GET_JQJDS,
	QUERY_ADD,
	QUERY_UPDATE
} from 'ActionTypes'


let initialState = {}

const columns = [{
	title: 'Full Name',
	width: 100,
	dataIndex: 'name',
	key: 'name',
	fixed: 'left'
}, {
	title: 'Age',
	width: 100,
	dataIndex: 'age',
	key: 'age',
	fixed: 'left'
}, {
	title: 'Column 1',
	dataIndex: 'address',
	key: '1',
	width: 150
}, {
	title: 'Column 2',
	dataIndex: 'address',
	key: '2',
	width: 150
}, {
	title: 'Column 3',
	dataIndex: 'address',
	key: '3',
	width: 150
}, {
	title: 'Column 4',
	dataIndex: 'address',
	key: '4',
	width: 150
}, {
	title: 'Column 5',
	dataIndex: 'address',
	key: '5',
	width: 150
}, {
	title: 'Column 6',
	dataIndex: 'address',
	key: '6',
	width: 150
}, {
	title: 'Column 7',
	dataIndex: 'address',
	key: '7',
	width: 150
}, {
	title: 'Column 8',
	dataIndex: 'address',
	key: '8'
}, {
	title: 'Action',
	key: 'operation',
	fixed: 'right',
	width: 100,
	render: () => <a href="#">action</a>,
}, ];

const stat = function(state = initialState, action) {

	console.log("stat reducer state => ", state)

	let updatedState = {...state
	}
	switch (action.type) {
		case GET_AGE_PERCENT:

			updatedState = {...updatedState,
				per: action.res
			}
			return updatedState
		case GET_JQJDS:

			updatedState = {...updatedState,
				jqj: action.res.jqjds
			}
			return updatedState

		case QUERY_ADD:
			updatedState = {...updatedState,
				zjxz: action.res.zjxz
			}
			return updatedState

		case QUERY_UPDATE:
			updatedState = {...updatedState,
				zjxg: action.res.zjxg
			}
			return updatedState
		default:
			return state
	}
}

module.exports = {
	stat,
}