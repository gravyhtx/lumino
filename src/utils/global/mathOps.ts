//* MATH OPERATIONS

type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'pow' | 'sqrt' | 'sin' | 'cos' | 'tan' | 'sinh' | 'cosh' | 'tanh' | 'ln' | 'log10';

/**
 * Represents a mathematical operation and its arguments.
 */
type OperationEntry = {
  operation: Operation;
  args: number[];
};

/**
 * Provides various mathematical operations and keeps track of these operations.
 * @returns {object} - Object containing methods for basic mathematical operations, constants, and other common operations.
 *
 * @example
 * const ops = mathOps();
 * ops.add(10, 20);
 * ops.subtract(5);
 * ops.multiply(2);
 * console.log(ops.listOps); // Outputs the sequence of operations
 * ops.clear(); // Clears the operations sequence
 */
export const mathOps = (): object => {  
  /**
   * Outputs the sequence of operations.
   * @returns { operation: string, args: number[] } - Outputs the sequence of operations.
  */
  const listOps: OperationEntry[] = [];

  /**
   * Adds the provided numbers together and logs the operation.
   * 
   * @param {...number[]} numbers - The numbers to add.
   * @returns {number|undefined} - The sum of the numbers, or undefined if no arguments are provided.
   */
  const add = (...numbers: number[]): number | undefined => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'add' function.");
    }
    if (numbers.length) {
      listOps.push({ operation: 'add', args: numbers });
      return numbers.reduce((acc, curr) => acc + curr, 0);
    }
  }

  /**
   * Subtracts the provided numbers from the first number and logs the operation.
   * 
   * @param {...number[]} numbers - The numbers to subtract.
   * @returns {number|undefined} - The result of the subtraction, or undefined if no arguments are provided.
   */
  const subtract = (...numbers: number[]): number | undefined => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'subtract' function.");
    }
    if (numbers.length) {
      listOps.push({ operation: 'subtract', args: numbers });
      return numbers[0] ? numbers[0] - numbers.slice(1).reduce((acc, curr) => acc + curr, 0) : undefined;
    }
  }

  /**
   * Multiplies the provided numbers together and logs the operation.
   * 
   * @param {...number[]} numbers - The numbers to multiply.
   * @returns {number|undefined} - The product of the numbers, or undefined if no arguments are provided.
   */
  const multiply = (...numbers: number[]): number | undefined => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'multiply' function.");
    }
    if (numbers.length) {
      listOps.push({ operation: 'multiply', args: numbers });
      return numbers.reduce((acc, curr) => acc * curr, 1);
    }
  }

  /**
   * Divides the first number by the subsequent numbers and logs the operation.
   * Throws an error if attempting to divide by zero.
   * 
   * @param {...number[]} numbers - The numbers for the division operation. 
   * @returns {number|undefined} - The result of the division, or undefined if no arguments are provided.
   * @throws {Error} - Throws an error if one of the numbers is zero.
   */
  const divide = (...numbers: number[]): number | undefined => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'divide' function.");
    }
    if (numbers.length) {
      if (numbers.slice(1).includes(0)) {
        throw new Error("Cannot divide by zero");
      }
      listOps.push({ operation: 'divide', args: numbers });
      return numbers[0] ? numbers[0] / numbers.slice(1).reduce((acc, curr) => acc * curr, 1) : undefined;
    }
  }

  /**
   * Returns the value of Pi.
   * @constant
   * @type {number}
   * @example
   * const circumference = ops.multiply(2, ops.pi, r);
   */
  const pi: number = Math.PI;

  /**
   * Calculates the power of a base number raised to an exponent.
   * @param {number} base - Base number.
   * @param {number} exponent - Exponent to raise the base to.
   * @returns {number} - Result of the operation.
   * @example
   * pow(2, 3); // Returns 8
   */

  const pow = (base: number, exponent: number): number => {
    if (base < 0 && exponent !== Math.round(exponent)) {
      throw new Error("Fractional exponents for negative bases are not supported.");
    }
    listOps.push({ operation: 'pow', args: [base, exponent] });
    return Math.pow(base, exponent);
  }

  /**
   * Calculates the square root of a number.
   * @param {number} number - Number to find the square root of.
   * @returns {number} - Square root of the number.
   * @example
   * sqrt(9); // Returns 3
   */
  const sqrt = (number: number): number => {
    if (number < 0) {
      throw new Error("Cannot calculate the square root of a negative number.");
    }
    listOps.push({ operation: 'sqrt', args: [number] });
    return Math.sqrt(number);
  }

  /**
   * Calculates the natural logarithm (base e) of a number.
   * @param {number} number - Number to compute the logarithm for.
   * @returns {number} - Result of the operation.
   * @example
   * ln(2.71828); // Returns approximately 1
   */
  const ln = (number: number): number => {
    if (number <= 0) {
      throw new Error("Cannot calculate the natural logarithm for non-positive values.");
    }
    listOps.push({ operation: 'ln', args: [number] });
    return Math.log(number);
  }

  /**
   * Calculates the base-10 logarithm of a number.
   * @param {number} number - Number to compute the logarithm for.
   * @returns {number} - Result of the operation.
   * @example
   * log10(100); // Returns 2
   */
  const log10 = (number: number): number => {
    if (number <= 0) {
      throw new Error("Cannot calculate the base-10 logarithm for non-positive values.");
    }
    listOps.push({ operation: 'log10', args: [number] });
    return Math.log10(number);
  }

  /**
   * Calculates the sine of a number (in radians).
   * @param {number} number - Number to compute the sine for.
   * @returns {number} - Result of the operation.
   * @example
   * sin(Math.PI / 2); // Returns 1
  */
  const sin = (number: number): number => {
    listOps.push({ operation: 'sin', args: [number] });
    return Math.sin(number);
  }

  /**
   * Calculates the cosine of a number (in radians).
   * @param {number} number - Number to compute the cosine for.
   * @returns {number} - Result of the operation.
   * @example
   * cos(Math.PI); // Returns -1
  */
  const cos = (number: number): number => {
    listOps.push({ operation: 'cos', args: [number] });
    return Math.cos(number);
  }

  /**
   * Calculates the tangent of a number (in radians).
   * @param {number} number - Number to compute the tangent for.
   * @returns {number} - Result of the operation.
   * @example
   * tan(Math.PI / 4); // Returns 1
  */
  const tan = (number: number): number => {
    listOps.push({ operation: 'tan', args: [number] });
    return Math.tan(number);
  }

  /**
   * Calculates the hyperbolic sine of a number.
   * @param {number} number - Number to compute the hyperbolic sine for.
   * @returns {number} - Result of the operation.
   * @example
   * sinh(1); // Returns approximately 1.175
  */
  const sinh = (number: number): number => {
    listOps.push({ operation: 'sinh', args: [number] });
    return Math.sinh(number);
  }

  /**
   * Calculates the hyperbolic cosine of a number.
   * @param {number} number - Number to compute the hyperbolic cosine for.
   * @returns {number} - Result of the operation.
   * @example
   * cosh(1); // Returns approximately 1.543
  */
  const cosh = (number: number): number => {
    listOps.push({ operation: 'cosh', args: [number] });
    return Math.cosh(number);
  }

  /**
   * Calculates the hyperbolic tangent of a number.
   * @param {number} number - Number to compute the hyperbolic tangent for.
   * @returns {number} - Result of the operation.
   * @example
   * tanh(1); // Returns approximately 0.761
  */
  const tanh = (number: number): number => {
    listOps.push({ operation: 'tanh', args: [number] });
    return Math.tanh(number);
  }

  /**
   * Clears the operation sequence.
   * @example
   * ops.clear(); // This will clear the operations sequence
   */
  const clear = () => {
    listOps.length = 0;
  }

  const allOps = {
    add, subtract, multiply, divide, pow, sqrt, pi, ln, log10, 
    sin, cos, tan, sinh, cosh, tanh, listOps, clear
  };

  return allOps;
};


