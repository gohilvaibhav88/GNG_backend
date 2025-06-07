const Footer = () => {
  return (
    <footer className="bg-white pt-10 bg-gray-200">
      <div className="container mx-auto px-6 md:px-16 grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg">
            Get Exclusive Deals in your Inbox
          </h3>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className="px-4 py-2 rounded-l-full border border-gray-300 w-3/4"
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded-r-full">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500">
            We won’t spam, read our{" "}
            <a href="#" className="text-blue-500">
              email policy
            </a>
          </p>

          <div className="flex space-x-4 text-xl">
            <a href="#" className="text-black">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-black">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-black">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#" className="text-black">
              <i className="fab fa-snapchat"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg">Legal Pages</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-black">
                Terms and conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Modern Slavery Statement
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Important Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-black">
                Get help
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Add your restaurant
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Sign up to deliver
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Create a business account
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-black text-white text-center py-4 mt-10 text-sm">
        <p>UniEats Copyright 2024, All Rights Reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Pricing
          </a>
          <a href="#" className="hover:underline">
            Do not sell or share my personal information
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
