import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersformComponent } from './usersform.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [UsersformComponent],
  imports: [CommonModule, FormsModule, MatSelectModule],
  exports: [UsersformComponent],
})
export class UsersformModule {}
