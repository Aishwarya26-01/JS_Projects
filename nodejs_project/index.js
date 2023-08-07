const registerOrder = async(event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const details = event.target.details.value;
    const category = event.target.category.value;
    const obj = {
        amount,
        details,
        category
    };
    try {
        let response = await axios.post("http://localhost:3000/order/add-order", obj)
        showNewOrderOnScreen(response.data.newOrderDetail)
        console.log(response)
    }
    catch(err) {
        document.body.innerHTML += "<h4> Something went wrong </h4>"
        console.log(err)
    }
}                    
const display = async(event) => {
    try {
        let response = await axios.get("http://localhost:3000/order/get-order")
        // console.log(response);
        for(var i=0; i<response.data.allOrders.length; i++) {
            await showNewOrderOnScreen(response.data.allOrders[i])
        }
    }
    catch(err) {
        console.log(err);
    }
}

const showNewOrderOnScreen = (order) => {
    // const selectedCategory = document.getElementById("category");
    document.getElementById("amount").value='';
    document.getElementById("details").value='';
    document.getElementById("category").value='';

    // const table1 = document.getElementById('table1');
    // const table2 = document.getElementById('table2');
    // const table3 = document.getElementById('table3');

    const parentNode = document.getElementById('listOfitems');
    const createNewOrderHtml = `<li id='${order.id}'>${order.amount} - ${order.details} - ${order.category}
        <button onclick=deleteOrder('${order.id}')>Delete Order</button>
        </li>`
        console.log(createNewOrderHtml)
        // if(selectedCategory.value === "Table1") {
        //     parentNode.innerHTML += createNewOrderHtml;
        //     table1.appendChild(createNewOrderHtml);
        // }
        parentNode.innerHTML += createNewOrderHtml;
        console.log(parentNode.innerHTML)
}

const deleteOrder = async (orderId) => {
    
    try {
        let response = await axios.delete(`http://localhost:3000/order/delete-order/${orderId}`)
        await removeOrderFromScreen(orderId);
    }
    catch(err) {
        console.log(err);
    }
}

// const editOrder = async (category, amount, details, orderId) => {
//     document.getElementById("category").value=category;
//     document.getElementById("amount").value=amount;
//     document.getElementById("details").value=details;

//     await deleteOrder(orderId);
// }

const removeOrderFromScreen = async (orderId) => {
    const parentNode = document.getElementById('listOfitems');
    const elem = document.getElementById(orderId)
    parentNode.removeChild(elem);
}
window.addEventListener("DOMContentLoaded", display);