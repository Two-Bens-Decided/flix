import Home from "./components/Home";
import SearchMovie from "./components/movieSearch";
import Twitter from "./components/Twitter";
import Discover from "./components/Disover";

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
  {
    path: 'discover',
    sidebarName: 'Discover',
    component: Discover
  }
  // {
  //   path: '/profile',
  //   sidebarName: 'Profile',
  //   component: Profile
  // }
];

export default Paths;
