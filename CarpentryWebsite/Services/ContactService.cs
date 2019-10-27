using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CarpentryWebsite.Models;

namespace CarpentryWebsite.Models
{
    public class ContactService
    {
        CarpentryWebsiteContext db = new CarpentryWebsiteContext();

        private readonly UserManager<MyUser> _userManager;

        public ContactService(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }

        public ContactService()
        {
        }
        public ContactService(CarpentryWebsiteContext carpentryWebsiteContext)
        {
            db = carpentryWebsiteContext;
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            try{
                return db.Contact.ToList();
            }catch{
                throw;
            }
        }

        public int AddContact(Contact contact)
        {
            try
            {
                db.Contact.Add(contact);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateContact(Contact contact)
        {
            try
            {
                db.Entry(contact).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Contact GetContactDetails(int id)
        {
            try
            {
                Contact contact = db.Contact.Find(id);
                return contact;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteContact(int id)
        {
            try
            {
                Contact contact = db.Contact.Find(id);
                db.Contact.Remove(contact);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
