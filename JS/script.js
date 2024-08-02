let expenses = [];

    function addExpense() {
      let expenseName = document.getElementById('expenseName').value;
      let amount = document.getElementById('amount').value;
      let category = document.getElementById('category').value;
      let date = document.getElementById('date').value;

      if (expenseName && amount && category && date) {
        let expense = {
          name: expenseName,
          amount: amount,
          category: category,
          date: date
        };
        expenses.push(expense);
        updateExpenseTable();
        clearInputFields();
        calculateTotal();
      } else {
        alert("Please fill in all fields.");
      }
    }

    function updateExpenseTable() {
      let tableBody = document.getElementById('expenseTable');
      tableBody.innerHTML = '';
      expenses.forEach((expense, index) => {
        let row = tableBody.insertRow();
        let nameCell = row.insertCell();
        let amountCell = row.insertCell();
        let categoryCell = row.insertCell();
        let dateCell = row.insertCell();
        let actionCell = row.insertCell();

        nameCell.innerHTML = expense.name;
        amountCell.innerHTML = '$' + expense.amount;
        categoryCell.innerHTML = expense.category;
        dateCell.innerHTML = expense.date;
        actionCell.innerHTML = '<button class="action-btn" onclick="editExpense(' + index + ')">Edit</button> <button class="action-btn" onclick="deleteExpense(' + index + ')">Delete</button>';
      });
    }

    function clearInputFields() {
      document.getElementById('expenseName').value = '';
      document.getElementById('amount').value = '';
      document.getElementById('category').value = 'Food';
      document.getElementById('date').value = '';
    }

    function editExpense(index) {
      let expense = expenses[index];
      document.getElementById('expenseName').value = expense.name;
      document.getElementById('amount').value = expense.amount;
      document.getElementById('category').value = expense.category;
      document.getElementById('date').value = expense.date;

      expenses.splice(index, 1);
      updateExpenseTable();
    }

    function deleteExpense(index) {
      if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1);
        updateExpenseTable();
        calculateTotal();
      }
    }

    function calculateTotal() {
      let total = 0;
      expenses.forEach(expense => {
        total += parseFloat(expense.amount);
      });
      document.getElementById('total').innerHTML = total.toFixed(2);
    }

    function filterExpenses() {
      let category = document.getElementById('filterCategory').value;
      let filteredExpenses = expenses.filter(expense => {
        return category === '' || expense.category === category;
      });
      updateExpenseTable(filteredExpenses);
      calculateTotal();
    }

    // Initial setup
    updateExpenseTable();
    calculateTotal();