import { CPU } from './cpu'

export const ls8 = treasure => {
	const cpu = new CPU(treasure)
	cpu.load()
	return cpu.run()
}
