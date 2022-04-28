import { useContext } from 'react';
import numpad from '../json/Numpad.json';
import { CalculatorContext } from '../context/CalculatorContext';
import './Numpad.scss';

function Numpad() {
	const context = useContext(CalculatorContext);
	const output = context.output;
	const result = context.result;
	const setResult = context.setResult;
	const setOutput = context.setOutput;

	const handleClickNumpad = async (value) => {
		if (result[0] === '=') setResult('0');

		switch (value) {
			case '%':
				calculateNumbers(true);
				break;
			case '<':
				if (result[0] !== '=') deleteOneNumber();
				break;
			case '=':
				calculateNumbers(false);
				break;
			case 'AC':
				resetDisplay();
				break;
			default:
				if (result.length < 20) {
					setStateResult(value);
					setStateOutput(value);
				}
				break;
		}
	};

	const deleteOneNumber = () => {
		if (result.length === 1) {
			setResult('0');
			deleteLastString(setOutput);
		} else {
			deleteLastString(setResult);
			deleteLastString(setOutput);
		}
	};

	const deleteLastString = (set) => {
		set((preVal) => preVal.slice(0, -1));
	};

	const resetDisplay = () => {
		setOutput('');
		setResult('0');
	};

	const deleteNullArray = (array) => {
		return array.filter(Boolean);
	};

	const isFirstStringMinus = (string) => {
		return string[0] === '-';
	};

	const calculateNumbers = (percent) => {
		if (output !== '' && output[output.length - 1].match(/\d/gm)) {
			const numbersRaw = output.split(/[=+x/-]/gm);
			const operationsRaw = output.split(/[\d=.]/gm);

			const numbers = deleteNullArray(numbersRaw);
			const operations = deleteNullArray(operationsRaw);

			if (isFirstStringMinus(output)) {
				numbers[0] = '-' + numbers[0];
				operations.shift();
			}

			while (numbers.length !== 1) {
				let index = findIndexOfOperation(operations);
				const numberA = parseFloat(numbers[index]);
				const numberB = parseFloat(numbers[index + 1]);
				const equal = calculateTwoNumber(operations[index], numberA, numberB);

				numbers[index] = equal + '';
				numbers.splice(index + 1, 1);
				operations.splice(index, 1);
			}
			if (percent) setResult('=' + parseFloat(numbers[0]) / 100);
			else setResult('=' + parseFloat(numbers[0]));
		} else setResult('=0');
	};

	const findIndexOfOperation = (operations) => {
		let index = operations.findIndex((operation) => operation[0] === 'x'); // find index x in operation

		if (index === -1) index = operations.findIndex((item) => item[0] === '/'); // find index / in operation
		if (index === -1) index = 0; //if not have x and / then reset index = 0
		return index;
	};

	const calculateTwoNumber = (operation, numberA, numberB) => {
		switch (operation) {
			case '+--':
				return numberA + numberB;
			case 'x--':
				return numberA * numberB;
			case '/--':
				return numberA / numberB;

			case '+-':
				return numberA - numberB;
			case '--':
				return numberA + numberB;
			case 'x-':
				return numberA * -numberB;
			case '/-':
				return numberA / -numberB;

			case '+':
				return numberA + numberB;
			case '-':
				return numberA - numberB;
			case 'x':
				return numberA * numberB;
			case '/':
				return numberA / numberB;
			default:
				console.error("NOT A OPERATION");
		}
	};

	const changeOperation = (preVal, value) => {
		const regex = /[\d]/gm;

		let newVal = '';

		const preLastItem = preVal[preVal.length - 2];
		const lastItem = preVal[preVal.length - 1];

		if (lastItem === '-' && preLastItem === '-') newVal = preVal.slice(0, -3); //if 'x--' then slice 3
		else if (lastItem === '-' && !preLastItem.match(regex)) newVal = preVal.slice(0, -2); // if 'x-' then slice 2
		else newVal = preVal.slice(0, -1); // if '-' then slice 1

		return newVal + value;
	};

	const isDoubleSubtract = (preVal, value) => {
		const len = preVal.length;
		return preVal[len - 1] === '-' && preVal[len - 2] === '-' && value === '-';
	};

	const isDot = (preVal, value) => {
		const len = preVal.length;
		return preVal[len - 1] === '.' && value === '-';
	};

	const setStateOutput = (value) => {
		const regex = /[\d-]/g;
		setOutput((preVal) => {
			const len = preVal.length;
			const preItem = preVal[len - 1];
			if (preItem === undefined) return changeOperation(preVal, value);

			if (value.match(regex)) {
				if (isDoubleSubtract(preVal, value) || isDot(preVal, value)) return preVal;
				return preVal + value;
			} else
				return preItem.match(/[%.+x/-]/gm)
					? changeOperation(preVal, value) //if preItem is a operation then not change output
					: preVal + value; // if preItem and value is a operation then change last item output
		});
	};

	const setStateResult = (value) => {
		const regex = /[\d]/g;

		if (value.match(regex)) {
			setResult((preVal) => {
				const numPreVal = parseInt(preVal);
				//set first number
				if (numPreVal === 0) return value;
				else return preVal.match(regex) ? preVal + value : value;
			});
		} else setResult(value);
	};

	return (
		<div className="numpad d-flex flex-wrap-reverse justify-content-center text-center">
			{numpad.map((pad, index) => {
				return (
					<div id={`${pad.id}`} className="pad p-3 col-md-3" key={index} onClick={() => handleClickNumpad(pad.value)}>
						{pad.value}
					</div>
				);
			})}
		</div>
	);
}

export default Numpad;
