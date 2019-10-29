using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarpentryWebsite.Helpers
{
    public class ResultMapper
    {
        public ResultMapper()
        {
        
        }

        public string BeautifyErrorMessage(string message)
        {
            string formattedMessage = message.Remove(0, 9);
            switch (formattedMessage)
            {
                case "DuplicateUserName":
                    return "Ez a felhasználónév létezik";
                case "DuplicateEmail":
                    return "Ez az email cím már létezik";
                case "PasswordTooShort":
                    return "Túl rövid jelszó, legalább 6 karakterből kell állnia";
                case "InvalidUserName":
                    return "Kérem csak A-Z és 0-9 karaktereket adjon meg névnek";
                default:
                    return "Server error";
            }
        }
    }
}
