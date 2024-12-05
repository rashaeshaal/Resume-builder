import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService} from '../services/resume.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-resume-edit',
  standalone: false,
  
  templateUrl: './resume-edit.component.html',
  styleUrl: './resume-edit.component.css'
})
export class ResumeEditComponent implements OnInit {
  resumeForm!: FormGroup;
  languages: any[] = [];
  resumeId!: number;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLanguages();

    this.resumeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.resumeId) {
      this.fetchResume(this.resumeId);
    }
  }

  initForm() {
    this.resumeForm = this.fb.group({
      first_name: ['',[Validators.required,Validators.minLength(3)]],
      last_name: ['',[Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      languages: this.fb.array([]),
      experiences: this.fb.array([]),
    });
  }

  getLanguages() {
    this.resumeService.getLanguages().subscribe((data: any[]) => {
      this.languages = data; 
    });
  }

  get languagesFormArray() {
    return this.resumeForm.get('languages') as FormArray;
  }

  get experiences() {
    return this.resumeForm.get('experiences') as FormArray;
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


  isLanguageSelected(languageId: number): boolean {
    return this.languagesFormArray.value.includes(languageId);
  }

  fetchResume(id: number) {
    this.resumeService.getResumeById(id.toString()).subscribe(
      (data) => {
        console.log('Resume data:', data);
        

        this.resumeForm.patchValue({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          gender: data.gender,
          address: data.address,
        });
        const languagesFormArray = this.resumeForm.get('languages') as FormArray;
        languagesFormArray.clear();
  
        data.languages.forEach((language: string) => {
          const selectedLanguage = this.languages.find(lang => lang.name === language);
          if (selectedLanguage) {
            languagesFormArray.push(this.fb.control(selectedLanguage.id)); 
          }
        });
  
        data.experiences.forEach((exp: any) => {
          const experienceGroup = this.fb.group({
            company_name: [exp.company_name, Validators.required],
            position: [exp.position, Validators.required],
            start_date: [exp.start_date, Validators.required],
            end_date: [exp.end_date || '']
          });
          this.experiences.push(experienceGroup);
        });
  
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to fetch resume data';
        this.isLoading = false;
      }
    );
  }
  

  toggleLanguage(languageId: number) {
    const languagesFormArray = this.resumeForm.get('languages') as FormArray;
    const index = this.languagesFormArray.value.indexOf(languageId);

    if (index === -1) {
      this.languagesFormArray.push(this.fb.control(languageId));
    } else {
      this.languagesFormArray.removeAt(index);
    }
  }

  submitResume() {
    if (this.resumeForm.valid) {
      const formData = {
        ...this.resumeForm.value,
        name: `${this.resumeForm.value.first_name} ${this.resumeForm.value.last_name}`,
      };

      delete formData.first_name;
      delete formData.last_name;

      this.resumeService.updateResume(this.resumeId, formData).subscribe(
        (response) => {
          console.log('Resume updated successfully', response);
          this.router.navigate(['/resumes']);
        },
        (error) => {
          console.error('Error updating resume:', error);
        }
      );
    }
  }
}