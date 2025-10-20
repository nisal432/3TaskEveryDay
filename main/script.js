console.log("okay this is working");
const changingMessage= document.querySelector('.warningMessage')
let selectedTask = 0;
const allTasks = document.querySelectorAll('.inputContainer')
allTasks.forEach((task)=>{
	let check = true;
	const input = task.children[1]
	input.addEventListener('focus', ()=>{
		changingMessage.innerText = ''
	})
	const editElement = document.createElement('div')
			editElement.classList.add('add')
			editElement.append('Edit')
	editElement.addEventListener('click',()=>{
				task.replaceChild(input, replaceDiv)
				input.focus()
				

				

				const tick = document.createElement('img')
				tick.classList.add('icon')
				tick.src = '/imagesAndLogo/tick.png'

				task.replaceChild(tick, editElement) 
				tick.addEventListener('click', ()=>{
					
					
					replaceDiv.innerText = input.value;
					task.replaceChild(replaceDiv,input)
					task.replaceChild(editElement, task.children[2])
					
				})


			})
	const replaceDiv = document.createElement('div')
			replaceDiv.classList.add('finalTask')
	const warn = document.createElement('div')
			warn.classList.add('finalTask')
			warn.style.color = 'red';
			warn.innerText = 'Please enter something';
	warn.addEventListener('click',()=>{
				task.replaceChild(input, warn)
				input.focus()
			})
			
	if(input){
	input.addEventListener('keydown',(e)=>{
		
		if(e.key ==='Enter' && input.value){
			if(check){
				selectedTask++;
				check = false;
			}
			replaceDiv.innerText = input.value;
			task.replaceChild(replaceDiv,input)
			
			task.replaceChild(editElement, task.children[2])
			
		}
	})}
	task.children[2].addEventListener('click', (e)=>{
		if(input.value){
			if(check){
				selectedTask++;
				check = false;
			}
			replaceDiv.innerText = input.value;
			task.replaceChild(replaceDiv,input)
			
			task.replaceChild(editElement, task.children[2])


		}
		else{
			
			task.replaceChild(warn,input)
			warn.addEventListener('click',()=>{
				task.replaceChild(input, warn)
				input.focus()
			})
		}
	})
const completed = task.children[0];
completed.addEventListener('click',()=>{
	console.log(completed)
	if(selectedTask !== 3 && task.children[1]=== replaceDiv){
		changingMessage.innerText = 'Please select all task first'
	}
	
	else if(task.children[1] === replaceDiv){
		replaceDiv.classList.add('completedTask')
		const completedLogo = document.createElement('img')
		completedLogo.src = '/imagesAndLogo/completed.svg'
		completedLogo.classList.add('completedLogo')

		task.replaceChild(completedLogo, completed)
		const doneLogo = document.createElement('img')
		doneLogo.src = '/imagesAndLogo/success.png'
		doneLogo.classList.add('done')
		task.replaceChild(doneLogo,task.children[2])
	}
}) 
})

