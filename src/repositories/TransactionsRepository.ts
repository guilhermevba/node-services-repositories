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

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;
    this.transactions.forEach(({ type, value }) => {
      if (type === 'income') {
        income += value;
        total += value;
      } else if (type === 'outcome') {
        outcome += value;
        total -= value;
      }
    });
    return {
      income,
      outcome,
      total,
    };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { type, value, title } = data;
    const transaction = new Transaction({ type, value, title });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
