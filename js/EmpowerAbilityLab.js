//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like


// ------------------------------- Routing---------------------------------
//page title
const baseTitle = "Empower Ability Labs"

//an object of all the routes
const Routes = {

    "/" :{
        "page":"../pages/home.html",
        "title":baseTitle,
        "description": "Empower ability Labs Homepage"
    },
    "/schedule-a-call" :{
        "page":"../pages/schedule_a_call.html",
        "title":"Schedule a call - " + baseTitle,
        "description": "Empower ability Labs Schedule A call Page"
    },
    "/services" :{
        "page":"../pages/services.html",
        "title":"Services - " + baseTitle,
        "description": "Empower ability Labs Services Page"
    }, 
   
}

//route button function
const Route = (event) =>{
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},"",event.target.href);
    RouteHandler();
    
    //close hamberger menu
    navBarToggler()
}

//handels the routing
const RouteHandler = async() =>{
    const pathname = window.location.pathname;
    if(pathname.length==0){
        pathname = "/"
    }
    const selectRoute = Routes[pathname] 
    //get the page data
    const getPage = await fetch(selectRoute.page).then((content)=>content.text());

    //inject the page data to the 
    document.getElementById("root").innerHTML = getPage;
    document.title = selectRoute.title;
    document.querySelector(`meta[name="description"]`).setAttribute("content",selectRoute.description);
    
}

//check for change
window.onpopstate = RouteHandler;

//inital route
window.route = Route;
RouteHandler();
//--------------------------------------------------------------------------------



//----------------------Handle hamberger menu---------------------------
function navBarToggler(){
    const navbarCollapse = document.getElementById('navbarsExampleDefault');
    const navTogglerbutton = document.getElementById('navigationToggle');
    var isExpanded = navTogglerbutton.getAttribute('aria-expanded');

    //toggle aria-expanded
    if(isExpanded ==="true"){
        isExpanded = "false"
    }else{
        isExpanded = "true"
    }
    navbarCollapse.classList.toggle('collapsed');
    navTogglerbutton.setAttribute('aria-expanded' ,isExpanded);
}
//------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function() {
    var element = document.getElementById('toggleElement');
    element.style.display = 'none';
  });
  
  function toggleVisibility() {
    var element = document.getElementById('toggleElement');
    if (element.style.display === 'none' || element.style.display === '') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }





function knowledgeRunner(){

}





knowledgeRunner()