import React from 'react'

const colors = {
	normal: '#ffeb3b',
	hit: '#3bff3b',
	miss: '#ff3b3b'
}
const style = (photo, color) => ({
		width: 50, height: 50,
		margin: 10,
		border: `3px solid ${color}`,
		borderRadius: '50%',
		display: 'inline-block',
		transition: 'opacity .3s ease-out',
		opacity: photo ? 1 : .1,
		cursor: photo ? 'pointer' : 'normal',
		backgroundImage: `url(${photo})`,
		backgroundSize: 'contain'
})

const Grid = ({size = 5, socketId, targets, whacks, photos, onClick}) =>
	<div>{/* render size * size grid */}
		{Array.from({length: size}).map((_, row) =>
			<div key={row}>{/* break row */}
				{Array.from({length: size}).map((_, col) => {
					const pos = size * row + col
					const {id} = targets.find(t => t.pos === pos) || {}
					const hits = whacks.find(w => w.pos === pos && w.client === socketId)
					const miss = whacks.find(w => w.pos === pos && w.client !== socketId)

					const hitHandler = () => id && onClick({pos, id})

					return <div key={pos} style={style(photos[id], colors[hits ? 'hit' : miss ? 'miss' : 'normal'])} onClick={hitHandler}/>
				})}
			</div>
		)}
	</div>

export default Grid
