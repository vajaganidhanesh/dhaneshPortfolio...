var typingEffect = new Typed(".multiText",{
    strings: ['an UI/UX Designer','an Emailer Template developer','a Web Developer'],
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
    duration: 7,
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
        document.getElementById("navbar").style.boxShadow= ' 0px 0px 2px rgba(0, 0, 0, 0.25)';
        document.getElementById("navbar").style.transition='1s';
    }
    else{
        document.getElementById("navbar").style.background= 'transparent';
        document.getElementById("navbar").style.boxShadow= ' 0px 0px 0px rgba(0, 0, 0, 0.25)';
        document.getElementById("navbar").style.transition='1s';
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

    let inputName = document.getElementById('name')
    let inputEmail = document.getElementById('email')
    let inputSubject = document.getElementById('subject')
    let inputText = document.getElementById('textarea')

    function errorMessage(){
        
        setTimeout(() => {
            inputName.classList.remove('errorMessage')
            inputEmail.classList.remove('errorMessage')
            inputSubject.classList.remove('errorMessage')
            inputText.classList.remove('errorMessage')
        }, 3000);

            inputName.classList.add('errorMessage')
            inputEmail.classList.add('errorMessage')
            inputSubject.classList.add('errorMessage')
            inputText.classList.add('errorMessage')
    }

function sendmail()
{
    if(formdata.name!==null && formdata.email!==null && formdata.subject!==null && formdata.textarea!==null)
    {
        fetch('https://dhanesh-portfolio.herokuapp.com/user/sendmail',{
        // fetch('http://localhost:8000/user/sendmail',{
        
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formdata)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.success === true)
            {
                receiveMail()
                document.getElementById('name').value="";
                document.getElementById('email').value=""
                document.getElementById('subject').value=""
                document.getElementById('textarea').value=""

            }
            else{
                
                errorMessage()
               
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        errorMessage()
        console.log("please enter details");
    }
}

function receiveMail(){
    fetch('https://dhanesh-portfolio.herokuapp.com/user/receivemail',{
        // fetch('http://localhost:8000/user/receivemail',{
        
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