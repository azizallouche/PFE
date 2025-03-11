import { Component, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

interface Experience {
  label: string;
  value: string;
}

interface Type {
  label: string;
  value: string;
}

interface Level {
  label: string;
  value: string;
}

@Component({
  selector: 'app-addjobform',
  templateUrl: './addjobform.component.html',
  styleUrls: ['./addjobform.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddjobformComponent {
  constructor(private sharedService: SharedService) {}

  formData = {
    input1: '',
    input2: '',
    input3: '',
    textarea: ''
  };

  experiences: Experience[] = [];
  types: Type[] = [];
  levels: Level[] = [];

  jobTitle: string;
  selectedExperienceLevel: string;
  selectedWorkType: string;
  selectedWorkLevel: string;
  overview: string;
  newMessage: string;
  messages: string[] = [];
  display:boolean=false;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @Output() booleanEmitter = new EventEmitter<boolean>();

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push(this.newMessage);
      this.newMessage = '';
      this.scrollMessagesToBottom();
      console.log(this.messages);
    }
  }

  deleteMessage(index: number) {
    this.messages.splice(index, 1);
  }
  
  private scrollMessagesToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  onEnter(event: Event) {
    event.preventDefault(); // Prevent form submission
    this.sendMessage();
  }

  preventEnterKey(event: Event) {
    if ((event as KeyboardEvent).key === 'Enter') {
      event.preventDefault(); // Prevent form submission
    }
  }
onSubmit() {
  const jobDetails = {
    jobTitle: this.jobTitle,
    experienceLevel: this.selectedExperienceLevel,
    workType: this.selectedWorkType,
    workLevel: this.selectedWorkLevel,
    overview: this.overview,
    messages: this.messages
  };
  this.display=true;
  this.sharedService.changeBooleanState(true);
  this.sharedService.getValues(jobDetails);
  console.log(this.display);
}

  ngOnInit() {
    const experienceNames = ['No experience needed', 'Min 1 year', 'Min 2 years', 'Min 5 years'];
    this.experiences = experienceNames.map(ex => ({ label: ex, value: ex }));

    const typeNames = ['Part time Job', 'Full time Job', 'Hybrid'];
    this.types = typeNames.map(ex => ({ label: ex, value: ex }));

    const levelNames = ['Entry Level', 'Mid Level', 'Senior Level'];
    this.levels = levelNames.map(ex => ({ label: ex, value: ex }));

  }


}

