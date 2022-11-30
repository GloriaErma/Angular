import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-get-demo',
  templateUrl: './get-demo.component.html',
  styleUrls: ['./get-demo.component.css']
})
export class GetDemoComponent implements OnInit {
  notFound: boolean = false;
  user!: User | null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUser(userId: string){
    this.notFound = false;
    this.user = null;

    this.userService.getUser(userId).subscribe((dataAPI :User)=>{this.user = dataAPI;},
                 (err:any)=>{ console.error(err); this.notFound=true});

  }

}
