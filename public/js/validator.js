// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();


// index page tax-toggle button js code 

let taxSwitch = document.getElementById("flexSwitchCheckDefault");

taxSwitch.addEventListener("change", () => {
  let afterTaxElements = document.getElementsByClassName("after-tax");
  let beforeTaxElements = document.getElementsByClassName("before-tax");

  for (let i = 0; i < beforeTaxElements.length; i++) {
    if (beforeTaxElements[i].style.display === "none") {
      beforeTaxElements[i].style.display = "inline";
      afterTaxElements[i].style.display = "none";
    } else {
      beforeTaxElements[i].style.display = "none";
      afterTaxElements[i].style.display = "inline";
    }
  }
});
