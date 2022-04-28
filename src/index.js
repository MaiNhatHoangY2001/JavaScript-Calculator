import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { CalculatorProvider } from './components/context/CalculatorContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CalculatorProvider>
			<App />
		</CalculatorProvider>
	</React.StrictMode>
);
