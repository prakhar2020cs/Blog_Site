"use client"

const Footer = () => {
  return (
    <footer
      className="text-white py-12 px-4"
      style={{ backgroundColor: "#201022", width: "100%" }}
    >
      <div className="container mx-auto max-w-[1600px] h-full flex flex-col justify-between">
        {/* Grid layout for three sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 items-start">
          {/* Left column: Logo + Quote */}
          <div className="flex flex-col items-center px-4 text-center">
            <img
              src="/logo.png"
              alt="Bruno Language Learning"
              className="mb-4"
              style={{ height: "96px", width: "203px" }}
            />
            <p className="text-[25px] leading-relaxed text-[#FFFFFF] text-center font-bold max-w-sm whitespace-nowrap">
              "If you talk to someone in a language<br />
              they understand, that goes to their<br />
              head.If you talk to them in their own<br />
              language, that goes to their heart."
              <br />
              Nelson Mandela- by
            </p>
          </div>


          {/* Middle column: Quick & Extra Links */}
          <div className="grid grid-cols-2 gap-10 text-left">
            {/* Quick Links */}
            <div>
              <h3 className="text-[24px] font-[Afacad] mb-4">Quick Links</h3>
              <ul className="space-y-3 text-lg text-[rgba(255,255,255,0.6)]">
                <li><a href="#" className="hover:text-purple-300">Home</a></li>
                <li><a href="#" className="hover:text-purple-300">About Us</a></li>
                <li><a href="#" className="hover:text-purple-300">Courses</a></li>
                <li><a href="#" className="hover:text-purple-300">Blog</a></li>
              </ul>
            </div>

            {/* Extra Links */}
            <div>
              <h3 className="text-[24px] font-[Afacad] mb-4">Explore</h3>
              <ul className="space-y-3 text-lg text-[rgba(255,255,255,0.6)]">
                <li><a href="#" className="hover:text-purple-300">Resources</a></li>
                <li><a href="#" className="hover:text-purple-300">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-300">FAQs</a></li>
                <li><a href="#" className="hover:text-purple-300">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Right column: Socials */}
          <div className="flex flex-col items-start">
            <h3 className="text-[24px] font-[Afacad] mb-4">Stay connected and keep learning!</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10">
                <img src="/youtube.png" alt="YouTube" className="w-full h-full object-contain hover:opacity-70" />
              </a>
              <a href="#" className="w-10 h-10">
                <img src="/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain hover:opacity-70" />
              </a>
              <a href="#" className="w-10 h-10">
                <img src="/facebook.png" alt="Facebook" className="w-full h-full object-contain hover:opacity-70" />
              </a>
              <a href="#" className="w-10 h-10">
                <img src="/instagram.png" alt="Instagram" className="w-full h-full object-contain hover:opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom text */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          Copyright © 2025 Spanish Learning Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
