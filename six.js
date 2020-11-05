class BankAccount {
  constructor(type, money, backupAccount = null) {
    this.type = type;
    this.money = money; 
    this.transactionHistory = []
    this.backupAccount = backupAccount
  }
  withdraw(amount) {
    const previousBalance = this.money
    this.money = this.money - amount
    this.transactionHistory.push({
      previousBalance: previousBalance,
      transactionType: 'withdrawal',
      transactionAmount: amount,
      endingBalance: this.money
    })
    if (this.money < 0) {
      //change to positive amount
      const overdrawnAmount = this.money * -1
      //withdraw from savings (backup) account
      this.backupAccount.withdraw(overdrawnAmount)
      //deposit from savings to checking (this account)
      this.deposit(overdrawnAmount)
      console.log('overdraft!!!')
    }
  }
    deposit(depo){
      const previousBalance = this.money
      this.money = this.money + depo
      this.transactionHistory.push({
        previousBalance: previousBalance,
        transactionType: 'deposit',
        transactionAmount: depo,
        endingBalance: this.money
      })   
    }
  showBalance() {
      return this.money
    }
}
const savingsAccount = new BankAccount('savings', 1000)
const checkingAccount = new BankAccount('checking', 0, savingsAccount)
console.log(checkingAccount)
console.log(savingsAccount)
checkingAccount.withdraw(100)
console.log(checkingAccount)
console.log(savingsAccount)