/**
 * Calculates the result based on the provided sequence of operations.
 * @param {OperationEntry[]} operations - List of operations to calculate.
 * @returns {number} - Result of the calculation.
 *
 * @example
 * const ops = mathOps();
 * ops.add(2, 3);
 * ops.subtract(1);
 * ops.pow(2, 3); // 2 raised to power 3
 * const result = calculateMathOps(ops.listOps);
 * console.log(result);  // Outputs 13 (2 + 3 - 1 + 8)
 * @example
 * //* Consider you perform the following operations in order:
 * 
 * //* 1. Add 2 and 3 (Result = 5)
 * //* 2. Subtract 1 (Result = 4)
 * //* 3. Multiply by 2 (Result = 8)
 * //* 4. Take square root (Result = 2.83 [rounded off to two decimal places])
 * //* 5. Take natural logarithm (Result = 1.04 [rounded off to two decimal places])
 * 
 * //* In essence, you're doing:
 * //* ln(√((2 + 3 - 1) * 2)) = 1.04 (rounded off to two decimal places)
 * 
 * //* Hence, when you do:
 *  const ops = mathOps();
 *  ops.add(2, 3);
 *  ops.subtract(1);
 *  ops.multiply(2);
 *  ops.sqrt();
 *  ops.ln();
 *  const result = calculateMathOps(ops.listOps);
 * 
 * //* `result` should be approximately 1.04.
 */
export const calculateMathOps = (operations: OperationEntry[]): number => {
  let result: number = operations[0]?.operation === 'add' ? operations[0].args.reduce((acc, curr) => acc + curr, 0) : 0;

  for (let i = 1; i < operations.length; i++) {
    const op = operations[i];
    if (op) {
      switch (op.operation) {
        case "add":
          result += op.args.reduce((acc, curr) => acc + curr, 0);
          break;
        case "subtract":
          result -= op.args.reduce((acc, curr) => acc + curr, 0);
          break;
        case "multiply":
          result *= op.args.reduce((acc, curr) => acc * curr, 1);
          break;
        case "divide":
          result /= op.args.reduce((acc, curr) => acc * curr, 1);
          break;
        case "pow":
          result = Math.pow(result, Number(op.args[1]));
          break;
        case "sqrt":
          result = Math.sqrt(result);
          break;
        case "ln":
          result = Math.log(result);
          break;
        case "log10":
          result = Math.log10(result);
          break;
        case "sin":
          result = Math.sin(result);
          break;
        case "cos":
          result = Math.cos(result);
          break;
        case "tan":
          result = Math.tan(result);
          break;
        case "sinh":
          result = Math.sinh(result);
          break;
        case "cosh":
          result = Math.cosh(result);
          break;
        case "tanh":
          result = Math.tanh(result);
          break;
        default:
          throw new Error(`Unsupported operation: ${String(op.operation)}`);
      }
    }
  }
  return result;
};