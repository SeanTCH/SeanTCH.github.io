//target all elements to save to constants
// light/dark mode button
const visualmodebtn = document.querySelector("#toggleDisplayMode");

// page vars
const pagebtn = document.querySelectorAll(".pagebtn");
var allpages = document.querySelectorAll(".page");

// section vars
const sectionbtn = document.querySelectorAll(".sectionbtn");
var allsections = document.querySelectorAll(".section");
const sliders = document.querySelectorAll(".slideIn");

const dropdownBtn = document.querySelector(".dropdownBtn");

const backTopBtn = document.querySelector("#goTopBtn");

// overlay menu vars
const menuBtn = document.querySelector("#menuBtn");
const closeMenuBtn = document.querySelector("#closeMenuBtn");

function openNav()
{
	document.getElementById("navBar").style.width = "100%";
}
function closeNav()
{
	document.getElementById("navBar").style.width = "0%";
}

menuBtn.addEventListener("click", openNav);
closeMenuBtn.addEventListener("click", closeNav);


/* Switch pages */
//function to hide all pages
function HideAllPages()
{
	//go through all subtopic pages
	for (let onepage of allpages)
	{
		onepage.classList.remove("showPage");
	}
}
HideAllPages();

function ShowPage(pgno)
{
	HideAllPages();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	//show the page
	onepage.classList.add("showPage");

	let opacity = 0;
	// increase opacity using setInterval
	let fadeIn = setInterval(function ()
	{
		if (opacity >= 1)
		{
			clearInterval(fadeIn);
		}
		onepage.style.opacity = opacity;
		opacity += 0.01;
	}, 10);

	goTopofPage();
	closeNav();
}
ShowPage(1);

//listen for clicks on the buttons, assign anonymous eventhandler functions to call show function
for (let index = 0; index < pagebtn.length; index++)
{
	pagebtn[index].addEventListener("click", function ()
	{
		if (index > 1)
			ShowPage(index + 2);
		else
			ShowPage(index + 1);

		dropdownBtn.classList.remove("showDropdown");
		closeNav();
	});
}

/* Switch sections in one page */
//function to hide all sections
function HideAllSections()
{
	//go through all subtopic sections
	for (let onesection of allsections)
	{
		onesection.classList.remove("showSection"); //hide it
	}
	//hide section's content
	for (var i = 0; i < sliders.length; i++)
	{
		sliders[i].classList.remove("appear");
	}
}
HideAllSections();

function ShowSection(sectno)
{
	HideAllSections();
	//select the section based on the parameter passed in
	let onesection = document.querySelector("#section" + sectno);
	//show the section
	onesection.classList.add("showSection");
}

//listen for clicks on the buttons, assign anonymous eventhandler functions to call show function
for (let index = 0; index < sectionbtn.length; index++)
{
	sectionbtn[index].addEventListener("click", function ()
	{
		ShowPage(3);
		ShowSection(index + 1);

		dropdownBtn.classList.remove("showDropdown");
		slideInElement();
	});

}

/* Switch between dark/light mode */
visualmodebtn.addEventListener("click", function ()
{
	document.querySelector("body").classList.toggle("darkMode");
	dropdownBtn.classList.remove("showDropdown");
});

/* Dropdown menu */
dropdownBtn.addEventListener("click", function ()
{
	dropdownBtn.classList.toggle("showDropdown");
});

/* back to top button */
function canTopBtnAppear()
{
	if (document.documentElement.scrollTop > 20 || document.body.scrollTop > 20)
	{
		backTopBtn.style.display = "block";
	} else
	{
		backTopBtn.style.display = "none";
	}
}
function goTopofPage()
{
	window.scroll({ top: 0, behavior: "smooth" });
}
backTopBtn.addEventListener("click", goTopofPage);

/* Slide in animation */
function isInViewport(el)
{
	var bounding = el.getBoundingClientRect();

	if (bounding.top >= 0 &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function slideInElement()
{
	for (let i = 0; i < sliders.length; i++)
	{
		if (sliders[i].offsetParent != null && isInViewport(sliders[i]))
			sliders[i].classList.add("appear");
	}
}

window.addEventListener(
	"scroll", function ()
{
	slideInElement();
	canTopBtnAppear();
}, { passive: true }
);

/* Quiz */
var myQuestions = [
	{
		question: "What was the original name of volleyball?",
		answers: {
			1: 'Lacrosse',
			2: 'Volley Ball',
			3: 'Mintonette'
		},
		correctAnswer: 3
	},
	{
		question: "Which of these is not a type of volleyball serve?",
		answers: {
			1: 'Tandem',
			2: 'Floater',
			3: 'Underhand'
		},
		correctAnswer: 1
	},
	{
		question: "What happens when the ball lands on the boundary line?",
		answers: {
			1: 'The rally is replayed',
			2: 'It is considered "out"',
			3: 'It is considered "in"'
		},
		correctAnswer: 3
	},
	{
		question: "How many positions are there on each side of the court?",
		answers: {
			1: '2',
			2: '6',
			3: '3'
		},
		correctAnswer: 2
	},
	{
		question: "When was Volleyball created?",
		answers: {
			1: '2004',
			2: '1895',
			3: '1912'
		},
		correctAnswer: 2
	},
	{
		question: "What is the number of times a team can hit a ball without passing it over the net?",
		answers: {
			1: '1',
			2: '4',
			3: '3'
		},
		correctAnswer: 3
	}
];

const quizContainer = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

function showQuestions(questions, quizContainer)
{
	var output = [];
	var answers;

	for (var i = 0; i < questions.length; i++)
	{
		answers = [];

		for (var answer in questions[i].answers)
		{
			answers.push(
				'<label>' +
				'<input type="radio" name="question' + i + '" value="' + answer + '">' +
				answer + ': ' +
				questions[i].answers[answer] +
				'</label> <br>'
			);
		}

		output.push(
			'<div class="question">' + questions[i].question + '</div>' +
			'<div class="answers">' + answers.join('') + '</div>'
		);
	}
	quizContainer.innerHTML = output.join('');
}

function showResults(questions, quizContainer, resultsContainer)
{
	var answerContainers = quizContainer.querySelectorAll('.answers');

	var userAnswer;
	var numCorrect = 0;

	for (var i = 0; i < questions.length; i++)
	{
		userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

		if (userAnswer == questions[i].correctAnswer)
		{
			numCorrect++;
			answerContainers[i].style.color = 'chartreuse';
		}
		else
		{
			answerContainers[i].style.color = 'red';
		}
	}
	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

function generateQuiz(questions, quizContainer, resultsContainer, submitButton)
{
	showQuestions(questions, quizContainer);

	submitButton.addEventListener("click", function ()
	{
		showResults(questions, quizContainer, resultsContainer);
	});
}
generateQuiz(myQuestions, quizContainer, resultsContainer, submitBtn);