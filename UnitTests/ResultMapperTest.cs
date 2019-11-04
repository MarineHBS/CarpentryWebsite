using CarpentryWebsite.Helpers;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace UnitTests
{
    public class ResultMapperTest
    {
        [Fact]
        public void BeautifyShouldReturnCorrectResultsIfUsernameExists()
        {
            ResultMapper resultMapper = new ResultMapper();
            string result = resultMapper.BeautifyErrorMessage("Error is:DuplicateUserName");
            string expected = "Ez a felhasználónév létezik";
            Assert.Equal(expected, result);
        }

        [Fact]
        public void BeautifyShouldReturnCorrectResultsIfEmailExists()
        {
            ResultMapper resultMapper = new ResultMapper();
            string result = resultMapper.BeautifyErrorMessage("Error is:DuplicateEmail");
            string expected = "Ez az email cím már létezik";
            Assert.Equal(expected, result);
        }

        [Fact]
        public void BeautifyShouldReturnCorrectResultsIfPwTooShort()
        {
            ResultMapper resultMapper = new ResultMapper();
            string result = resultMapper.BeautifyErrorMessage("Error is:PasswordTooShort");
            string expected = "Túl rövid jelszó, legalább 6 karakterből kell állnia";
            Assert.Equal(expected, result);
        }

        [Fact]
        public void BeautifyShouldReturnCorrectResultsIfInvalidUsername()
        {
            ResultMapper resultMapper = new ResultMapper();
            string result = resultMapper.BeautifyErrorMessage("Error is:InvalidUserName");
            string expected = "Kérem csak A-Z és 0-9 karaktereket adjon meg névnek";
            Assert.Equal(expected, result);
        }

        [Fact]
        public void BeautifyShouldReturnCorrectResultsIfDifferentError()
        {
            ResultMapper resultMapper = new ResultMapper();
            string result = resultMapper.BeautifyErrorMessage("Error is: Different error occured");
            string expected = "Server error";
            Assert.Equal(expected, result);
        }
    }
}
