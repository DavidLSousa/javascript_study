class ValidateCPF {
  #cpf = 0

  set cpf(input) {
    this.#cpf = String(input).replace(/\D+/g, '')
  }

  isRepeatedDigits(cpf) {
    return cpf.slice(0, 1).repeat(11) === cpf
  }

  calculateDigit(cpf) {
    let counterCPF = cpf.length + 1
    const sumOfCPF = cpf.split('').reduce((acc, unit) => {
      acc += unit * counterCPF 
      counterCPF--
      return acc
    }, 0)

    return (sumOfCPF % 11) < 2 ? 0 : 11 - sumOfCPF % 11

  }

  initValidation() {
    if (!this.#cpf) return false
    if (this.#cpf.length !== 11) return false
    if (this.isRepeatedDigits(this.#cpf)) return false
    
    const cpfWithoutDigits = this.#cpf.slice(0, -2)
    
    const fristDigit = this.calculateDigit(cpfWithoutDigits)
    const cpfWithOneDigit = cpfWithoutDigits + fristDigit
    
    const secondDigit = this.calculateDigit(cpfWithOneDigit)
    const validCPF = cpfWithOneDigit + secondDigit
    console.log(validCPF)

    const cpfIsValid = this.#cpf === validCPF

    return cpfIsValid
  }
}