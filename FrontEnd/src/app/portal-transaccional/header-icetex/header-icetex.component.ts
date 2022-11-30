import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-header-icetex',
  templateUrl: './header-icetex.component.html',
  styleUrls: ['./header-icetex.component.css']
})
export class HeaderIcetexComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  public logout(): void{
    this.storageService.logout();
  }
}
