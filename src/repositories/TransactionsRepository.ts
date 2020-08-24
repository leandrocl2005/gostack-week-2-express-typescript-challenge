import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TB {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const totalIncome = this.transactions
      .filter(item => item.type === 'income')
      .map(item => item.value)
      .reduce((a, b) => a + b, 0);

    const totalOutcome = this.transactions
      .filter(item => item.type === 'outcome')
      .map(item => item.value)
      .reduce((a, b) => a + b, 0);

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public allTB(): TB {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
