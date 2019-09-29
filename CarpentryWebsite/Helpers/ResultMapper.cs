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
                    return "This username already exists";
                case "DuplicateEmail":
                    return "This email already exists";
                case "PasswordTooShort":
                    return "Password is too short";
                case "InvalidUserName":
                    return "Please enter only characters A-Z and 0-9";
                default:
                    return "Server error";
            }
        }
    }
}
