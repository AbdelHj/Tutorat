

let res = [
  { path: `${process.env.PUBLIC_URL}/app/project/project-list/1`, type: 'link', title: 'Courses List' },
  { path: `${process.env.PUBLIC_URL}/app/project/new-project`, type: 'link', title: 'Create New Course' },
];
if(localStorage.getItem('user')){
  res = JSON.parse(localStorage.getItem('user')).type === 'T' ?
            [{path: `${process.env.PUBLIC_URL}/app/project/new-project`, type: 'link', title: 'Create New Course'},
            { path: `${process.env.PUBLIC_URL}/app/project/project-list/1`, type: 'link', title: 'Courses List' },
            { path: `${process.env.PUBLIC_URL}/app/project/mycourses`, type: 'link', title: 'My courses' }
          ]
            : 
            [{ path: `${process.env.PUBLIC_URL}/app/project/project-list/1`, type: 'link', title: 'Courses List' }];
}



export const MENUITEMS = [
  {
    menutitle: 'General',
    menucontent: 'Dashboards,Widgets',
    Items: [
      {
        title: 'Dashboard',
        icon: 'home',
        type: 'sub',
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard`, title: 'Dashboard', type: 'link'
      },
    ],
  },

  {
    menutitle: 'Applications',
    menucontent: 'Ready to use Apps',
    Items: [
      {
        title: 'Courses',
        icon: 'project',
        type: 'sub',
        badge: 'badge badge-light-secondary',
        active: false,
        children: res,
      },
      {
        title: 'Catalogue',
        icon: 'ecommerce',
        type: 'sub',
        active: false,
        path: `${process.env.PUBLIC_URL}/app/ecommerce/product`, title: 'Catalogue', type: 'link'
      },
      ],
  },
];
