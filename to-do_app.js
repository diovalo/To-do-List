// data controller 

//store tasks

var taskStore = [];

//constructor for task
var Task = function(id,description){
    this.id = id;
    this.description = description;
};
//Add tasks
function AddTask(des){
    var newTask , ID;

    //taskStore.length + 1 
    //[1,2,3,4,5] id=6
    //[1,2,5,6,7] id=8

    //create new id
    if(taskStore.length > 0){
        ID = taskStore[taskStore.length - 1].id + 1;
    }
    else{
        ID = 0;
    }
    
    //create new task

    newTask = new Task(ID, des);

   //push it into data structure

   taskStore.push(newTask);

   //return the new task


   
   return newTask;

}

//delete tasks
function deleteTask(id)
{
    var ids,index;

    //taskStore[2]
    //[1,2,5,6,8] id=5

    // create array for ids
    ids = taskStore.map(function(current){
        return current.id;
    });

    //find ids index 
    index = ids.indexOf(parseInt(id));

    //delete task 
    if(index !== 1){
        taskStore.splice(index,1);
    }
};

//ui controller 

//gather DOM strings same place
var DOMstrings = {
    addBtn: document.querySelector('#add_btn'),
    taskDescription: document.querySelector('#add_description'),
    taskContainer: document.querySelector('.task_list'),
};

//add task to ui 
function addListTask(task){
    //create html strings

    var html,newHtml,element;

    //create html string with placeholder text
    html = '<div class="item clearfix" id="%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_done"><button class="item_done--btn btn btn-outline-success mx-3" ><i class="far fa-check-circle fa-2x"></i></button></div><div class="item_delete"><button class="item_delete--btn btn btn-outline-danger"><i class="far fa-times-circle fa-2x"></i></button></div></div></div>';

    //replace the place holder text with some actual data 
    newHtml = html.replace('%id%',task.id);
    newHtml =  newHtml.replace('%description%',task.description);

    //insert the html into DOM
    element = DOMstrings.taskContainer;
    element.insertAdjacentHTML('beforeend', newHtml);

}

//delete the task from ui
function deleteListTask(selectorID){
    var el;

    el = document.getElementById(selectorID);
    
    //remove HTML from DOM
    el.remove();
};

//done button

function doneListTask(selectorID)
{
    var el;

    el = document.getElementById(selectorID);

    //add new class for description
    el.firstElementChild.classList.toggle("item_description_done");

    //add new class for done button
    el.children[1].children[0].children[0].classList.toggle("item_done--btn--done");
    
};

//app controller 

function ctrlAddTask(){
    var input,text,newTask;

    // get input data from DOM

    input = DOMstrings.taskDescription;
    text = input.value;

    // check for text

    if (text){

        //add the task to the data structure
        newTask = AddTask(text);

        //add the task to the ui
        addListTask(newTask);

        //clear the field
        input.value = '';
        input.focus();

    };
};
function ctrlDeleteTask(event){
    var taskID,doneBtn,clickedElement;
    doneBtn = "far fa-check-circle fa-2x"
    clickedElement = event.target.className;

    //Find Id
    
    taskID=event.target.parentNode.parentNode.parentNode.parentNode.id;

    //check is there any id

    if(clickedElement == doneBtn){
        //change ui
        doneListTask(taskID);

    }else if(taskID){

        //delete the task from the structure 
        deleteTask(taskID);

        //delete the task from ui
        deleteListTask(taskID);

    };
};
DOMstrings.addBtn.addEventListener('click', ctrlAddTask);

DOMstrings.taskDescription.addEventListener('keypress', function(event)
{
    if (event.keyCode === 13 || event.which === 13)
    {
        // console.log('you pressed enter');
        ctrlAddTask();
        
    }
});
DOMstrings.taskContainer.addEventListener('click', ctrlDeleteTask);