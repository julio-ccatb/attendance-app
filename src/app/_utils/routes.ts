export enum ROUTES {
  // Authentication
  LOGIN = "/login",
  LOGOUT = "/logout",

  // Dashboard
  DASHBOARD = "/dashboard",

  // Volunteer Management under Dashboard
  VOLUNTEERS = "/dashboard/volunteers",
  ADD_VOLUNTEER = "/dashboard/volunteers/add",
  EDIT_VOLUNTEER = "/dashboard/volunteers/edit/:id",
  VOLUNTEER_DETAILS = "/dashboard/volunteers/:id",

  // Attendance Management under Dashboard
  ATTENDANCE = "/dashboard/attendance",
  ADD_ATTENDANCE = "/dashboard/attendance/add",
  EDIT_ATTENDANCE = "/dashboard/attendance/edit/:id",

  // Activity Management under Dashboard
  ACTIVITIES = "/dashboard/activities",
  ADD_ACTIVITY = "/dashboard/activities/add",
  EDIT_ACTIVITY = "/dashboard/activities/edit/:id",
  ACTIVITY_DETAILS = "/dashboard/activities/:id",

  // Reports under Dashboard
  REPORTS = "/dashboard/reports",

  // Settings under Dashboard
  SETTINGS = "/dashboard/settings",
  SETTINGS_USERS = "/dashboard/settings/users",
  SETTINGS_ROLES = "/dashboard/settings/roles",
  SETTINGS_PROFILE = "/dashboard/settings/profile",

  // Error Pages
  NOT_FOUND = "/404",
  UNAUTHORIZED = "/403",
}
