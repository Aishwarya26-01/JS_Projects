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
    document.getElementById("amount").value='';
    document.getElementById("details").value='';
    document.getElementById("category").value='';

    const table1 = document.getElementById('table1');
    const table2 = document.getElementById('table2');
    const table3 = document.getElementById('table3');

    const createNewOrderHtml = `<li id='${order.id}'>${order.amount} - ${order.details} - ${order.category}
        <button onclick=deleteOrder('${order.id}')>Delete Order</button>
        </li>`
        console.log(createNewOrderHtml)

        if(order.category == "Table1") {
            table1.innerHTML += createNewOrderHtml;
        }
        else if(order.category == "Table2") {
            table2.innerHTML += createNewOrderHtml;
        }
        else {
            table3.innerHTML += createNewOrderHtml;
        }
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

const removeOrderFromScreen = async (orderId) => {
    const elem = document.getElementById(orderId);
    elem.remove(elem);
}
window.addEventListener("DOMContentLoaded", display);