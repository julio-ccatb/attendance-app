export enum ROUTES {
    // Authentication
    LOGIN = "/login",
    LOGOUT = "/logout",

    // Dashboard
    DASHBOARD = "/dashboard",

    // Volunteer Management
    VOLUNTEERS = "/volunteers",
    ADD_VOLUNTEER = "/volunteers/add",
    EDIT_VOLUNTEER = "/volunteers/edit/:id",
    VOLUNTEER_DETAILS = "/volunteers/:id",

    // Attendance Management
    ATTENDANCE = "/attendance",
    ADD_ATTENDANCE = "/attendance/add",
    EDIT_ATTENDANCE = "/attendance/edit/:id",

    // Activity Management
    ACTIVITIES = "/activities",
    ADD_ACTIVITY = "/activities/add",
    EDIT_ACTIVITY = "/activities/edit/:id",
    ACTIVITY_DETAILS = "/activities/:id",

    // Reports
    REPORTS = "/reports",

    // Settings
    SETTINGS = "/settings",
    SETTINGS_USERS = "/settings/users",
    SETTINGS_ROLES = "/settings/roles",
    SETTINGS_PROFILE = "/settings/profile",

    // Error Pages
    NOT_FOUND = "/404",
    UNAUTHORIZED = "/403"
}
