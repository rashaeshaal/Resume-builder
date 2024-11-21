import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-resume-form',
  standalone: false,

  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent {
  resumeForm: FormGroup;
  isSubmitted: boolean = false;
  
  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      languages: this.fb.group({
        english: [false],
        hindi: [false],
        malayalam: [false],
        tamil: [false],
        others: [false],
      }),
      address: this.fb.group({
        houseNo: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', [Validators.required, this.pincodeValidator]],
      }),
      experiences: this.fb.array([]) // Experience as a FormArray
    });

}
get experiences(): FormArray {
  return this.resumeForm.get('experiences') as FormArray;
}
get address(): FormGroup {
  return this.resumeForm.get('address') as FormGroup;
}
pincodeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (value && !/^\d{6}$/.test(value)) {
    return { invalidPincode: true };
  }
  return null;
}
addExperience(): void {
  const experienceGroup = this.fb.group({
    companyName: ['', Validators.required],
    position: ['', Validators.required],
    experience: this.fb.group({
      dateOfJoining: ['', Validators.required],
      dateOfResign: ['', Validators.required],
    }),
  });
  this.experiences.push(experienceGroup);
}
deleteExperience(index: number): void {
  this.experiences.removeAt(index);
}
onSubmit(): void {
  if (this.resumeForm.valid) {
    console.log('Form Data:', this.resumeForm.value);
    this.isSubmitted = true; // Show the confirmation message
    this.resetForm(); // Reset the form after submission
  }
}
resetForm(): void {
  this.resumeForm.reset();
  this.experiences.clear(); // Clear experiences
}
populateForm(): void {
  this.resumeForm.patchValue({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
    gender: 'Male',
    languages: {
      english: true,
      hindi: false,
      malayalam: true,
    },
    address: {
      houseNo: '123',
      street: 'Main Street',
      city: 'Sample City',
      state: 'Sample State',
      pincode: '123456',
    },
  });
}
}

