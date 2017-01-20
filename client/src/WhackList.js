import React from 'react'
import {compose, withState} from 'recompose'

const styles = {
	container: {
		background: '#ffeb3b',
		color: '#222',
		padding: 10
	},
	heading: {
		fontSize: 19,
		textAlign: 'center'
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
	},
	item: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		width: 30, height: 30, borderRadius: 30, margin: '5px 10px'
	},
	name: {flex: 1}
}

const WhackList = ({whacklist}) =>
	<div style={styles.container}>
		<div style={styles.heading}>{'<whack-annevo/>'}</div>
		<div style={styles.list}>
			{!whacklist.length
				? <pre>loading...</pre>
				: whacklist.sort((a, b) => b.whacks - a.whacks)
					.map(p =>
						<div key={p.id} style={styles.item}>
							<img style={styles.avatar} src={p.photoURL}/>
							<div style={styles.name}>{p.id}</div>
							<div>{p.whacks}</div>
						</div>
					)
		}</div>
	</div>

export default WhackList
