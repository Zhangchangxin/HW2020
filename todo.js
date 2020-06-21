let tasks = [];
function renderEditor() {
    let inputEl = document.querySelector("#todolist-panel .editor>input");

    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }

        let newTask = {
            title: inputEl.value,
            done: false,
            important:false,
        };

        inputEl.value = "";
        tasks.push(newTask);
        renderTaskItems();

    }

    inputEl.onkeypress = (e) => {

        if (e.key === "Enter") {
            addTask();
        }
    };
    let addEl = document.querySelector("#todolist-panel .editor>button");
    addEl.onclick = (e) => {
        addTask();
    };

}

function renderTaskItems() {

    let itemsEl = document.querySelector("#todolist-panel .items");

    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done");
        }
        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let unimportanceEl = document.createElement("button");
        unimportanceEl.innerText = "unimportant";
        let importanceEl = document.createElement("button");
        importanceEl.innerText = "important";

        if (task.important) {
            itemEl.classList.add("important");
        } else {
            itemEl.classList.remove("important");
        }

        importanceEl.onclick = (e) => {

            task.important = true;
            itemEl.classList.add("important");
        
    }
        itemEl.append(importanceEl);

        unimportanceEl.onclick = (e) => {
            task.important = false;
            itemEl.classList.remove("important");
        
    }
        itemEl.append(unimportanceEl);

       
        
        
        


        let ctrlbarEl = renderTaskCtelBar(tasks, i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }

}

function renderTaskCtelBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }

    upEl.innerText = "⬆";
    upEl.onclick = (e) => {
        let temp = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1];
        tasks[taskIdx - 1] = temp;
        renderTaskItems();

    };
    ctrlbarEl.append(upEl);

    let downEl = document.createElement("button");
    if (taskIdx === tasks.length - 1) {
        downEl.disabled = true;
    }
    downEl.innerText = "⬇";
    downEl.onclick = (e) => {
        let temp = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1];
        tasks[taskIdx + 1] = temp;
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);

    let cancelEl = document.createElement("button");
    cancelEl.innerText = "X";
    cancelEl.onclick = (e) => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();

    };
    ctrlbarEl.append(cancelEl);




    return ctrlbarEl;

}

renderEditor();
renderTaskItems();