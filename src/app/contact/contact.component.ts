import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  sendEmail(event: Event) {
    event.preventDefault();
  
    emailjs
      .sendForm('service_0hb647a', 'template_p28tgwi', event.target as HTMLFormElement, 'TwVDYQOiJi14IB3eB')
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          
          // Optionally, trigger click on email success element if needed
          document.getElementById("email-sucess")?.click();
  
          // Show the success message (optional if modal is used)
          this.showSuccessMessage();
        },
        (error: any) => {
          console.log('FAILED...', error);
          
          // Display error message (you can show an error modal or alert)
          this.showErrorMessage();
        }
      );
  }
  

  // Show success modal after successful email send
  showSuccessMessage() {
    // Trigger a success modal or notification here
    console.log('Message sent successfully!');
  }

  // Show error message if email send fails
  showErrorMessage() {
    // Trigger an error modal or notification here
    console.log('Failed to send message.');
  }
}
