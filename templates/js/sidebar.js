function loadSidebar(type) {
  let file = "";
  if (type === "student") file = "sidebar-student.html";
  if (type === "teacher") file = "sidebar-teacher.html";

  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById("sidebar-container").innerHTML = data;
    });
}
