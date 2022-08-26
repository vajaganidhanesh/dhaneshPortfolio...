var typingEffect = new Typed(".multiText",{
    strings: ['an ui designer','an emailer developer','a web developer'],
    loop:true,
    typeSpeed:100,
    backSpeed:80,
    backDelay:1500
})

let navtoggle =false;
function navbar(){
    if(navtoggle===false){
        document.getElementById("nav_links").style.height="250px";
        document.getElementById("icon").classList.remove("fa-bars");
        document.getElementById("icon").classList.add("fa-xmark");
        navtoggle=true;
    }
    else{
        document.getElementById("nav_links").style.height="0px";
        document.getElementById("icon").classList.remove("fa-xmark");
        document.getElementById("icon").classList.add("fa-bars");
        navtoggle=false;
    }
}

var tl = gsap.timeline();

tl.from('a' , {
    stagger: .3,
    duration: 1,
    y: 20,
    delay:0,
    ease: 'Expo.easeInOut',
    opacity: 0
})
.from('.image', {
    width: 0,
    duration: 1,
    ease: 'Expo.easeInOut',
}, '-=2')
.from('.left', {
    stagger: .3,
    duration: 2,
    y: 20,
    ease: 'Expo.easeInOut',
    opacity: 0
}, '-=2')
.from('.logo', {
    duration: 2,
    scale: 1.05,
    ease: 'Expo.easeInOut',
    opacity: 0
}, '-=2')


window.addEventListener("scroll",reveal);

function reveal(){
    
    var reveals = document.querySelectorAll('.reveal');


    for(var i =0;i<reveals.length;i++)
    {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint)
        {
            reveals[i].classList.add('active');
        }
        else
        {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener("scroll",reveal_one);

function reveal_one(){
    
    var reveals = document.querySelectorAll('.image_reveal');


    for(var i =0;i<reveals.length;i++)
    {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint)
        {
            reveals[i].classList.add('another_active');
            
        }
        else
        {
            reveals[i].classList.remove('another_active');
        }
    }
}

window.onscroll=function(){
    if(window.pageYOffset>=200)
    {
        document.getElementById("navbar").style.background= 'white';
        document.getElementById("navbar").style.boxShadow= '0 0px 10px rgba(36, 37, 38, 0.881); ';
        document.getElementById("navbar").style.transition='1s';
    }
    else{
        document.getElementById("navbar").style.background= 'transparent';
        document.getElementById("navbar").style.transition='3s';
    }
}

let formdata = {
    name:null,
    email:null,
    subject:null,
    textarea:null
}

function readvalue(property,event)
{
 
   if(event.target.value!=="")
    {
        formdata[property] = event.target.value;
        console.log(formdata);
    }
    else
    {
        formdata[property]=null;
    }
}

function sendmail()
{
    if(formdata.name!==null && formdata.email!==null && formdata.subject!==null && formdata.textarea!==null)
    {
        fetch('http://localhost:8000/user/sendmail',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formdata)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        console.log("please enter details");
    }
}