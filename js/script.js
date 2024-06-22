document.addEventListener('DOMContentLoaded', function () {
	// Function to open navigation sidebar
	function openNav() {
		document.getElementById("mySidenav").style.width = "250px";
	}

	// Function to close navigation sidebar
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}

	// Function to open login form modal and hide sign up form
	function openLoginForm() {
		document.getElementById("formModal").style.display = "block";
		document.getElementById("loginForm").style.display = "block";
		document.getElementById("signUpForm").style.display = "none";
	}

	// Function to open sign up form modal and hide login form
	function openSignUpForm() {
		document.getElementById("formModal").style.display = "block";
		document.getElementById("signUpForm").style.display = "block";
		document.getElementById("loginForm").style.display = "none";
	}

	// Function to close modal (both login and sign up)
	function closeModal() {
		document.getElementById("formModal").style.display = "none";
	}

	// Function to open booking modal
	function openBookingModal() {
		document.getElementById("bookingModal").style.display = "block";
	}

	// Function to close booking modal
	function closeBookingModal() {
		document.getElementById("bookingModal").style.display = "none";
	}

	// Event listener for booking button in mid-section
	const bookingButton = document.getElementById("bookingButton");
	if (bookingButton) {
		bookingButton.addEventListener("click", openBookingModal);
	}

	// Event listener for booking link in navbar
	const bookingLink = document.getElementById("bookingLink");
	if (bookingLink) {
		bookingLink.addEventListener("click", openBookingModal);
	}

	// Event listener for booking link in mobile nav
	const bookingLinkMobile = document.getElementById("bookingLinkMobile");
	if (bookingLinkMobile) {
		bookingLinkMobile.addEventListener("click", openBookingModal);
	}

	// Event listener for booking form submission
	const bookingForm = document.getElementById("bookingForm");
	if (bookingForm) {
		bookingForm.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent default form submission
			const serviceType = bookingForm.serviceType.value;
			const name = bookingForm.name.value;
			const contact = bookingForm.contact.value;
			console.log(`Service Type: ${serviceType}, Name: ${name}, Contact: ${contact}`);
			closeBookingModal(); // Close modal after form submission
		});
	}

	// Event listener to close modal when clicking outside of it
	window.onclick = function (event) {
		const formModal = document.getElementById("formModal");
		const bookingModal = document.getElementById("bookingModal");
		if (event.target == formModal) {
			closeModal();
		} else if (event.target == bookingModal) {
			closeBookingModal();
		}
	};

	// Assign functions to global scope
	window.openNav = openNav;
	window.closeNav = closeNav;
	window.openLoginForm = openLoginForm;
	window.openSignUpForm = openSignUpForm;
	window.closeModal = closeModal;
	window.closeBookingModal = closeBookingModal;

	const menuIcon = document.querySelector(".menu-icon");
	const navIcon = document.querySelector(".closebtn");

	menuIcon.addEventListener('click', function () {
		openNav();
		menuIcon.style.display = "none";
	});

	navIcon.addEventListener('click', function () {
		closeNav();
		menuIcon.style.display = "block";
	});
});



async function populate() {
	try {
		const response = await fetch('../assets/Items.json');
		const items = await response.json();
		const haircutPriceList = document.querySelectorAll('.haircut-price-list');
		const nailsPriceList = document.querySelectorAll('.nails-price-list');

		haircutPriceList.forEach(list => { list.innerHTML = ''; })
		nailsPriceList.forEach(list => { list.innerHTML = ''; })

		items.forEach(item => {
			const listItem = document.createElement('div');
			listItem.classList.add('list-items');
			const itemName = document.createElement('p');
			itemName.classList.add('items');
			itemName.textContent = item.itemName;
			const line = document.createElement('span');
			line.classList.add('line');
			const price = document.createElement('p');
			price.classList.add('price');
			price.textContent = item.Price;
			listItem.appendChild(itemName);
			listItem.appendChild(line);
			listItem.appendChild(price);

			if (item.itemName.includes('nail')) {
				nailsPriceList.forEach(list => list.appendChild(listItem.cloneNode(true)));
			} else {
				haircutPriceList.forEach(list => list.appendChild(listItem.cloneNode(true)));
			}

		});
	} catch (error) {
		console.log("Could Not Find Items");
	}
}
populate();




