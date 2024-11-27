const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //adiciona digito para calculadora

    addDigit(digit){
      console.log(digit);

      //check if current operation already has a dot
      if(digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
      }
      this.currentOperation = digit;
      this.updateScreen();
    }

    //Process all calculator operations
processOperation(operation){
    //Check if current value is empty
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        //Charge operation
        if(this.previousOperationText.innerText !== ""){
            this.chargeOperation(operation);
        }
        return;
    }


    //Get current and previous value

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation){
        case "+":
          operationValue = previous + current;
          this.updateScreen(operationValue, operation, current, previous );
          break;
        case "-":
          operationValue = previous - current
          this.updateScreen(operationValue, operation, current, previous );
          break;
        case "/":
          operationValue = previous / current
          this.updateScreen(operationValue, operation, current, previous );
          break;
        case "*":
          operationValue = previous * current
          this.updateScreen(operationValue, operation, current, previous );
          break;
        case "DEL":
           this.processDelOperator();
           break;
        case "CE":
           this.processClearCurrentOperator();
           break;
        case "C":
           this.processClearOperator();
           break;
        case "=":
           this.processEqualOperator();
           break;
        default:
          return;
    }
}


    // change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Check if value is zero, if it is just add current value
            if(previous === 0){
                operationValue = current
            }

            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
    // Charge math operation
    chargeOperation(operation){

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delet the last digit
    processDelOperator(){
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1);
    }

    //Clear current operation
    processClearCurrentOperator(){
        this.currentOperationText.innerText = "";
    }

    //Clear all operation
    processClearOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Process an operation
    processEqualOperator(){
        
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);

    }
}  

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            console.log(value);
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});