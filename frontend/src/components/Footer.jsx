const Footer = ({ className }) => (
    <footer className="w-full bg-stone-300 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-4">
          <nav className="flex items-center gap-6 text-sm">
            <a href="/howitworks" className="hover:text-gray-600 transition-colors underline">Articles</a>
            <span className="text-gray-400">•</span>
            <a href="/howitworks" className="hover:text-gray-600 transition-colors underline">How it works</a>
            <span className="text-gray-400">•</span>
            <a href="/sponsors" className="hover:text-gray-600 transition-colors underline">Sponsors</a>
            <span className="text-gray-400">•</span>
            <a href="/privacy" className="hover:text-gray-600 transition-colors underline">Donate</a>
            <span className="text-gray-400">•</span>
            <a href="/privacy" className="hover:text-gray-600 transition-colors underline">Privacy Policy</a>
            <span className="text-gray-400">•</span>
            <a href="/privacy" className="hover:text-gray-600 transition-colors underline">Terms & conditions</a>
          </nav>
        </div>
        
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