//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like

// ------------------------------- Routing---------------------------------
//page title
const baseTitle = "Empower Ability Labs";

//an object of all the routes
const Routes = {
  "/": {
    page: "../pages/home.html",
    title: baseTitle,
    description: "Empower ability Labs Homepage",
  },
  "/schedule-a-call": {
    page: "../pages/schedule_a_call.html",
    title: "Schedule a call - " + baseTitle,
    description: "Empower ability Labs Schedule A call Page",
  },
  "/services": {
    page: "../pages/services.html",
    title: "Services - " + baseTitle,
    description: "Empower ability Labs Services Page",
  },
};

//route button function
const Route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  RouteHandler();

  //close hamberger menu
  navBarToggler();
};

//handels the routing
const RouteHandler = async () => {
  let pathname = window.location.pathname;
  if (pathname.length == 0) {
    pathname = "/";
  }
  const selectRoute = Routes[pathname];
  //get the page data
  const getPage = await fetch(selectRoute.page).then((content) =>
    content.text()
  );

  //inject the page data to the
  document.getElementById("root").innerHTML = getPage;
  document.title = selectRoute.title;
  document
    .querySelector(`meta[name="description"]`)
    .setAttribute("content", selectRoute.description);
  // re initialize the event listeners after new page is loaded
  // Inside RouteHandler, after setting innerHTML
  document.getElementById("root").innerHTML = getPage;
  // Use setTimeout to wait for the DOM to be updated
  setTimeout(() => {
    initPageFunctions(pathname);
  }, 0);
};

//initialize the page functions:
function initPageFunctions(pathname) {
  // If the current page is the Schedule a Call page, initialize its functions
  if (pathname === "/schedule-a-call") {
    setupScheduleACallPage();
  }
}

//check for change
window.onpopstate = RouteHandler;

//inital route
window.route = Route;
RouteHandler();
//--------------------------------------------------------------------------------

//----------------------Handle hamberger menu---------------------------
function navBarToggler() {
  const navbarCollapse = document.getElementById("navbarsExampleDefault");
  const navTogglerbutton = document.getElementById("navigationToggle");
  var isExpanded = navTogglerbutton.getAttribute("aria-expanded");

  //toggle aria-expanded
  if (isExpanded === "true") {
    isExpanded = "false";
  } else {
    isExpanded = "true";
  }
  navbarCollapse.classList.toggle("collapsed");
  navTogglerbutton.setAttribute("aria-expanded", isExpanded);
}
//------------------------------------------------------------------

// ------------------------------- Schedule a Call ---------------------------------
function setupSwitchInput() {
    const switchContainer = document.querySelector(".switch");
    const checkbox = document.getElementById("emailUpdates");
    const statusMessage = document.getElementById("emailUpdatesStatus");
  
    function updateStatus() {
      const state = checkbox.checked ? "on" : "off";
      statusMessage.textContent = `Receive emails about updates and services ${state}`;
      switchContainer.setAttribute("aria-checked", checkbox.checked.toString());
    }
  
    if (switchContainer) {
      switchContainer.addEventListener("click", function () {
        checkbox.checked = !checkbox.checked;
        updateStatus();
      });
  
      switchContainer.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault(); // Prevent scrolling when using Space
          checkbox.checked = !checkbox.checked;
          updateStatus();
        }
      });
  
      // Initialize the status message when the page loads
      updateStatus();
    }
  }
  
  
  function toggleSwitch(checkbox) {
    const switchContainer = checkbox.closest('.switch');
    const isChecked = checkbox.checked;
    
    // Update the aria-checked attribute
    switchContainer.setAttribute("aria-checked", isChecked.toString());
    
    // Update the visual state of the switch
    switchContainer.classList.toggle("switch-on", isChecked);
  }
  

function switchKeyDown(event) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    toggleSwitch(this);
  }
}

function setupPhoneNumberInput() {
  const phoneNumberInput = document.getElementById("phoneNumber");
  if (phoneNumberInput) {
    phoneNumberInput.addEventListener("input", function (event) {
      let value = event.target.value;
      value = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
      let formattedNumber = "";

      // Format the number with dashes
      for (let i = 0; i < value.length; i++) {
        if (i === 3 || i === 6) {
          formattedNumber += "-"; // Add a dash after 3rd and 6th digits
        }
        formattedNumber += value[i];
      }

      // Limit to 12 characters (3 digits - 3 digits - 4 digits)
      formattedNumber = formattedNumber.substring(0, 12);

      event.target.value = formattedNumber;
    });
  }
}
function updateCheckboxLabel(checkbox) {
  var checkboxDescription = checkbox.nextSibling.textContent.trim();
  checkbox.setAttribute(
    "aria-label",
    checkboxDescription + (checkbox.checked ? " selected" : " unselected")
  );
}

function setupScheduleACallPage() {
  setupSwitchInput();
  const inviteSpeakerCheckbox = document.getElementById("inviteSpeaker");
  const eventDetailsContainer = document.getElementById(
    "eventDetailsContainer"
  );

  if (inviteSpeakerCheckbox && eventDetailsContainer) {
    eventDetailsContainer.style.display = inviteSpeakerCheckbox.checked
      ? "block"
      : "none";

    inviteSpeakerCheckbox.addEventListener("change", function () {
      eventDetailsContainer.style.display = this.checked ? "block" : "none";
    });
  } else {
    console.error("One or more elements are missing on the page.");
  }
  // Set up phone number input
  setupPhoneNumberInput();

  const scheduleCallForm = document.getElementById("scheduleCallForm");
  if (scheduleCallForm) {
    scheduleCallForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("The form element is missing on the page.");
  }

  // Attach event listener to close the modal
  const closeModalButton = document.getElementById("closeModal");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      const successModal = document.getElementById("successModal");
      successModal.style.display = "none";

      // Return focus to the submit button or another appropriate element
      document.getElementById("submitBtn").focus();
    });
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const businessName = document.getElementById("businessName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const submissionMessage = document.getElementById("submissionMessage"); // Message element for feedback

  // Validation checks
  if (!businessName || !phoneNumber || !email) {
    submissionMessage.textContent = "Please fill in all required fields.";
    submissionMessage.style.color = "red"; // Or any color for error messages
    return;
  }

  const inviteSpeakerChecked = document.getElementById("inviteSpeaker").checked;
  const eventDetails = document.getElementById("eventDetails").value.trim();

  if (inviteSpeakerChecked && !eventDetails) {
    submissionMessage.textContent = "Please provide event details.";
    submissionMessage.style.color = "red"; // Or any color for error messages
    return;
  }

  simulateFormSubmission(businessName, phoneNumber, email, eventDetails);
}


function simulateFormSubmission(
  businessName,
  phoneNumber,
  email,
  eventDetails
) {
  // Simulate an AJAX request
  const submissionMessage = document.getElementById("submissionMessage"); // Message element for feedback

  console.log("Submitting form...");
  console.log(`Business Name: ${businessName}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Email: ${email}`);
  console.log(`Event Details: ${eventDetails}`);

  // Simulate a successful submission
  setTimeout(() => {
    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    const closeModalButton = document.getElementById("closeModal");

    successMessage.textContent =
      "Your call has been scheduled! We will get back to you soon.";
    successModal.style.display = "block";

    // Focus on the close button in the modal
    closeModalButton.focus();

    document.getElementById("scheduleCallForm").reset();
  }, 1000);
}
// Event listener to close the modal
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("successModal").style.display = "none";
});
window.addEventListener("load", setupScheduleACallPage);
// ------------------------------- schedule a call ends---------------------------------

function knowledgeRunner() {}

knowledgeRunner();
