export const Role = {
     ADMINISTRATOR : 'Admin',
     REGULER_USERS : "Visitors"
}

export const Permission = {
     BROWSE_CATEGORY : "browse_category",
     ADD_CATEGORY : "add_category",
     EDIT_CATEGORY : "edit_category",
     DELETE_CATEGORY : "delete_category",

     BROWSE_NEWS : "browse_news",
     ADD_NEWS : "add_news",
     EDIT_NEWS : "edit_news",
     DELETE_NEWS : "delete_news",
}

export const PermissionAssignment = {
     [Role.ADMINISTRATOR] : [
          Permission.BROWSE_CATEGORY,
          Permission.ADD_CATEGORY,
          Permission.EDIT_CATEGORY,
          Permission.DELETE_CATEGORY,

          Permission.BROWSE_NEWS,
          Permission.ADD_NEWS,
          Permission.EDIT_NEWS,
          Permission.DELETE_NEWS
     ],

     [Role.REGULER_USERS] : [
          Permission.BROWSE_NEWS
     ]
}