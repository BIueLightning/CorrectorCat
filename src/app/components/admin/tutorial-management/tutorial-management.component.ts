import { TutorialSequenceService } from './../../../services/tutorial-sequence.service';
import { TutorialSequence } from './../../../../assets/classes/tutorialSequence';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-management',
  templateUrl: './tutorial-management.component.html',
  styleUrls: ['./tutorial-management.component.css']
})
export class TutorialManagementComponent implements OnInit {

  tutorials: TutorialSequence[];
  filteredTutorials: TutorialSequence[];
  currentTutorial: TutorialSequence;
  loaded: boolean = false;
  bShowModal: boolean = false;

  constructor(private tutorialService: TutorialSequenceService) { }

  ngOnInit(): void {
    this.tutorials = [];
    this.filteredTutorials = [];
    this.tutorialService.getAllSequences().subscribe(res => {
      this.tutorials = res;
      this.copyOriginal();
      this.loaded = true;
    })
  }

  filterItem(value) {
    if (!value) {
      this.copyOriginal();
    }
    this.filteredTutorials = Object.assign([], this.tutorials).filter(
      item => item.tutorialTitle.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
  copyOriginal() {
    this.filteredTutorials = Object.assign([], this.tutorials);
  }

  onDeleteClick(tutorial: TutorialSequence): void{
    this.bShowModal = true;
    this.currentTutorial = tutorial;
    console.log(`show delete modal for book: ${tutorial._id}`);
  }
 
  onDeleteConfirm(): void {
    
  }
 
  hideModal(): void {
   this.bShowModal = false;
  }

}
