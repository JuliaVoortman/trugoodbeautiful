const Footer = ({ className }) => (
  <footer className="w-full bg-stone-300 py-4">
    <div className="max-w-7xl mx-auto px-4">
      {/* Navigation Links */}
      <div className="mb-4">
        <nav className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-x-2 gap-y-3 text-sm">
          <a href="/howitworks" className="hover:text-gray-600 transition-colors underline text-center">
            Articles
          </a>
          <span className="hidden sm:inline text-gray-500">•</span>
          <a href="/howitworks" className="hover:text-gray-600 transition-colors underline text-center">
            How it works
          </a>
          <span className="hidden sm:inline text-gray-500">•</span>
          <a href="/sponsors" className="hover:text-gray-600 transition-colors underline text-center">
            Sponsors
          </a>
          <span className="hidden sm:inline text-gray-500">•</span>
          <a href="/privacy" className="hover:text-gray-600 transition-colors underline text-center">
            Donate
          </a>
          <span className="hidden sm:inline text-gray-500">•</span>
          <a href="/privacy" className="hover:text-gray-600 transition-colors underline text-center">
            Privacy Policy
          </a>
          <span className="hidden sm:inline text-gray-500">•</span>
          <a href="/privacy" className="hover:text-gray-600 transition-colors underline text-center">
            Terms & conditions
          </a>
        </nav>
      </div>
      
      {/* Credits Section */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          We run on 
          <a 
            href="https://www.contentful.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img 
              src="/contentful_logo.svg" 
              alt="Contentful" 
              className="h-5 inline-block"
            />
          </a>
        </div>
        <span className="text-gray-400 text-sm">|</span>
        <a 
          href="https://www.linkedin.com/in/juliavoortman/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          Made with ❤️ by Julia
        </a>
      </div>
    </div>
  </footer>
);
  
  export default Footer;