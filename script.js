const description = document.getElementById("inp-text");
const amount = document.getElementById("inp-amt");
const Category = document.getElementById("type");
const add = document.getElementById("add-btn");
const totalbalance = document.getElementById("t-bln");
const income = document.getElementById("i-bln");
const expense = document.getElementById("e-bln");
const all = document.getElementById("all-filter");
const income_filter = document.getElementById("i-filter");
const expense_filter = document.getElementById("e-filter");
const table = document.getElementById("t-body")

function check(){
    if(description.value ==="" || amount.value ==="" || Category.value ==="")
    {
        alert("Oops! It looks like some input fields are empty. 😔")
    }
    else{
      getData();
    }
};

add.addEventListener("click",()=>{
    check();
    resetinput();
})

let data = [{}];
const getData = () => {
  data.push({
    text: description.value,
    amt: parseFloat(amount.value),
    type: Category.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};


const createTask = (filtertype = null) => {
    table.innerHTML ="";
    let balance = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;
    const filterdata =  filtertype ? data.filter(ele=> ele.type === filtertype) : data;
    filterdata.forEach((ele, y) => {
      table.innerHTML += `
        <tr>
                <div id=${y}>
                <td>${ele.text}</td>
                <td>${ele.amt}</td>
                <td>${ele.type}</td>
                <td class="actions">
                <i onclick="editTask(this)"  class="fa-solid fa-pen-to-square fa-beat-fade fa-lg" style="color: #007FFF ;"></i>
                <i onclick="deleteTask(this); createTask()" class="fa-solid fa-trash fa-beat fa-lg" style="color: #CC0000;"></i>
            </td>
        </tr>
              `;

              if (ele.type==="Income")
              {
                incomeTotal += +ele.amt;
              }
              else{
                expenseTotal += +ele.amt;
              }
            });

            balance = incomeTotal - expenseTotal;
           updatesummary(balance, incomeTotal, expenseTotal);
}

function updatesummary(balance, incomeTotal, expenseTotal)
{
     totalbalance.innerText = `₹${balance.toFixed(2)}`;
     income.innerText = `₹${incomeTotal.toFixed(2)}`;
     expense.innerText = `₹${expenseTotal.toFixed(2)}`;
     
}   

const resetinput =() =>{
    description.value = "";
    amount.value ="";
    Category.value = "";
};
(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
}) ();


all.addEventListener("click", () => createTask());
income_filter.addEventListener("click", () => createTask("Income"));
expense_filter.addEventListener("click", () => createTask("Expense"));


const editTask = (e)=>{
 let res = e.parentElement.parentElement;
 description.value =res.children[0].innerHTML;
 amount.value=res.children[1].innerHTML;
 Category.value=res.children[2].innerHTML;
 deleteTask(e);
}

const deleteTask= (e)=>{
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem("data",JSON.stringify(data));  
}