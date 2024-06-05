type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'pi' | 'pow' | 'sqrt' | 'sin' | 'cos' | 'tan' | 'sinh' | 'cosh' | 'tanh' | 'asin' | 'acos' | 'atan' | 'ln' | 'log10' | 'abs' | 'max' | 'min' | 'exp' | 'round' | 'floor' | 'ceil';

/**
 * Represents a mathematical operation and its arguments.
 */
type OperationEntry = {
  operation: Operation;
  args: number[];
};

/**
 * Provides various mathematical operations and keeps track of these operations.
 * @returns An object containing methods for basic mathematical operations, constants, and other common operations, as well as a function to calculate the result of the performed operations.
 *
 * @example
 * const { ops, calculate } = mathOps();
 * ops.add(10, 20);
 * ops.subtract(5);
 * ops.multiply(2);
 * console.log(ops.listOps); // Outputs the sequence of operations
 * const result = calculate(ops.listOps);
 * console.log(result); // Outputs the calculated result
 * ops.clear(); // Clears the operations sequence
 */
export const mathOps = () => {
  const listOps: OperationEntry[] = [];
  let result = 0;

  const updateResult = (newResult: number) => {
    result = newResult;
  };

  const add = (...numbers: number[]): number => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'add' function.");
    }
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    listOps.push({ operation: 'add', args: numbers });
    updateResult(result + sum);
    return sum;
  };

  const subtract = (...numbers: number[]): number => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'subtract' function.");
    }
    const diff = numbers.reduce((acc, curr) => acc - curr);
    listOps.push({ operation: 'subtract', args: numbers });
    updateResult(result - diff);
    return diff;
  };

  const multiply = (...numbers: number[]): number => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'multiply' function.");
    }
    const product = numbers.reduce((acc, curr) => acc * curr, 1);
    listOps.push({ operation: 'multiply', args: numbers });
    updateResult(result * product);
    return product;
  };

  const divide = (...numbers: number[]): number => {
    if (numbers.length === 0) {
      throw new Error("No arguments provided to the 'divide' function.");
    }
    if (numbers.slice(1).includes(0)) {
      throw new Error("Cannot divide by zero");
    }
    const quotient = numbers.reduce((acc, curr) => acc / curr);
    listOps.push({ operation: 'divide', args: numbers });
    updateResult(result / quotient);
    return quotient;
  };

  const pi = (): number => {
    listOps.push({ operation: 'pi', args: [] });
    updateResult(Math.PI);
    return Math.PI;
  };

  const pow = (base: number, exponent: number): number => {
    if (base < 0 && exponent !== Math.round(exponent)) {
      throw new Error("Fractional exponents for negative bases are not supported.");
    }
    const power = Math.pow(base, exponent);
    listOps.push({ operation: 'pow', args: [base, exponent] });
    updateResult(power);
    return power;
  };

  const sqrt = (number: number): number => {
    if (number < 0) {
      throw new Error("Cannot calculate the square root of a negative number.");
    }
    const squareRoot = Math.sqrt(number);
    listOps.push({ operation: 'sqrt', args: [number] });
    updateResult(squareRoot);
    return squareRoot;
  };

  const ln = (number: number): number => {
    if (number <= 0) {
      throw new Error("Cannot calculate the natural logarithm for non-positive values.");
    }
    const log = Math.log(number);
    listOps.push({ operation: 'ln', args: [number] });
    updateResult(log);
    return log;
  };

  const log10 = (number: number): number => {
    if (number <= 0) {
      throw new Error("Cannot calculate the base-10 logarithm for non-positive values.");
    }
    const log = Math.log10(number);
    listOps.push({ operation: 'log10', args: [number] });
    updateResult(log);
    return log;
  };

  const sin = (number: number): number => {
    const sine = Math.sin(number);
    listOps.push({ operation: 'sin', args: [number] });
    updateResult(sine);
    return sine;
  };

  const cos = (number: number): number => {
    const cosine = Math.cos(number);
    listOps.push({ operation: 'cos', args: [number] });
    updateResult(cosine);
    return cosine;
  };

  const tan = (number: number): number => {
    const tangent = Math.tan(number);
    listOps.push({ operation: 'tan', args: [number] });
    updateResult(tangent);
    return tangent;
  };

  const sinh = (number: number): number => {
    const hyperbolicSine = Math.sinh(number);
    listOps.push({ operation: 'sinh', args: [number] });
    updateResult(hyperbolicSine);
    return hyperbolicSine;
  };

  const cosh = (number: number): number => {
    const hyperbolicCosine = Math.cosh(number);
    listOps.push({ operation: 'cosh', args: [number] });
    updateResult(hyperbolicCosine);
    return hyperbolicCosine;
  };

  const tanh = (number: number): number => {
    const hyperbolicTangent = Math.tanh(number);
    listOps.push({ operation: 'tanh', args: [number] });
    updateResult(hyperbolicTangent);
    return hyperbolicTangent;
  };

  const asin = (number: number): number => {
    const arcSine = Math.asin(number);
    listOps.push({ operation: 'asin', args: [number] });
    updateResult(arcSine);
    return arcSine;
  };

  const acos = (number: number): number => {
    const arcCosine = Math.acos(number);
    listOps.push({ operation: 'acos', args: [number] });
    updateResult(arcCosine);
    return arcCosine;
  };

  const atan = (number: number): number => {
    const arcTangent = Math.atan(number);
    listOps.push({ operation: 'atan', args: [number] });
    updateResult(arcTangent);
    return arcTangent;
  };

  const abs = (number: number): number => {
    const absolute = Math.abs(number);
    listOps.push({ operation: 'abs', args: [number] });
    updateResult(absolute);
    return absolute;
  };

  const max = (...numbers: number[]): number => {
    const maximum = Math.max(...numbers);
    listOps.push({ operation: 'max', args: numbers });
    updateResult(maximum);
    return maximum;
  };

  const min = (...numbers: number[]): number => {
    const minimum = Math.min(...numbers);
    listOps.push({ operation: 'min', args: numbers });
    updateResult(minimum);
    return minimum;
  };

  const exp = (number: number): number => {
    const exponent = Math.exp(number);
    listOps.push({ operation: 'exp', args: [number] });
    updateResult(exponent);
    return exponent;
  };

  const round = (number: number): number => {
    const rounded = Math.round(number);
    listOps.push({ operation: 'round', args: [number] });
    updateResult(rounded);
    return rounded;
  };

  const floor = (number: number): number => {
    const floored = Math.floor(number);
    listOps.push({ operation: 'floor', args: [number] });
    updateResult(floored);
    return floored;
  };

  const ceil = (number: number): number => {
    const ceiled = Math.ceil(number);
    listOps.push({ operation: 'ceil', args: [number] });
    updateResult(ceiled);
    return ceiled;
  };

  const clear = () => {
    listOps.length = 0;
    result = 0;
  };

  const ops = {
    add, subtract, multiply, divide, pi, pow, sqrt, ln, log10, 
    sin, cos, tan, sinh, cosh, tanh, asin, acos, atan, abs,
    max, min, exp, round, floor, ceil, listOps, clear
  };

  return { ops, calculate: () => result };
};