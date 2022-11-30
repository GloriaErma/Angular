import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from 'src/app/models/post';
import { PostsResolverGuard } from 'src/app/posts-resolver.guard';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-post-resolv',
  templateUrl: './post-resolv.component.html',
  styleUrls: ['./post-resolv.component.css']
})
export class PostResolvComponent implements OnInit {
  posts!: Post[];
  loading = this.spinner.show();

  constructor(private router: Router,
              private routeAct: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private Wservice: UserService) { }

  ngAfterViewInit(): void { this.sp(); }

  ngOnInit() {
    // this.routeAct.data.subscribe((data: any ) => {
    this.routeAct.data.subscribe((data: any ) => {
      this.posts = data.posts
    });
  }
  showSpin() {
    this.spinner.show();
  }
  hideSpin() {
    this.spinner.hide();
  }
  // spinner ends after 5 seconds
  sp(): void{
      setTimeout(()=> {
        console.log("AQUI TERMINE SPINNER")
        this.spinner.hide();
      }, 1000 );
    }
  navegarAusuarios(){
    this.router.navigate(['/usuarios']);
  }

}
