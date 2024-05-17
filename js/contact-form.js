const cfConfig={error:{title:"Error!",message:GEBID("contactform").getAttribute("error_text")||"Sorry, an error occurred while receiving your message, Try contacting me with another method."},success:{title:"Message Sent Successfully.",message:GEBID("contactform").getAttribute("success_text")||"Thank you for contacting me, I'll get back to you soon."}},cfbody='\n<div class="box right-button" id="cf" style="display: inline-block; z-index: 9999;">\n\t<div class="button color" onclick="cfClick();"><span class="m-cf-icon-default"><i class="material-icons">chat_bubble</i></span><span class="cl-icon"><i class="material-icons">arrow_downward</i></span></div>\n\t<div class="panel" id="cfcontent"></div>\n</div>\n',cfform='\n<h3 class="title">Contact Me</h3>\n<p>Drop a message, I\'ll try to contact you soon.</p>\n<div>\n\t<input class="element" onchange="cfonChange(\'cfname\')" id="cfname" type="text" name="name" placeholder="Name" autocomplete="off">\n\t<input class="element" onchange="cfonChange(\'cfemail\')" id="cfemail" type="email" name="email" placeholder="Email" autocomplete="off">\n\t<input class="element" onchange="cfonChange(\'cfphone\')" id="cfphone" type="tel" name="phoneno" placeholder="Phone No." autocomplete="off" maxlength="14">\n\t<input class="element" onchange="cfonChange(\'cfsubject\')" id="cfsubject" type="text" name="subject" placeholder="Subject" autocomplete="off">\n\t<textarea class="element" onchange="cfonChange(\'cfmessage\')" id="cfmessage" name="message" placeholder="Your message"></textarea>\n\t<button id="cfbutton" onclick="cfSubmitMessage()" class="form-button color">Send</button>\n</div>\n';function cfClick(){GEBID("cf").classList.toggle("showing-state"),GEBID("cf").classList.toggle("showing")}async function cfSubmitMessage(){var e={name:GEBID("cfname").value,email:GEBID("cfemail").value.toLowerCase(),phone_no:GEBID("cfphone").value,subject:GEBID("cfsubject").value,message:GEBID("cfmessage").value};if(""===e.name)GEBID("cfname").classList.add("error");else if(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.email))if(""===e.phone_no)GEBID("cfphone").classList.add("error");else if(""===e.subject)GEBID("cfsubject").classList.add("error");else if(""===e.message)GEBID("cfmessage").classList.add("error");else{GEBID("cfbutton").removeAttribute("onclick"),GEBID("cfbutton").classList.remove("color"),GEBID("cfbutton").classList.add("onclick"),GEBID("cfbutton").innerHTML="Sending...";try{if(!(await(await fetch(document.getElementById("contactform").getAttribute("form_worker_url"),{method:"POST",body:JSON.stringify(e)})).json()).status)throw new Error("Error");GEBID("cfcontent").innerHTML=createHtmlFromObj(cfConfig.success),localStorage.setItem("contact-form",JSON.stringify({sent:!0,canSendUnix:(new Date).getTime()+432e5}))}catch(e){console.log(e),GEBID("cfcontent").innerHTML=createHtmlFromObj(cfConfig.error)}}else GEBID("cfemail").classList.add("error")}function cfonChange(e){GEBID(e).classList.remove("error")}function GEBID(e){return document.getElementById(e)}function createHtmlFromObj({title:e,message:t}){return`<h3 class="title">${e}</h3><p>${t}</p>`}window.onload=()=>{var e=document.createElement("link");e.rel="stylesheet",e.href="/src/cf.css",document.getElementsByTagName("head")[0].appendChild(e),e.onload=function(){var e=document.createElement("section");e.classList.add("contact-form-cf"),e.innerHTML=cfbody,document.getElementsByTagName("body")[0].appendChild(e);var t=JSON.parse(localStorage.getItem("contact-form"));"true"!==GEBID("contactform").getAttribute("disable_waittime")&&t&&t.sent&&t.canSendUnix>(new Date).getTime()?GEBID("cfcontent").innerHTML=createHtmlFromObj(cfConfig.success):GEBID("cfcontent").innerHTML=cfform}};