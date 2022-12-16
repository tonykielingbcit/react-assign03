import { useState } from "react";
import buttons from "../utils/calculator-bonus-03-button-data.js";
import Display from "./Display";
import ButtonsGrid from "./ButtonsGrid";

function Calculator() {
  const [content, setContent] = useState(0);
  const [startTyping, setStartTyping] = useState(true);
  const [tempData, setTempData] = useState("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [valueInMemory, setValueInMemory] = useState("");
  const [percent, setPercent] = useState("");

  // it performs the calculation
  // eslint-disable-next-line
  const evaluate = input => new Function("return " + input)();


  const receivingData = ({type, value, text}) => {
    
    switch (type){
      case "number":
          setContent(
              !content || startTyping
                  ? value 
                  : content + "" + value );
          setStartTyping(false);

          break;


      case "operator":
          setPercent("");
          
          if (startTyping) {
            setCurrentOperator(value);
          } else if (tempData) {
            const toEval = `${tempData} ${currentOperator} ${content}`
            const result = evaluate(toEval);
            setContent(result);
            setCurrentOperator(value);
            setTempData(result);
          } else {
            setCurrentOperator(value);
            setTempData(content);
          }

          setStartTyping(true);

          break;
          

      case "clear":
          setContent(0);
          setPercent("");
          
          if (text === "AC") {
              setTempData("");
              setCurrentOperator("");
              setValueInMemory("");
          } else {
              if (!currentOperator)
                  setTempData("");
          }

          break;
      

      case "enter":
          if (percent) {
              const toEval = `${tempData} ${currentOperator} ${content}`
              const result = evaluate(toEval);
              setContent(result);              
          } else if (tempData !== "" && content !== "" && currentOperator !== "") {
              const toEval = `${tempData} ${currentOperator} ${content}`
              const result = evaluate(toEval);
              setContent(result);
              setTempData(result);
              setStartTyping(true);
              if (!percent)
                setCurrentOperator("");
          }

          break;


      case "memory":
          if (text === "MS") {
            setValueInMemory(content);
            setContent("");
            setTempData("");
            setCurrentOperator("");
          }
          else if (text === "MC")
              setValueInMemory("");
          else if (text === "MR") {
              setContent(valueInMemory);
              if (!currentOperator)
                  setTempData(valueInMemory);
          } else if (text === "M+") {
              const toEval = `${content} + ${valueInMemory}`
              const result = evaluate(toEval);
              setContent(result);
          } else if (text === "M-") {
              const toEval = `${content} - ${valueInMemory}`
              const result = evaluate(toEval);
              setContent(result);
        }

          break;


      case "sqrt":
        const temp = Math.sqrt(content);
        setContent(temp);
        setTempData("");
        setCurrentOperator("");
        setCurrentOperator("");
        break;


      case "sign":
          setContent(content * -1);
          break;


      case "percent":
          const k = tempData * 0.01;
          setPercent(k);
          setContent(k);

          break;


      default: 
          break
  }
};


  return (
    <div className="frame">
        <h3 className = "calc-title">React Calculator</h3>
        <div className = "display-aux">
          <span className = "memory-data">{ valueInMemory ? `(M) ${ valueInMemory }` : "" }</span>
          <span className = "temp-data">{ tempData } { currentOperator } { percent } </span>
        </div>
        <Display 
            toDisplay = { content }
        />
        <ButtonsGrid 
            buttons = { buttons }
            sendDataToCalculator = { receivingData }
        />
    </div>
  );
}

export default Calculator;

