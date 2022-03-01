import auth from '../../services/authService';
const menusItems   =()=>{
    let  menusLists = [
        { title: 'Posts', url: '/posts/all' },
        { title: 'Design', url: '#' },
        { title: 'Culture', url: '#' },
        { title: 'Business', url: '#' },
        { title: 'Politics', url: '#' },
        { title: 'Opinion', url: '#' },
        { title: 'Science', url: '#' },
        { title: 'Health', url: '#' },
        { title: 'Style', url: '#' },
      ];
      if(auth.getCurrentUser()){
      
        menusLists.push(
          { title: 'Profile', url: '/profile' },
          { title: 'Logout', url: '/logout' },
        )
      }else{
        menusLists.push(
          { title: 'Login', url: '/login' }, 
          { title: 'Register', url: 'register' }
          )
      }
      return menusLists
}
 const menus ={menusItems}
  export default menus