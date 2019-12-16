document.addEventListener("DOMContentLoaded", function() {

	var addButton = document.getElementById('add');
	var inputTask = document.getElementById('new-task');
	var unfinishedTasks = document.getElementById('unfinished-tasks');
	var finishedTasks = document.getElementById('finished-tasks');

	function createNewElement(task, finished){
		var listItem = document.createElement('li');
		var checkbox = document.createElement('button');

		if(finished){
			checkbox.className = 'material-icons checkbox';
			checkbox.innerHTML = '<i class="fas fa-check material-icons"></i>';
		} else {
			checkbox.className = 'material-icons checkbox';
			checkbox.innerHTML = '<i class="far fa-square material-icons"></i>';
		};

		var label = document.createElement('label');
		label.innerText = task;
		var input = document.createElement('input');
		input.type = 'text';
		var editButton = document.createElement('button');
		editButton.className = 'material-icons edit';
		editButton.innerHTML = '<i class="fas fa-pen material-icons"></i>';
		var deleteButton = document.createElement('button');
		deleteButton.className = 'material-icons delete';
		deleteButton.innerHTML = '<i class="fas fa-trash material-icons"></i>';

		listItem.appendChild(checkbox);
		listItem.appendChild(label);
		listItem.appendChild(input);
		listItem.appendChild(editButton);
		listItem.appendChild(deleteButton);

		return listItem;

	};

	function addTask(){
		if(inputTask.value){
			var listItem = createNewElement(inputTask.value, false);
			unfinishedTasks.appendChild(listItem);
			bindTaskEvents(listItem, finishTask);
			inputTask.value='';
		};
		save();
	};

	addButton.onclick = addTask;

	function deleteTask(){
		var listItem = this.parentNode;
		var ul = listItem.parentNode;
		ul.removeChild(listItem);
		save();
	};

	function editTask(){
		var editButton = this;
		var listItem = this.parentNode;
		var label = listItem.querySelector('label');
		var input = listItem.querySelector('input[type=text]');

		var containsClass = listItem.classList.contains('editMode');

		if(containsClass){
			label.innerHTML = input.value;
			editButton.className = 'material-icons edit';
			editButton.innerHTML = '<i class="fas fa-pen material-icons"></i>';
			save();
		} else {
			input.value=label.innerHTML;
			editButton.className = 'material-icons save';
			editButton.innerHTML = '<i class="fas fa-save material-icons"></i>';
		}
		listItem.classList.toggle('editMode');
	};

	function finishTask(){
		var listItem = this.parentNode;
		var checkbox = listItem.querySelector('button.checkbox');
		checkbox.className = 'material-icons checkbox';
		checkbox.innerHTML = '<i class="fas fa-check material-icons"></i>';

		finishedTasks.appendChild(listItem);
		bindTaskEvents(listItem, unfinishTask);
		save();
	};

	function unfinishTask(){
		var listItem = this.parentNode;
		var checkbox = listItem.querySelector('button.checkbox');
		checkbox.className = 'material-icons checkbox';
		checkbox.innerHTML = '<i class="far fa-square material-icons"></i>';

		unfinishedTasks.appendChild(listItem);
		bindTaskEvents(listItem, finishTask);
		save();
	};

	function bindTaskEvents(listItem, checkboxEvent){
		var checkbox = listItem.querySelector('button.checkbox');
		var editButton = listItem.querySelector('button.edit');
		var deleteButton = listItem.querySelector('button.delete');

		checkbox.onclick = checkboxEvent;
		editButton.onclick = editTask;
		deleteButton.onclick = deleteTask;

	};

	// Start Local Storage
	function save(){

		var unfinishedTasksArr = [];
		for (var i = 0; i < unfinishedTasks.children.length; i++){
			unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
		};

		var finishedTasksArr = [];
		for (var i = 0; i < finishedTasks.children.length; i++){
			finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
		};

		localStorage.removeItem('todo');
		localStorage.setItem('todo', JSON.stringify({
			unfinishedTasks: unfinishedTasksArr,
			finishedTasks: finishedTasksArr
		}));

	};

	function load(){
		return JSON.parse(localStorage.getItem('todo'));
	};

	var data = load();
	for(var i = 0; i < data.unfinishedTasks.length; i++){
		var listItem = createNewElement(data.unfinishedTasks[i], false);
		unfinishedTasks.appendChild(listItem);
		bindTaskEvents(listItem, finishTask);
	};

	for (var i = 0; i < data.finishedTasks.length; i++){
		var listItem = createNewElement(data.finishedTasks[i], true);
		finishedTasks.appendChild(listItem);
		bindTaskEvents(listItem, unfinishTask);
	};
	// End Local Storage

	// Start time and data
	var hours = document.querySelector('.hours');
	var minutes = document.querySelector('.minutes');
	var seconds = document.querySelector('.seconds');
	
	var month = document.querySelector('.month');
	var day = document.querySelector('.day');
	var year = document.querySelector('.year');
	
	function setDate() {
		var now = new Date();
		var mm = now.getMonth();
		var dd = now.getDate();
		var yyyy = now.getFullYear();
		var secs = now.getSeconds();
		var mins = now.getMinutes();
		var hrs = now.getHours();
		var monthName = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
	
		if (hrs > 24) {
			hours.innerHTML = hrs - 24;
		} else {
			hours.innerHTML = hrs;
		}
	
		if (secs < 10) {
			seconds.innerHTML = '0' + secs;
		} else {
			seconds.innerHTML = secs;
		}
	
		if (mins < 10) {
			minutes.innerHTML = '0' + mins;
		} else {
			minutes.innerHTML = mins;
		}

		if (hrs < 10) {
			hours.innerHTML = '0' + hrs;
		} else {
			hours.innerHTML = hrs;
		}
	
		month.innerHTML = monthName[mm];
		day.innerHTML = dd;
		year.innerHTML = yyyy;
	}
	setInterval(setDate, 1000);
	// End time and date

	// Start
	function tasks(){
		var fin = document.getElementById('fin').firstElementChild.innerHTML = document.getElementById('finished-tasks').children.length;
		var unfin = document.getElementById('unfin').firstElementChild.innerHTML = document.getElementById('unfinished-tasks').children.length;
		var all = document.getElementById('all').firstElementChild.innerHTML = fin + unfin;
	}
	setInterval(tasks, 1000);
	// End
	
});
