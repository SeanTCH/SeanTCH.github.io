//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");

//select all subtopic pages
var allpages = document.querySelectorAll(".page");
console.log(allpages);

//function to hide all pages
function HideAll() {
	//go through all subtopic pages
	for (let onepage of allpages) {
		onepage.style.display = "none"; //hide it
	}
}
HideAll();

//function to show selected page no
function ShowPage(pgno) {
	HideAll();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	//show the page
	onepage.style.display = "block";
}
ShowPage(1);

//listen for clicks on the buttons, assign anonymous eventhandler functions to call show function
page1btn.addEventListener("click", function () {
	ShowPage(1);
});
page2btn.addEventListener("click", function () {
	ShowPage(2);
});
page3btn.addEventListener("click", function () {
	ShowPage(3);
});

/*for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);

const menuItemsList = document.querySelector("nav ul");
function toggleMenus() {
	/*open and close menu*/
	menuItemsList.classList.toggle("menuShow");
} //can optimize using toggle class with css transitions
