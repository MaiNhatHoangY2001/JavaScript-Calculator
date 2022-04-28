import { createContext,useState } from "react";


const CalculatorContext = createContext();

function CalculatorProvider({children}) {

    const [output, setOutput] = useState("");
    const [result, setResult] = useState("0");

    
    const value = {
        output,
        setOutput,
        result,
        setResult,
    }

    return <CalculatorContext.Provider value={value}> 
        {children}
    </CalculatorContext.Provider>

}


export {CalculatorContext, CalculatorProvider}