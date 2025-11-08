import React from 'react'
import { Link } from 'react-router'
import { FaFacebook, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'
import { RiTwitterXLine } from "react-icons/ri";
import { HiOutlineMail } from 'react-icons/hi'
import { MdAccountBalanceWallet } from 'react-icons/md'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg text-white">
                <MdAccountBalanceWallet className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-teal-400">FinanceFlow</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Take control of your finances with FinanceFlow — track expenses, set goals, and build your financial freedom confidently.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.linkedin.com/in/amdadislam01/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a href="https://x.com/amdad_vai__01" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <RiTwitterXLine className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/amdadislam01/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/a_m_d_a_d__01/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://github.com/amdadislam01" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Finance Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Dashboard Overview</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Budget Planner</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Expense Tracker</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Savings Goals</Link></li>
              <li><Link to="/reports" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Reports & Insights</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Security</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay in Control</h3>
            <p className="text-gray-400 text-sm">
              Get financial tips and updates to make smarter money decisions.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="pl-10 pr-3 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-sm text-gray-100 placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to receive financial insights and updates.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} FinanceFlow. All rights reserved.
            </div>
            <div className="text-sm text-gray-400">
              Developed By{" "}
              <a
                href="https://amdadislam-01.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline font-medium"
              >
                MD Amdad Islam
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-teal-400 transition">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-teal-400 transition">Terms of Service</Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-teal-400 transition">Cookie Policy</Link>
              <Link to="/accessibility" className="text-sm text-gray-400 hover:text-teal-400 transition">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
