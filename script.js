(function () {
	const year = document.getElementById("year");
	if (year) {
		year.textContent = new Date().getFullYear();
	}

	const form = document.getElementById("projectForm");
	const status = document.getElementById("formStatus");

	if (!form || !status) {
		return;
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		const formData = new FormData(form);
		const fullName = (formData.get("fullName") || "").toString().trim();
		const businessName = (formData.get("businessName") || "").toString().trim();
		const email = (formData.get("email") || "").toString().trim();
		const websiteType = (formData.get("websiteType") || "").toString().trim();
		const budget = (formData.get("budget") || "").toString().trim();
		const projectDescription = (formData.get("projectDescription") || "").toString().trim();

		if (!fullName || !businessName || !email || !websiteType || !budget || !projectDescription) {
			status.textContent = "Please complete all required fields before sending your enquiry.";
			status.className = "form-status error";
			return;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			status.textContent = "Please enter a valid email address.";
			status.className = "form-status error";
			return;
		}

		const subject = encodeURIComponent(`Website enquiry from ${fullName}`);
		const body = encodeURIComponent(
			`Full name: ${fullName}\n` +
			`Business name: ${businessName}\n` +
			`Email: ${email}\n` +
			`WhatsApp: ${formData.get("whatsapp") || "Not provided"}\n` +
			`Website type: ${websiteType}\n` +
			`Approximate budget: ${budget}\n\n` +
			`Project description:\n${projectDescription}`
		);

		status.textContent = "Thanks! Your enquiry has been prepared and we will be in touch soon.";
		status.className = "form-status success";
		form.reset();
		window.location.href = `mailto:karabotshivhase2@gmail.com?subject=${subject}&body=${body}`;
	});
})();