import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/data/contact';
import { ContactService } from 'src/app/data/contacts.service';
import { MessagesService } from 'src/app/data/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit{
  contacts: Contact[] = [];
  selectedContact?: Contact;

  constructor(
    private contactService: ContactService,
    private messageService: MessagesService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.messageService.add(`Selected Contact name=${contact.name}, ID: id=${contact.id}`);
  }

  getContacts(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.contactService.addContact({ name } as Contact).subscribe(contact => {this.contacts.push(contact);
    });
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(h => h !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }
  
  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 11;
  }

}
