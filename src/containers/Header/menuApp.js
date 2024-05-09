export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/crud'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-teacher', link: '/system/manage-teacher'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            },
            {
                name: 'menu.admin.manage-student', link: '/system/manage-student'
            }, { //Quản Lý Kế Hoạch Dạy Học
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            },

        ]
    },
    { //Quản lý Phòng Kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //Quan ly Bai Dang 
        name: 'menu.admin.post',
        menus: [
            {
                name: 'menu.admin.manage-post', link: '/system/manage-post'
            },
        ]
    },
    { //Quan ly Phòng Khám
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
];

export const teacherMenu = [
    { //Quản Lý Kế Hoạch Dạy Học
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            },
        ]
    }
]


// name: 'menu.system.system-administrator.header',
// subMenus: [
//     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
// ]