"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState('beranda')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = [
    { id: 'beranda', label: 'Beranda', href: '#beranda' },
    { id: 'tentang', label: 'Tentang', href: '#tentang' },
    { id: 'jenis-sampah', label: 'Jenis Sampah', href: '#jenis-sampah' },
    { id: 'kontak', label: 'Kontak', href: '#footer' }
  ]

  const activeMenuItem = menuItems.find(item => item.id === activeMenu)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
      
      // Auto collapse on scroll, only expand on hover
      if (scrolled) {
        setIsCollapsed(true)
        
        // Auto track active section based on scroll position
        const sections = ['beranda', 'tentang', 'jenis-sampah', 'kontak']
        const currentSection = getCurrentSection()
        if (currentSection && currentSection !== activeMenu) {
          setActiveMenu(currentSection)
        }
      } else {
        setIsCollapsed(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeMenu])

  // Function to detect current section based on scroll position
  const getCurrentSection = () => {
    const sections = ['beranda', 'tentang', 'jenis-sampah', 'kontak']
    const scrollPosition = window.scrollY + 100 // offset for better detection
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId.replace('#', ''))
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          return sectionId
        }
      }
    }
    
    // Default to beranda if no section found or at top
    if (window.scrollY < 100) {
      return 'beranda'
    }
    
    return null
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsCollapsed(false)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Always collapse after mouse leave if scrolled
    if (isScrolled) {
      setIsCollapsed(true)
    }
  }

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId)
    if (isScrolled) {
      setIsCollapsed(true)
    }
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className={`
          bg-black/85 backdrop-blur-xl border border-white/10
          rounded-full shadow-2xl shadow-black/30
          transition-all duration-500 ease-out
          ${isScrolled ? 'scale-95' : 'scale-100'}
          ${isCollapsed && !isHovered ? 'px-4 py-2' : 'px-8 py-3'}
          hover:scale-105 hover:shadow-3xl hover:shadow-black/40
          cursor-pointer
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-8 relative overflow-hidden">
          {/* Logo - Always Visible */}
          <Link href="/" className="flex items-center shrink-0">
            <h1 className={`
              font-bold text-white tracking-tight transition-all duration-300
              ${isCollapsed && !isHovered ? 'text-lg' : 'text-xl'}
            `}>
              Organikin
            </h1>
          </Link>

          {/* Navigation - Conditional Display */}
          <nav className={`
            flex items-center relative transition-all duration-500 ease-out
            ${isCollapsed && !isHovered ? 'w-0 opacity-0 gap-0 overflow-hidden' : 'w-auto opacity-100 gap-6'}
          `}>
            {/* Full Menu */}
            <div className={`
              flex items-center gap-6 transition-all duration-300
              ${isCollapsed && !isHovered ? 'translate-x-4 scale-0' : 'translate-x-0 scale-100'}
            `}>
              {menuItems.map((item, index) => (
                <Link 
                  key={item.id}
                  href={item.href} 
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    text-sm font-medium transition-all duration-300 hover:scale-105 relative
                    whitespace-nowrap
                    ${activeMenu === item.id ? 'text-white' : 'text-white/80 hover:text-white'}
                  `}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Active Menu Indicator */}
            <div 
              className={`
                absolute bg-green-500/20 backdrop-blur-sm border border-green-400/30
                rounded-full transition-all duration-400 ease-out h-8
                ${activeMenu && !isCollapsed ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                left: activeMenu === 'beranda' ? '0px' : 
                      activeMenu === 'tentang' ? '70px' : 
                      activeMenu === 'jenis-sampah' ? '140px' : 
                      activeMenu === 'kontak' ? '260px' : '0px',
                width: activeMenu === 'beranda' ? '60px' : 
                       activeMenu === 'tentang' ? '65px' : 
                       activeMenu === 'jenis-sampah' ? '110px' : 
                       activeMenu === 'kontak' ? '55px' : '60px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </nav>

          {/* Collapsed State - Active Menu Only */}
          {isCollapsed && !isHovered && (
            <div className="flex items-center animate-fade-in">
              <span className="text-sm font-medium text-white/90 mr-2">
                {activeMenuItem?.label}
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          )}

          {/* Login Button */}
          <Link 
            href="/login" 
            className={`
              bg-green-600 hover:bg-green-500 
              text-white rounded-full text-sm font-semibold
              transition-all duration-300 shrink-0
              hover:scale-105 hover:shadow-lg hover:shadow-green-500/25
              active:scale-95
              ${isCollapsed && !isHovered ? 'px-3 py-1.5' : 'px-4 py-2'}
            `}
          >
            {isCollapsed && !isHovered ? '→' : 'Masuk'}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </header>
  )
}