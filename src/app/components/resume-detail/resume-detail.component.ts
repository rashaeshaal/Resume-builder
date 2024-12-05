import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resume-detail',
  standalone: false,
  
  templateUrl: './resume-detail.component.html',
  styleUrl: './resume-detail.component.css'
})
export class ResumeDetailComponent implements OnInit {
  resume: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchResumeDetails(id);
    }
  }

  fetchResumeDetails(id: string): void {
    this.isLoading = true;
    this.resumeService.getResumeById(id).subscribe(
      (data) => {
        this.resume = data;
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Failed to load resume details';
        this.isLoading = false;
      }
    );
  }
  goBack(): void {
    this.router.navigate([`/`]);
  }
}