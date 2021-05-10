import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize } from 'rxjs/operators';

import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { MustMatch } from '../shared/validators/passwords-match.validator';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import { IProfile } from './shared/interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  oldPassword: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  resetForm: FormGroup;
  buttonHover: boolean = false;

  profileInfo: IProfile = {
    name: '',
    surname: '',
    address: '',
    userUID: '',
  };
  profileIsEmpty: boolean;
  profilePictureURL:string = '';
  selectedImage: any;
  constructor(
    public firebaseAuthService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private _firebaseCrudService: FireBaseCrudService,
    private _fireBaseStorage: AngularFireStorage
  ) {
    this.oldPassword = new FormControl('', Validators.required);
    this.password = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
        ),
      ])
    );
    this.confirmPassword = new FormControl('', Validators.required);
    this.resetForm = this.formBuilder.group(
      {
        oldPassword: this.oldPassword,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      { validators: MustMatch('password', 'confirmPassword') }
    );
   
  }

  ngOnInit(): void {
    console.log(this.firebaseAuthService.isSignedInWithEmail);
    this.firebaseAuthService.currentUser$.subscribe((data: any) => {
     if(data){
      this.profileInfo.userUID = this.firebaseAuthService.userUID = data.uid;
     }
    });
    console.log(this.profileInfo);
    this._firebaseCrudService
      .getCollection('profile')
      .subscribe((data: IProfile[]) => {
        const myProfile = data.filter(
          (profile) => profile.userUID === this.profileInfo.userUID
        )[0];
        if (myProfile) {
          this.profileInfo = myProfile;
          this.profileIsEmpty = false;
          console.log('user is not new');
          if (this.profileInfo.profilePicture) {
            console.log('profile image exists');
            this.profilePictureURL = this.profileInfo.profilePicture;
          } else {
            console.log('profile exists but not image');
            this.profilePictureURL = '../../assets/images/user (1).png';
          }
        } else {
          this.profileIsEmpty = true;
          console.log('user is new');
          console.log('no profile exists');
          this.profilePictureURL = '../../assets/images/user (1).png';
        }
      });
  }
  saveProfileInfo() {
    if (this.profileIsEmpty) {
      this._firebaseCrudService.saveItem('profile', this.profileInfo);
    } else {
      this._firebaseCrudService.editItem(
        'profile',
        this.profileInfo.id,
        this.profileInfo
      );
    }
  }
  clearProfileInfo() {
    if (!this.profileIsEmpty) {
      this._firebaseCrudService.deleteItem('profile', this.profileInfo.id);
    }
    this.profileInfo = {
      name: '',
      surname: '',
      address: '',
      userUID: this.firebaseAuthService.userUID,
    };
  }
  oldPasswordIsInvalid(): boolean {
    return this.oldPassword.invalid && this.oldPassword.touched;
  }

  passwordIsInvalid(): boolean {
    return this.password.invalid && this.password.touched;
  }

  confirmPasswordIsInvalid(): boolean {
    return (
      this.confirmPassword.invalid &&
      this.confirmPassword.touched &&
      this.password.value &&
      this.confirmPassword.value !== this.password.value
    );
  }

  resetPassword(): void {
    this.firebaseAuthService.resetPassword(
      this.oldPassword.value,
      this.password.value
    );
    this.resetForm.reset();
    setTimeout(() => {
      this.firebaseAuthService.errorMessage = '';
      this.firebaseAuthService.infoMessage = '';
    }, 5000);
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.profilePictureURL = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.profilePictureURL =
        'https://image.flaticon.com/icons/png/128/1102/1102949.png';
      this.selectedImage = null;
    }
    this.uploadProfileImage();
  }

  uploadProfileImage() {
    if (this.selectedImage) {
      //თუ არჩეული სურათი არსებობს
      if (this.profileInfo.profilePicture) {
        //თუ უკვე არის ატვირთული და ვაედითებ

        this.editImage();
      } else {
        this.saveImage();
      }
    }
  }
  editImage() {
    console.log('image editing');
    if (this.selectedImage) {
      this.deleteImage();
      let filePath = `${this.selectedImage.name}_${new Date().getTime()}}`;
      const fileRef = this._fireBaseStorage.ref(filePath);
      this._fireBaseStorage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.profileInfo.profilePicture = this.profilePictureURL = url;
              this._firebaseCrudService.editItem(
                'profile',
                this.profileInfo.id,
                {profilePicture:this.profilePictureURL}
              );
            });
          }),
          catchError((err) => err)
        )
        .subscribe();
    }
  }

  saveImage() {
    console.log('image saving');
    if (this.selectedImage) {
      let filePath = `${this.selectedImage.name}_${new Date().getTime()}}`;
      const fileRef = this._fireBaseStorage.ref(filePath);
      this._fireBaseStorage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.profileInfo.profilePicture = this.profilePictureURL = url;
              this._firebaseCrudService.saveItem('profile', this.profileInfo);
            });
          }),
          catchError((err) => err)
        )
        .subscribe();
    }
  }
  deleteImage() {
    let image = this._fireBaseStorage.refFromURL(this.profilePictureURL);
    image.delete().subscribe((data) => {
      console.log('image deleted');
    });
  }
}
