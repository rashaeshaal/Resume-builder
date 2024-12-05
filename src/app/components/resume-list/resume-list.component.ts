import { Component,OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resume-list',
  standalone: false,
  
  templateUrl: './resume-list.component.html',
  styleUrl: './resume-list.component.css'
})
export class ResumeListComponent implements OnInit {
  resumes: any[] = []; 
  isLoading: boolean = true; 
  error: string | null = null; 

  constructor(private resumeService: ResumeService, private router: Router) {}

  ngOnInit(): void {
    this.getResumes();
  }


  getResumes() {
    this.resumeService.getResumes().subscribe(
      (data: any[]) => {
        this.resumes = data; 
        this.isLoading = false; 
      },
      (error) => {
        this.isLoading = false;
        this.error = 'Error fetching resumes';
        console.error('Error fetching resumes:', error);
      }
    );
  }

  viewResume(id: number) {
    this.router.navigate([`/resumes`,id]);
  }
  editResume(id: number) {
    this.router.navigate([`/edit`, id]);
  }
  deleteResume(resumeId: number): void {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(resumeId).subscribe(
        (response) => {
          this.resumes = this.resumes.filter(resume => resume.id !== resumeId);
        },
        (error) => {
          this.error = 'Error deleting resume';
        }
      );
    }
  }

  onAddNewPost() {
    this.router.navigate(['/create-resume']);
  }
  
  
  
}