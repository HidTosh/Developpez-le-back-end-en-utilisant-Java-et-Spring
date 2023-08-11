import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';
import { RentalsService } from '../../services/rentals.service';
import { RentalResponse } from '../../interfaces/api/rentalResponse.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public rentals$ = this.rentalsService.all();

  constructor(
    private sessionService: SessionService,
    private rentalsService: RentalsService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }

  get user(): User | undefined {
    return this.sessionService.user;
  }

  onDelete(rentalId: number, rentalName: string): void {
    if(confirm("Are you sure to delete rental and related message:" + rentalName)) {
      this.rentalsService
      .delete(rentalId.toString())
      .subscribe((rentalResponse: RentalResponse) => {
        this.matSnackBar.open(rentalResponse.message, "Close", { duration: 3000 });
        this.rentals$ = this.rentalsService.all();
      });
    }
  }
}
