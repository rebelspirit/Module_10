const lang = "qwerty";
const string = "qryte";
const charsArr = string.split("").reverse();
const timerOutput = document.querySelector(".timer");
console.log(charsArr);


//localData будет хранить результаты.
let localData = {
	result: 0,
	lettersNumber: null,
	time: ''
};

//Функция таймера
let timer = () => {
	console.log('Start time');
	let secondsTimeDefault = 0;
	localData.time = setInterval(() => {
		secondsTimeDefault++;
		timerOutput.textContent = secondsTimeDefault;
	}, 1000);
}

const countKPS = event => {
	charsArr.forEach(function(i) {
		if(localData.lettersNumber >= 0 && localData.lettersNumber < charsArr.length){
			if(i === event.key){
				localData.lettersNumber = localData.lettersNumber + 1;
				delete charsArr[i]
				console.log(localData.lettersNumber)
			} else {
				localData.lettersNumber = localData.lettersNumber + 0
			}

		} else {
			 clearInterval(localData.time);
			 document.querySelector("#result").textContent = timerOutput.textContent;
			 console.log('stop')
			 localData.result = timerOutput.textContent;
			 localMemory();
		}
	}); 
}; 

//Сравниваем результаты из localStorage и результат игры, запысываем 
//лучшее время
const localMemory = () => {
	const getBest = localStorage.getItem('resultBest');
	if(localData.result < getBest){
		localStorage.setItem('resultBest', localData.result);
	}	
}
//Выводим лучший результат на экран
const updateBestResult = () => {
	const bestResultBlock = document.querySelector("#best-result")
  	bestResultBlock.textContent = localStorage.getItem('resultBest')  || '';
};
updateBestResult();

document.querySelector("#start").addEventListener("click", timer);
window.addEventListener("keydown", countKPS);