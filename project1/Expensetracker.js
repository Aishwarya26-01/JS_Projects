function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseAmount = event.target.amount.value;
    const descriptionChoose = event.target.description.value;
    const categoryChoose = event.target.category.value;
    localStorage.setItem('expenseAmount', expenseAmount);
    localStorage.setItem('descriptionChoose', descriptionChoose);
    localStorage.setItem('categoryChoose', categoryChoose);

    const obj = {
        expenseAmount,
        descriptionChoose,
        categoryChoose
    }
    localStorage.setItem(obj.descriptionChoose, JSON.stringify(obj))
    showNewExpenseOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStoragekeys = Object.keys(localStorageObj)
    for(var i=0; i<localStoragekeys.length; i++)
    {
        const key = localStoragekeys[i]
        const expenseDetailString = localStorageObj[key];
        const expenseDetailsObj = JSON.parse(expenseDetailString);
        showNewExpenseOnScreen(expenseDetailsObj)
    }
})

function showNewExpenseOnScreen(expense){
    document.getElementById('amt').value = '';
    document.getElementById('des').value = '';
    document.getElementById('category').value = '';
    const parentNode = document.getElementById('listofUsers');
    const childHTML = `<li id=${expense.categoryChoose}> ${expense.expenseAmount} - ${expense.categoryChoose} - ${expense.descriptionChoose}
                            <button onclick=deleteExpense('${expense.categoryChoose}')> Delete Expense </button>
                            <button onclick=editExpense('${expense.expenseAmount}','${expense.descriptionChoose}','${expense.categoryChoose}')> Edit Expense </button>
                        </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpense(amount,description,category){
    document.getElementById('amt').value = amount;
    document.getElementById('des').value = description;
    document.getElementById('category').value = category;
    deleteExpense(category)
}

function deleteExpense(category){
    console.log(category)
    localStorage.removeItem(category);
    removeExpenseFromScreen(category);
}

function removeExpenseFromScreen(category){
    const parentNode = document.getElementById('listofUsers');
    const childNodeToBeDeleted = document.getElementById(category);
    parentNode.removeChild(childNodeToBeDeleted)
}