import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  loading = this.spinner.show();

  constructor(private router: Router,
              private routeAct: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private Wservice: UserService) { }

  ngAfterViewInit(): void { this.spinner.show(); }

  ngOnInit(): void {
    this.listaPosts();
  }

  listaPosts() {
    this.sp();
    this.routeAct.paramMap.subscribe(params=>{
      if (params.has("id")){
        // this.Wservice.obtenerPostXUsuario(params.get("id")!).subscribe(data=>this.posts = data );
        this.Wservice.obtenerPostXUsuario(params.get("id")!).subscribe((data: Post[])=>{
        this.posts = data,
        this.loading = this.hideSpin(),
        console.log ("listado POST",this.loading)});
      }else{
        this.Wservice.obtenerPosts().subscribe(data=>this.posts = data );
        this.loading = this.hideSpin();
      }
    })
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
