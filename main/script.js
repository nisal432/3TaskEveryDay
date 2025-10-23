console.log("okay this is working");
localStorage.clear()
const date = new Date()
console.log(date.toISOString());
const todayDate = date.toISOString().slice(0,10)
console.log(todayDate);
const changingMessage = document.querySelector('.warningMessage')
let selectedTask = parseInt(localStorage.getItem('selectedTask')) || 0;
let completedTask = parseInt(localStorage.getItem('completedTask')) || 0;
let progressValue = parseInt(localStorage.getItem('progressValue')) || 0;
const totalTask = 3;
const reminderText = document.querySelector('.reminderText')
const progressMessage = document.querySelector('.progressMessage')
const progressBar = document.querySelector('.progressValue')
const allTasks = document.querySelectorAll('.inputContainer')
allTasks.forEach((task, i) => {


	
	const input = task.children[1]
	input.addEventListener('focus', () => {
		changingMessage.style.opacity = '0'
	})
	const editElement = document.createElement('div')
	editElement.classList.add('add')
	editElement.append('Edit')
	editElement.addEventListener('click', () => {
		task.replaceChild(input, replaceDiv)
		input.focus()




		const tick = document.createElement('img')
		tick.classList.add('icon')
		tick.src = '/imagesAndLogo/tick.png'

		task.replaceChild(tick, editElement)
		tick.addEventListener('click', () => {


			replaceDiv.innerText = input.value;
			task.replaceChild(replaceDiv, input)
			task.replaceChild(editElement, task.children[2])

		})


	})
	const replaceDiv = document.createElement('div')
	replaceDiv.classList.add('finalTask')
	const span = document.createElement('span')
	replaceDiv.appendChild(span)

	const warn = document.createElement('div')
	warn.classList.add('finalTask')
	warn.style.color = 'red';
	warn.innerText = 'Please enter something';
	warn.addEventListener('click', () => {
		task.replaceChild(input, warn)
		input.focus()
	})
	
	if(!(localStorage.getItem(`tasks${i}`))){
	localStorage.setItem(`tasks${i}`, JSON.stringify({
		taskAdded: true,
		taskCompleted: false,
		inputValue: '',

	}))}
	
	const mainObject = JSON.parse(localStorage.getItem(`tasks${i}`))
	
	function replaceInput(inputValue) {
		if (inputValue) input.value = inputValue;
		changingMessage.style.opacity = '0'
		span.innerText = input.value;
		task.replaceChild(replaceDiv, input)
		
		task.replaceChild(editElement, task.children[2])
	}
	
	if(!mainObject.taskAdded){
		replaceInput(mainObject.inputValue)
	}


	input.addEventListener('keydown', (e) => {

		if (e.key === 'Enter' && input.value) {
			if (mainObject.taskAdded) {
				selectedTask++;
				localStorage.setItem('selectedTask', selectedTask)
				mainObject.taskAdded = false;
				localStorage.setItem(`tasks${i}`, JSON.stringify(mainObject))
			}
			if (selectedTask == 3) {
				progressMessage.innerText = '0/3 completed'
			}
			replaceInput()
			mainObject.inputValue = input.value
			localStorage.setItem(`tasks${i}`, JSON.stringify(mainObject))

		}
	})
	

	task.children[2].addEventListener('click', (e) => {
		if (input.value) {
			if (mainObject.taskAdded) {
				selectedTask++;
				mainObject.taskAdded = false;
				localStorage.setItem(`tasks${i}`, JSON.stringify(mainObject))
			}
			if (selectedTask == 3) {
				progressMessage.innerText = '0/3 completed'
			}
			replaceInput()

		}
		else {

			task.replaceChild(warn, input)
			warn.addEventListener('click', () => {
				task.replaceChild(input, warn)
				input.focus()
			})
		}
	})



	const completed = task.children[0];
	function markAsComplete() {
		if (selectedTask !== 3 && task.children[1] === replaceDiv) {
			changingMessage.style.opacity = '1';
		}

		else if (task.children[1] === replaceDiv) {
			completedTask++;
			localStorage.setItem('completedTask', completedTask)
			if (completedTask === 1) {
				reminderText.textContent = 'Nice Better than Nothing'
			}
			else if (completedTask === 2) {
				reminderText.textContent = 'Amazing just one more left'
			}
			else {
				reminderText.textContent = 'Awesome all tasks completed. Done for the day'
			}

			progressMessage.innerText = `${completedTask}/${totalTask} completed`
			progressMessage.style.color = 'white'


			replaceDiv.classList.add('completedTask')
			const contentSize = span.offsetWidth;
			replaceDiv.style.setProperty('--before-width', `${contentSize}px`)

			replaceDiv.classList.add('markedTask')


			const completedLogo = document.createElement('img')
			completedLogo.src = '/imagesAndLogo/completed.svg'
			completedLogo.classList.add('completedLogo')

			task.replaceChild(completedLogo, completed)
			const doneLogo = document.createElement('img')
			doneLogo.src = '/imagesAndLogo/success.png'
			doneLogo.classList.add('done')
			task.replaceChild(doneLogo, task.children[2])


			progressValue += 33.33;
			localStorage.setItem('progressValue', progressValue)
			progressBar.style.width = `${progressValue}%`


		}
	}



	completed.addEventListener('click', () => {
		markAsComplete()
	})

})

