import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get<any>(`${environment.api}groups/`);
  }

  getGroupsById(id: any) {
    return this.http.get<any>(`${environment.api}groups/${id}/`);
  }

  getGroupDetailsById(id: any) {
    return this.http.get<any>(`${environment.api}groups/${id}/boards/`);
  }

  getIssues(groupId: any, label: string, filteredBoard: any, assigneeId?: number) {
    if (assigneeId > 0) {
      return this.http.get<any>(`${environment.api}groups/${groupId}/issues/?labels=${label},${filteredBoard}&assignee_id=${assigneeId}`);
    } else {
      return this.http.get<any>(`${environment.api}groups/${groupId}/issues/?labels=${label},${filteredBoard}`);
    }
  }

  getAssigneesByGroup(groupId: any) {
    return this.http.get<any>(`${environment.api}groups/${groupId}/members/`);
  }

  getLabelsByGroup(groupId: number) {
    return this.http.get<any>(`${environment.api}groups/${groupId}/labels/`);
  }
}
