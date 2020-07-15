import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
  @Input() label;
  @Input() groupId;
  @Input() filterAssignee = 0;
  @Input() allLabels;
  @Input() colorLabels;
  issues: any = [];
  issueDetails: any;

  tempColors = [
    { name: '0: Hotfix', color: '#550033' },
    { name: '0: Improovement', color: '#D1D100' }
  ];

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {
    console.log('colorLabels from boards list: ', this.colorLabels);
    console.log('allLabels', this.allLabels);
    console.log('label from boards list: ', this.label);
    console.log('filterAssignee from boards list: ', this.filterAssignee);
    // this.getIssues();
  }

  goToIssue(url) {
    window.open(url, '_blank');
  }

  colorSide(side: any, issue) {
    if (side === '0' && issue.left_side) {
      return '5px solid ' + this.colorLabels[issue.left_side].color;
    } else if (side === '1' && issue.right_side) {
      return '5px solid ' + this.colorLabels[issue.right_side].color;
    } else {
      return '0px solid transparent';
    }
    // labels.forEach(label => {
    //   if (Object.keys(this.colorLabels[label]).includes(side)) {
    //     return '5px solid ' + this.colorLabels[label].color;
    //   }
    // });
  }

  getIssues() {
    this.groupService.getIssues(this.groupId, this.label.name, this.allLabels.filterLabel, this.filterAssignee)
      .subscribe(response => {
        this.issues = response;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getIssues();
  }

  showDetails(issue) {
    this.closeDetails();
    this.issueDetails = issue;
  }

  closeDetails() {
    delete this.issueDetails;
  }
}
