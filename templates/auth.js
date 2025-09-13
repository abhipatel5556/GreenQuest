// ===================================
// GreenQuest Auth & Sidebar Script
// Manages client-side authentication state using localStorage.
// ===================================

/**
 * Global function to log a user in and store their details.
 * This is meant to be called from a login or registration form.
 * @param {string} role - The user's role (e.g., 'student', 'teacher').
 * @param {string} username - The user's full name.
 * @param {string} avatarUrl - URL for the user's avatar image.
 */
window.doLogin = function(role, username, avatarUrl) {
    // Save user details to localStorage
    localStorage.setItem("gqUserName", username || "Guest User");
    localStorage.setItem("gqUserRole", role);
    localStorage.setItem("gqAvatar", avatarUrl || "https://via.placeholder.com/40");

    // Redirect to the appropriate dashboard based on role
    const lowerCaseRole = role.toLowerCase();
    if (lowerCaseRole === "student") {
        window.location.href = "student_dashboard.html";
    } else if (lowerCaseRole === "teacher") {
        window.location.href = "teacher_dashboard.html";
    } else {
        // Fallback for an unknown role, redirect to the main page
        window.location.href = "index.html";
    }
};

/**
 * Global function to log a user out by clearing their session data.
 */
window.logoutUser = function() {
    // Remove user details from localStorage
    localStorage.removeItem("gqUserName");
    localStorage.removeItem("gqUserRole");
    localStorage.removeItem("gqAvatar");
    
    // Redirect to the login page
    window.location.href = "login_page.html";
};

// ===================================
// DOM Content Loaded Handler
// Runs when the page finishes loading to render the UI.
// ===================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Load user info from localStorage
    const name = localStorage.getItem("gqUserName") || "Guest";
    const role = localStorage.getItem("gqUserRole") || "Visitor";
    const avatar = localStorage.getItem("gqAvatar") || "https://via.placeholder.com/40";

    // 2. Fill user details in sidebar
    const nameEl = document.getElementById("sidebarName");
    const roleEl = document.getElementById("sidebarRole");
    const avatarEl = document.getElementById("sidebarAvatar");

    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.textContent = role;
    if (avatarEl) avatarEl.src = avatar;

    // 3. Render Sidebar Menu Dynamically
    const sidebarMenu = document.getElementById("sidebarMenu");
    if (sidebarMenu) {
        let menuHtml = "";
        const lowerCaseRole = role.toLowerCase();

        if (lowerCaseRole === "student") {
            menuHtml = `
                <ul class="nav nav-pills flex-column mb-auto">
                    <li><a class="nav-link text-dark" href="student_dashboard.html"><i class="fas fa-home me-2"></i> Dashboard</a></li>
                    <li><a class="nav-link text-dark" href="lesson_library.html"><i class="fas fa-book me-2"></i> Lessons</a></li>
                    <li><a class="nav-link text-dark" href="challenge_library.html"><i class="fas fa-tasks me-2"></i> Challenges</a></li>
                    <li><a class="nav-link text-dark" href="leaderboard_page.html"><i class="fas fa-trophy me-2"></i> Leaderboards</a></li>
                    <li><a class="nav-link text-dark" href="community_feed.html"><i class="fas fa-users me-2"></i> Green Feed</a></li>
                    <li><a class="nav-link text-dark" href="join_class.html"><i class="fas fa-sign-in-alt me-2"></i> Join Class</a></li>
                    <li><a class="nav-link text-dark" href="#" onclick="logoutUser()"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
                </ul>`;
        } else if (lowerCaseRole === "teacher") {
            menuHtml = `
                <ul class="nav nav-pills flex-column mb-auto">
                    <li><a class="nav-link text-dark" href="teacher_dashboard.html"><i class="fas fa-chalkboard-teacher me-2"></i> Dashboard</a></li>
                    <li><a class="nav-link text-dark" href="create_class.html"><i class="fas fa-plus-circle me-2"></i> Create Class</a></li>
                    <li><a class="nav-link text-dark" href="verification_queue.html"><i class="fas fa-check-circle me-2"></i> Verification Queue</a></li>
                    <li><a class="nav-link text-dark" href="challenge_library.html"><i class="fas fa-tasks me-2"></i> Challenges</a></li>
                    <li><a class="nav-link text-dark" href="community_feed.html"><i class="fas fa-users me-2"></i> Green Feed</a></li>
                    <li><a class="nav-link text-dark" href="#" onclick="logoutUser()"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
                </ul>`;
        } else {
            menuHtml = `
                <p class="text-muted p-2">Please log in to see menu</p>
                <a class="btn btn-success w-100 mt-2" href="login_page.html">Login</a>
            `;
        }

        sidebarMenu.innerHTML = menuHtml;
    }
});
