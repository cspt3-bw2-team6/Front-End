export class CPU {
	constructor(program) {
		this.answer = ''
		this.program = program
		this.ram = Array(256).fill(0)
		this.reg = Array(8).fill(0)
		this.pc = 0
		this.hlt = false
		this.ops = {
			0b10100000: this.op_add,
			0b00000001: this.op_hlt,
			0b10000010: this.op_ldi,
			0b10100010: this.op_mul,
			0b01000111: this.op_prn
		}
	}

	load() {}

	op_add = (operand_a, operand_b) => {}

	op_hlt = (operand_a, operand_b) => {
		this.hlt = true
	}

	op_ldi = (operand_a, operand_b) => {}

	op_mul = (operand_a, operand_b) => {}

	op_prn = (operand_a, operand_b) => {}

	ram_read = MAR => {}

	ram_write = (address, value) => {
		this.ram[address] = value
	}

	run() {
		// """Run the CPU."""
		while (!this.hlt) {
			let command = this.ram_read(this.pc)

			const operand_a = this.ram_read(this.pc + 1)
			const operand_b = this.ram_read(this.pc + 2)

			if (command in this.ops) {
				this.ops[command](operand_a, operand_b)
			} else {
			}
		}
	}
}
