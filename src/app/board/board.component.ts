import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { FormControl } from '@angular/forms';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public groups: any = [];
  groupsControl = new FormControl();
  boardControl = new FormControl();
  assigneeControl = new FormControl();
  assignees: any;
  boardsGroup: any;
  activeBoards: any = [];
  currentGroupId: any;
  issuesBoard = {};
  issueDetails: any;
  fullListOfIssues: any;
  labels: any = {};
  boards: any = {
    Development: {
      labels: [
        'To do',
        'TodayManday',
        'In progress',
        'Local done',
        'Tests',
        'Changelog'
      ],
      filterLabel: ''
    },
    Frontend: {
      labels: [
        'To do',
        'TodayManday',
        'In progress',
        'Local done',
      ],
      filterLabel: '1: FrontEnd'
    },
    Backend: {
      labels: [
        'To do',
        'TodayManday',
        'In progress',
        'Local done',
      ],
      filterLabel: '1: BackEnd'
    },
  };

  assigneeId = -1;
  activeLabels: any = [];

  constructor(
    private groupsService: GroupsService
  ) { }

  ngOnInit() {
    this.getGitlabGroups();
  }

  getGitlabGroups() {
    this.groupsService.getGroups()
      .subscribe(response => {
        this.groups = response;
      });
  }

  getGroupMembers(groupId: any) {
    this.groupsService.getAssigneesByGroup(groupId)
      .subscribe((response: any) => {
        this.assignees = response;
      });
  }

  getGroupLabels(groupId: number) {
    this.groupsService.getLabelsByGroup(groupId)
      .subscribe(response => {
        const labelsLocal = {};
        response.forEach(label => {
          labelsLocal[label.name] = label;
        });
        this.labels = labelsLocal;
        console.log('labels: ', this.labels);
      });
  }

  createBoard(labelNames) {
    this.activeLabels = labelNames;
    console.log('active labels: ', this.activeLabels);
  }

  showByAssignee(assigneeId: number) {
    this.assigneeId = assigneeId;
  }

  showBoard(board: any) {
    this.activeBoards = [];
    this.boardControl.reset();
    this.groupsService.getGroupDetailsById(board.id)
      .subscribe((response: any) => {
        this.boardsGroup = response.boards;
      });
    this.currentGroupId = board.id;
    this.getGroupMembers(board.id);
    this.getGroupLabels(board.id);
  }

  // OLD FUNCTIONS DEPRICATED

  addRemoveBoard(boardObject: any) {
    console.log('board object: ', boardObject);
    if (this.activeBoards.indexOf(boardObject) > -1) {
      this.activeBoards.forEach((board, index) => {
        if (board === boardObject) {
          this.activeBoards.splice(index, 1);
        }
      });
    } else {
      this.activeBoards.push(boardObject);
      this.issuesBoard[boardObject.label.name] = [];
      // this.groupsService.getIssues(this.currentGroupId, boardObject.label.name)
      //   .subscribe((response): any => {
      //     response.forEach(singleIssue => {
      //       this.issuesBoard[boardObject.label.name].push(singleIssue);
      //     });
      //   });
      this.fullListOfIssues = { ...this.issuesBoard };
    }
    console.log('issues board: ', this.issuesBoard);
    console.log('active boards: ', this.activeBoards);
  }

  showByAssignee2(assignee) {
    this.issuesBoard = { ...this.fullListOfIssues };
    Object.keys(this.issuesBoard).forEach(issueKey => {
      this.issuesBoard[issueKey] = this.issuesBoard[issueKey].filter(item => {
        if (item.assignees[0] && item.assignees[0].id === assignee.id) {
          return item;
        }
      });
    });
  }

  showDetails(issue) {
    this.issueDetails = issue;
  }

  closeDetails() {
    delete this.issueDetails;
  }
}
