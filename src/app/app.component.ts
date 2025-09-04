import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { UserInterface } from './interfaces/user-interface';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ApiPractice';
  idValue:number=0;

  users:any
  constructor(private userservice:UserServiceService)
  {

  }

  ngOnInit()
  {
    this.userservice.getUser().subscribe((data:any)=>
    {
      console.log(data);
      this.users=Object.values(data)
      this.idValue=+this.users[this.users.length-1].id
      console.log(typeof(+this.idValue))
    }
    )
  }
  userName:UserInterface|undefined
  formSubmit(val:any)
  {
    console.log(val)
  }
  formSubmit1(val:UserInterface)
  {
    console.log(this.idValue);
    val.id=this.idValue+1;
    this.userservice.saveUser(val).subscribe((data:UserInterface)=>{
      console.log(data.id)
      this.ngOnInit();
    })
  }
  valueNeedToUpdate:any
  updateValue(updateIntoUserFormValue:any)
  {
    //console.log(updateIntoUserFormValue.userId)
    try
    {
    this.userservice.getUserToUpdateValue(updateIntoUserFormValue.userId).subscribe((data:UserInterface)=>
      {
        this.valueNeedToUpdate=data
    })
  }catch(error)
  {
    console.log("Page not found")
  }
  }

  flagValue:number=0
  updateUserDetails(flagValue:number)
  {
    if(flagValue==1){
      this.flagValue=flagValue    
    }
    }
    newDetails:any;
    setUserDetails(val:any)
    {
      this.newDetails=this.valueNeedToUpdate;
      this.newDetails.name=val.name
      this.userservice.updateUserValue(this.newDetails).subscribe((data:UserInterface)=>
        {
          console.log(data);
          console.log("value is updated");
        })
    }
    valueToDelete:any
    deleteUser()
    {
      this.userservice.deleteUser(this.valueNeedToUpdate.id).subscribe((data:UserInterface)=>
      {
        console.log("the data is successfully deleted");
        
      })
    }
}
