import Button from "./Button";

function ButtonsGrid({sendDataToCalculator, buttons}) {

  return (
    <div className="calc-grid">
      {
          buttons.map((e, i) => 
            <Button 
              props = { e }
              key = { i }
              sendDataToCalculator = { sendDataToCalculator }
            />
          )
      }
    </div>
  );
}

export default ButtonsGrid;
