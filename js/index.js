class Calc {
    constructor(previousOperandTextEl, currentOperandTextEl) {
        this.previousOperandTextEl = previousOperandTextEl
        this.currentOperandTextEl = currentOperandTextEl
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    addNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOp(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayN(number) {
        const strNumber = number.toString()
        const integerDig = parseFloat(strNumber.split('.')[0])
        const decimalDig = strNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDig)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDig.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if (decimalDig != null) {
            return `${integerDisplay}.${decimalDig}`
        } else {
            return integerDisplay
        }
        const floatN = parseFloat(number)
        if (isNaN(floatN)) return ''
        return floatN.toLocaleString('en')
    }

    updateDisplay() {
        this.currentOperandTextEl.innerText = this.getDisplayN(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextEl.innerText = `${this.getDisplayN(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextEl.innerText = ''
        }
        
    }
}



const btnNumbers = document.querySelectorAll('[data-number]');
const btnOperations = document.querySelectorAll('[data-operation]');
const btnEqual = document.querySelector('[data-equal]');
const btnDelete = document.querySelector('[data-del]');
const btnAllClear = document.querySelector('[data-ac]');
const previousOperandTextEl = document.querySelector('[data-previous-op]');
const currentOperandTextEl = document.querySelector('[data-current-op]');

const calculator = new Calc(previousOperandTextEl, currentOperandTextEl);

btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateDisplay();
    })
})

btnOperations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay();
    })
})

btnEqual.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

btnAllClear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

btnDelete.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})