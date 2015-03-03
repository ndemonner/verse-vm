# VerseVM

A simple, stack-based virtual machine.

`npm install && npm test`

## Usage

```javascript
import VM from "verse-vm";

var vm = new VM;

// Load bytecode for execution. This can be a string of hex chars, or a raw
// buffer from something like fs.readFile
vm.load("010a 0000 0001 0b00 0000 0800");

// Execute the bytecode
var result = vm.execute();

// Result is a state object of the VM, and `result.value` holds the top of the
// stack when the execution is finished. If there is an error, `result.error` 
// will present it.
if (result.error) {
  console.log(result.error);
} else {
  console.log(result.value);
}
```

If you include the `verse-asm` package, you can compile assembly to bytecode
before execution.

```javascript
import VM from "verse-vm";
import Assembler from "verse-asm";

// Imagine a file called `addition.vasm`, containing:
// 
// push 10
// push 11
// add
//
var assembly = fs.readFileSync('./addition.vasm');
var assembler = new Assembler(assembly);
var bytecode = assembler.assemble();

// Now you can load the bytecode into a VM instance, as in the first example.
var vm = new VM;
vm.load(bytecode);
var result = vm.execute();
```

## Spec

### Instruction Set

Opcode | Bytecode | Operand (bytes) | Cost | Explanation
------ | -------- | --------------- | ---- | -----------
nop | `0x00` | | 0 | Does nothing
push | `0x01` | int (4) | 1 | Pushes operand on to the stack
pop | `0x02` | | 1 | Pops the top of the stack off
load | `0x03` | uint (1) | 1 | Pushes value stored in register indicated by the operand
store | `0x04` | uint (1) | 1 | Pops value and stores in register indicated by the operand
jmp | `0x05` | uint (2) | 1 | Moves the instruction pointer to the address indicated by the operand
jz | `0x06` | uint (2) | 1 | Pops `V1`. If `V1 == 0`, performs jmp to operand
jnz | `0x07` | uint (2) | 1 | Pops `V1`. If `V1 != 0`, performs jmp to operand
add | `0x08` | | 2 | Pops `V1` and `V2` and performs `V2 + V1`
sub | `0x09` | | 2 | Pops `V1` and `V2` and performs `V2 - V1`
mul | `0x0a` | | 2 | Pops `V1` and `V2` and performs `V2 * V1`
div | `0x0b` | | 2 | Pops `V1` and `V2` and performs `V2 / V1` using integer division
print | `0x0c` | | 1 | Pops value from stack and prints to console
stop | `0x0d` | | 0 | Halts the VM

int = signed integer  
uint = unsigned integer

### Capacity

Each VM starts with an assignable amount of energy, and will halt if an 
instruction costs more than the remaining capacity.

### Storage

There are 16 registers available, addressed `0x00` through `0x0f`.

### Addresses

Address operands are two-bytes wide, giving a max instruction buffer size of
65,536 bytes.
