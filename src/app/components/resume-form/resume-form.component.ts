import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Router } from '@angular/router';
import{ Language } from '../../models/language';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { HttpResponse,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resume-form',
  standalone: false,
  
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent implements OnInit {
  resumeForm!: FormGroup;
  languages: any[] = [];

  constructor(private fb: FormBuilder, private resumeService: ResumeService,  private router: Router ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLanguages();
  }


  initForm() {
    this.resumeForm = this.fb.group({
      first_name: ['', [Validators.required,Validators.minLength(3)]],
      last_name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      languages: [[],Validators.required],
      experiences: this.fb.array([]), 
    });
  }

  
  getLanguages() {
    this.resumeService.getLanguages().subscribe((data: any[]) => {
      this.languages = data; 
    });
  }

 
  get experiences() {
    return (this.resumeForm.get('experiences') as FormArray);
  }

  
  addExperience() {
    const experienceGroup = this.fb.group({
      company_name: ['', Validators.required],
      position: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  
  toggleLanguage(languageId: number) {
    const currentLanguages = this.resumeForm.get('languages')?.value;
    if (currentLanguages.includes(languageId)) {
      const newLanguages = currentLanguages.filter((id: number) => id !== languageId);
      this.resumeForm.get('languages')?.setValue(newLanguages);
    } else {
      currentLanguages.push(languageId);
      this.resumeForm.get('languages')?.setValue(currentLanguages);
    }
  }

 
  submitResume() {
    if (this.resumeForm.valid) {
      const formData = { 
        ...this.resumeForm.value,
        name: `${this.resumeForm.value.first_name} ${this.resumeForm.value.last_name}`
      };
  
      delete formData.first_name;
      delete formData.last_name;
  
      console.log('Submitting data:', JSON.stringify(formData)); 
  
      this.resumeService.createResume(formData).subscribe(
        (response) => {
          console.log('Resume created successfully', response);
          this.router.navigate(['/resumes']);
        },
        (error) => {
          console.error('Error creating resume:', error);
        }
      );
    }
  }
}
  
