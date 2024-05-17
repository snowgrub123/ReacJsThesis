export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'Trang chủ', link: '/home'
            },
            // {
            //     name: 'menu.admin.crud', link: '/system/crud'
            // },
            {
                name: 'menu.admin.crud', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-teacher', link: '/system/manage-teacher'
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            // },
            // {
            //     name: 'menu.admin.manage-student', link: '/system/manage-student'
            // },
            { //
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
    // { //Quan ly Bai Dang
    //     // name: 'menu.admin.post',
    //     // menus: [
    //     //     {
    //     //         name: 'menu.admin.manage-post', link: '/system/manage-post'
    //     //     },
    //     // ]
    // },
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
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'Trang chủ', link: '/home'
            },
            {// Thông tin cá nhân Bác sĩ
                name: 'menu.admin.manage-teacher', link: '/system/manage-teacher-by-teacher'
            },
            {//Quản Lý Kế Hoạch Khám bệnh
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            },
            {//Quản Lý Bệnh nhân đặt lịch Khám bệnh 
                name: 'menu.teacher.manage-patient', link: '/teacher/manage-patient'
            },
        ]
    }
]


export const patientMenu = [
    {
        name: 'Menu',
        menus: [
            {
                name: 'Trang chủ', link: '/home'
            },

            {
                name: 'menu.admin.manage-student', link: '/system/manage-patient-user'
            }
        ]
    }
]

