## VerseVM

A simple, stack-based virtual machine.

`npm install && npm test`

### Spec

Opcode | Bytecode | Operand (bytes) | Cost | Explanation
------ | -------- | --------------- | ---- | -----------
nop | 0x00 | | 0 | Does nothing
push | 0x01 | int (4) | 1 | Pushes operand on to the stack
pop | 0x02 | | 1 | Pops the top of the stack off
load | 0x03 | uint (1) | 1 | Pushes value stored in register indicated by the operand
store | 0x04 | uint (1) | 1 | Pops value and stores in register indicated by the operand
jmp | 0x05 | uint (2) | 1 | Moves the instruction pointer to the address indicated by the operand
jz | 0x06 | uint (2) | 1 | If op of stack is 0, performs jmp to operand
jnz | 0x07 | uint (2) | 1 | If op of stack is not 0, performs jmp to operand
add | 0x08 | | 2 | Pops `V1` and `V2` and performs `V2 + V1`
sub | 0x09 | | 2 | Pops `V1` and `V2` and performs `V2 - V1`
mul | 0x0a | | 2 | Pops `V1` and `V2` and performs `V2 * V1`
div | 0x0b | | 2 | Pops `V1` and `V2` and performs `V2 / V1` using integer division
print | 0x0c | | 1 | Pops value from stack and prints to console
stop | 0x0d | | 0 | Halts the VM

int = signed integer  
uint = unsigned integer

Each VM starts with an assignable amount of energy, and will halt if an 
instruction costs more than the remaining capacity.
