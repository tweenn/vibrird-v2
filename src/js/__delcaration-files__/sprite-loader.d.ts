
type SpritesToLoadObject = {
	id: string,
	path: string,
	type?: string,
	properties?: {
		width?: number,
		height?: number,
		frames?: number
	}
}

type SpritesToLoadArray = Array<SpritesToLoadObject>;
