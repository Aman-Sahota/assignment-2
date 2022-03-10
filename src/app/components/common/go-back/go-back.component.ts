import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
})
export class GoBack {
  constructor(private navigationService: NavigationService) {}

  goBackClicked() {
    this.navigationService.back();
  }
}
