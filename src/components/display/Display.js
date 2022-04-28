import { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import './Display.scss';

function Display() {
	const context = useContext(CalculatorContext);

	return (
		<div className="display d-flex flex-column">
			<h5 className="output col-12 flex-column">{context.output}</h5>
			<h1 className="result col-12">{context.result}</h1>
		</div>
	);
}

export default Display;
