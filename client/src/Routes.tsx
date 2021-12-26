import Home from "./components/Home";
import SearchMovie from "./components/movieSearch";
import Twitter from "./components/Twitter";


const Paths = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Home
  },
  {
    path: 'search',
    sidebarName: 'Search',
    component: SearchMovie
  },
  {
    path: 'twitter',
    sidebarName: 'Twitter',
    component: Twitter
  },
  // {
  //   path: '/profile',
  //   sidebarName: 'Profile',
  //   component: Profile
  // }
];

export default Paths;
