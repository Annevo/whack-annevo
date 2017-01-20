import {handleActions} from 'redux-actions'

const WHACK = 'WHACK'
const SPAWN = 'SPAWN'

const initialState = {
	targets: [],
	whacklist: [{
		id: 'Carl',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/13876233_10154410949867082_1152919385177312056_n.jpg?oh=5b05edb24e83e063427d9eb4f1a04862&oe=5888A436',
		whacks: 0
	}, {
		id: 'Jonathan',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/11751475_10155894911490327_1282869128395322160_n.jpg?oh=fe711dc22208a60187ec34ea5bc90689&oe=589A5EAE',
		whacks: 0
	}, {
		id: 'William',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/12993469_1166145500071932_2156081123145020013_n.jpg?oh=70024501d74715176b7301fe24fe544c&oe=588C6A97',
		whacks: 0
	}, {
		id: 'Elias',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/11745336_10153117682778246_5906044733314318261_n.jpg?oh=4ada02bb3c53068181828452a736919f&oe=58953404',
		whacks: 0
	}, {
		id: 'Johan',
		photoURL: 'https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-1/p320x320/10632692_10152595158412670_5512770102977608167_n.jpg?oh=146116a6d4ab323b3ad9effb12b989bd&oe=58D9E877',
		whacks: 0
	}, {
		id: 'Gustav',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/556787_10150807837736640_954538275_n.jpg?oh=cdef8f4e234c78372675fe2efd6abba3&oe=5895C318',
		whacks: 0
	}, {
		id: 'Anders',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/13177937_10153381257166741_2413308685502800740_n.jpg?oh=dd02415a15e2f502cd16c7aaa1d71067&oe=588E924C',
		whacks: 0
	}, {
		id: 'Sara',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c70.94.596.596/s320x320/13427819_10209452780336039_4874144990460681937_n.jpg?oh=2ee30feb77a7fd44b86839edb002f2eb&oe=5891A2BC',
		whacks: 0
	}, {
		id: 'Joel',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/p320x320/11052506_10152831939212339_1133543793741493918_n.jpg?oh=64320fc71ad22d952f84270d040c22cf&oe=589712CF',
		whacks: 0
	}, {
		id: 'Martin',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c0.0.187.187/12193685_10153730842947472_5390963886475392622_n.jpg?oh=a8a7d1a407a15a3478293c448ae0fb8a&oe=58A3CFB7',
		whacks: 0
	}, {
		id: 'Alexandra',
		photoURL: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/10347164_10154137503030104_7255262705457178333_n.jpg?oh=d0b1e83d30a210ee4b65e9e456aa4c6f&oe=589BF2CB',
		whacks: 0
	}],
	whacks: []
}

export default handleActions({
	[SPAWN]: state => {
		if (!state.whacklist.length) {
			return state
		}
		const random = Math.random() * 4 | 0
		return {
			...state,
			whacks: [],
			targets: Array.from({length: random})
				.map(() => {
					const target = state.whacklist[Math.random() * state.whacklist.length | 0]
					return {
						id: target.id,
						pos: Math.random() * 26 | 0
					}
				})
		}
	},
	[WHACK]: (state, {client, payload: {pos, id}}) => {
		const target = state.targets.find(t => t.id === id && t.pos === pos)
		return {
			...state,
			whacklist: state.whacklist.map(p =>
				target && p.id === id ? ({...p, whacks: p.whacks + 1}) : p),
			targets: state.targets.filter(t => t.pos !== pos && t.id !== id),
			whacks: target ? state.whacks.concat({id, client, pos}) : state.whacks
		}
	}
}, initialState)
