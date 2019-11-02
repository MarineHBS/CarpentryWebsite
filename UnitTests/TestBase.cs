using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTests
{
    public class TestBase : IDisposable
    {
        public TestBase()
        {
            // Do "global" initialization here; Only called once.
        }

        public void Dispose()
        {
            // Do "global" teardown here; Only called once.
        }
    }
}
