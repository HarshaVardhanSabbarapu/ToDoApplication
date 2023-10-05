// localStorage.setItem("task","[]");
function addData()
{
    // const text = document.getElementById("task");
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    //if is empty string 
    if(taskText === "")
    {
        return;
    }
    //if there is no arr created in localStorage [initial times no array in every browser]
    let arr = getTask();
    if(arr === null)
    {
        localStorage.setItem("task","[]");
        arr = [];
    }

    arr.push({"text":taskText,"completed":false});
    taskInput.value="";
    updateTasks(arr);
    renderingTasks();
}

function getTask()
{
    let arr = JSON.parse(localStorage.getItem("task"));
    return arr;
}

function updateTasks(arr)
{
    localStorage.setItem("task",JSON.stringify(arr));
}

function toggelTaskCompletion(index)
{
    let arr = getTask();
    arr[index].completed = !arr[index].completed;
    updateTasks(arr);
    renderingTasks();
}

function deleteTask(index)
{
    let arr = getTask();
    arr.splice(index,1)
    updateTasks(arr);
    renderingTasks();
}

function renderingTasks()
{
    //removing all tasks
    let parent = document.getElementById("row");
    parent.innerHTML = "";

    //displaying tasks from localStorage
    let arr = getTask();
    arr.forEach((value , index)=>{

        console.log(value + " " + index);
        let div = document.createElement("div");
        div.classList.add("column")
        div.classList.add("col-12")
        div.classList.add("my-2")

        let taskName = document.createElement("span");
        taskName.classList.add("content")
        taskName.classList.add("me-3");
        taskName.innerText = value.text;
        taskName.style.fontSize = "20px";

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("checked")
        checkBox.classList.add("me-3");
        checkBox.checked = value.completed;
        //event
        checkBox.addEventListener('change',()=>{
            toggelTaskCompletion(index);
        })

        //CHECK BOX text line-through
        if(value.completed)
        {
            taskName.style.textDecoration = "line-through";
        }


        let deletebutton = document.createElement("button")
        deletebutton.classList.add("deletebutton");
        deletebutton.classList.add("btn");
        deletebutton.classList.add("btn-danger");
        deletebutton.classList.add("me-3");
        deletebutton.textContent = "delete";
        //delete event need to write
        deletebutton.addEventListener('click',()=>{
            deleteTask(index);
        })

        //elements adding to page
        // let parent = document.getElementById("row");
        parent.appendChild(div);
        div.appendChild(taskName);
        div.appendChild(checkBox)
        div.appendChild(deletebutton)  
    })
}
//initial rendering data from localStorage
renderingTasks()

//adding task by click event on add button
const button = document.getElementById('clickButton');
button.addEventListener('click', addData);

const inputTag = document.getElementById('task');
inputTag.addEventListener('keydown',(e)=>{
    if(e.key === "Enter")
    {
        addData();
    }
});