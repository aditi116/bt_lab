const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Credexa Logo" 
                className="h-8 w-8"
              />
              <h3 className="text-lg font-semibold">Credexa Bank</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for Fixed Deposit investments and financial growth.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/fd-calculator" className="hover:text-white transition">FD Calculator</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@credexa.com</li>
              <li>Phone: 1800-123-4567</li>
              <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Credexa Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
