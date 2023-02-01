import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/data/contact';
import { ContactService } from 'src/app/data/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contact?: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.contact) {
      this.contactService.updateContact(this.contact)
        .subscribe(() => this.goBack());
    }
  }

}
