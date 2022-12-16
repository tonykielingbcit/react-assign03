function Button({props, sendDataToCalculator}) {

  return (
    <div
        className = {`button ${props.className}`}
        title = {props.value}
        onClick = { () => sendDataToCalculator(props)}
    >
        { props.text } 
    </div>
  );
}

export default Button;
