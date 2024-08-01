new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      transactions: [],
      newTransaction: {
        type: '',
        amount: '',
        category: ''
      }
    }
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      fetch('https://m3h-kidu2-functionapp620240729163054.azurewebsites.net/api/GetTransactions')
        .then(response => response.json())
        .then(data => {
          this.transactions = data;
        });
    },
    addTransaction() {
      fetch('https://m3h-kidu2-functionapp620240729163054.azurewebsites.net/api/PostTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newTransaction)
      })
      .then(() => {
        this.newTransaction.type = '';
        this.newTransaction.amount = '';
        this.newTransaction.category = '';
        this.fetchTransactions();
      });
    }
  }
});