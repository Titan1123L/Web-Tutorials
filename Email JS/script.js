function sendMail() {
    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  
    const serviceID = "service_7v7oswi";
    const templateID = "template_5ze38qr";
  
      emailjs.send(serviceID, templateID, params)
      .then(
          alert("Your message sent successfully!!")
  
      )
  }