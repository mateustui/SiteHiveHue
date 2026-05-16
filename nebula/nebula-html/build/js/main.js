// Card hover glow effect
class CardHoverEffect {
  constructor(cardSelector = '.card') {
    this.cardSelector = cardSelector
    this.handleCardMouseMove = this.handleCardMouseMove.bind(this)
    this.initialize()
  }

  handleCardMouseMove(event) {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  initialize() {
    this.cards = document.querySelectorAll(this.cardSelector)
    if (this.cards.length === 0) {
      return // Exit if no .card elements are found
    }
    this.cards.forEach((card) => {
      card.addEventListener('mousemove', this.handleCardMouseMove)
    })
  }

  cleanup() {
    if (!this.cards) {
      return // Exit if no .card elements were initialized
    }
    this.cards.forEach((card) => {
      card.removeEventListener('mousemove', this.handleCardMouseMove)
    })
  }
}

// Stats counter
class StatsCounter {
  constructor() {
    this.statsSection = document.getElementById('stats')
    this.activeUsersOdometer = document.getElementById('active-users')
    this.companiesManagedOdometer = document.getElementById('companies-managed')
    this.projectsCreatedOdometer = document.getElementById('projects-created')

    if (
      this.statsSection &&
      this.activeUsersOdometer &&
      this.companiesManagedOdometer &&
      this.projectsCreatedOdometer
    ) {
      this.initialize()
    }
  }

  fetchMockStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentStats = {
          activeUsers: parseInt(this.activeUsersOdometer.dataset.val ?? '0'),
          companiesManaged: parseInt(
            this.companiesManagedOdometer.dataset.val ?? '0',
          ),
          projectsCreated: parseInt(
            this.projectsCreatedOdometer.dataset.val ?? '0',
          ),
        }

        resolve({
          activeUsers:
            currentStats.activeUsers + Math.floor(Math.random() * 200),
          companiesManaged:
            currentStats.companiesManaged + Math.floor(Math.random() * 5),
          projectsCreated:
            currentStats.projectsCreated + Math.floor(Math.random() * 15),
        })
      }, 500)
    })
  }

  updateStats() {
    this.fetchMockStats().then((data) => {
      this.activeUsersOdometer.dataset.val = data.activeUsers.toString()
      this.companiesManagedOdometer.dataset.val =
        data.companiesManaged.toString()
      this.projectsCreatedOdometer.dataset.val = data.projectsCreated.toString()
      this.activeUsersOdometer.innerHTML = data.activeUsers.toString()
      this.companiesManagedOdometer.innerHTML = data.companiesManaged.toString()
      this.projectsCreatedOdometer.innerHTML = data.projectsCreated.toString()
    })
  }

  initialize() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.updateStats() // Handle initial and subsequent updates
            setInterval(() => this.updateStats(), 7000) // Update every 7 seconds

            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.5,
      },
    )

    observer.observe(this.statsSection)
  }
}

// About hero scroll animation
class ScrollInteractivity {
  constructor() {
    this.initialWidth = window.innerWidth
    this.handleScroll = this.handleScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.initialize()
  }

  handleScroll() {
    const textHeader = document.getElementById('about-text-header')
    if (!textHeader) return

    const scrollProgress =
      window.scrollY / (this.getOffsetTop(textHeader) + textHeader.offsetHeight)
    const clampedScrollProgress = Math.max(0, Math.min(scrollProgress, 1))
    document.documentElement.style.setProperty(
      '--scroll-progress',
      clampedScrollProgress.toString(),
    )
  }

  getOffsetTop(element) {
    let offsetTop = 0
    while (element) {
      offsetTop += element.offsetTop
      element = element.offsetParent
    }
    return offsetTop
  }

  initializeImages() {
    const images = document.querySelectorAll('.image-container')
    images.forEach((container) => {
      const initialTranslate = this.getInitialTranslate(container.className)
      container.style.setProperty(
        '--initial-translate',
        `${initialTranslate}px`,
      )
      container.style.setProperty(
        '--overshoot-translate',
        `${-1 * initialTranslate}px`,
      )
    })

    const maxTranslateY = this.calculateMaxTranslateY(images)
    const maxTranslateX = this.calculateMaxTranslateX(images)

    document.documentElement.style.setProperty(
      '--max-translate-x',
      `${maxTranslateX * -1}px`,
    )
    document.documentElement.style.setProperty(
      '--max-translate-y',
      `${maxTranslateY}px`,
    )
  }

  getInitialTranslate(className) {
    const viewportWidth = window.innerWidth
    const classes = className.split(' ')
    let translateValue = 0

    if (viewportWidth >= 1024) {
      // lg breakpoint
      classes.forEach((cls) => {
        if (cls.startsWith('lg:')) {
          translateValue = this.getTranslateValue(cls.replace('lg:', ''))
        }
      })
    } else if (viewportWidth >= 640) {
      // sm breakpoint
      classes.forEach((cls) => {
        if (cls.startsWith('sm:')) {
          translateValue = this.getTranslateValue(cls.replace('sm:', ''))
        }
      })
    } else {
      // default
      classes.forEach((cls) => {
        if (!cls.startsWith('sm:') && !cls.startsWith('lg:')) {
          translateValue = this.getTranslateValue(cls)
        }
      })
    }

    return translateValue
  }

  getTranslateValue(className) {
    if (className.includes('translate-y-32')) return 128
    if (className.includes('translate-y-20')) return 80
    if (className.includes('translate-y-16')) return 64
    if (className.includes('translate-y-10')) return 40
    if (className.includes('-translate-y-8')) return -32
    if (className.includes('-translate-y-5')) return -20
    if (className.includes('-translate-y-4')) return -16
    if (className.includes('-translate-y-2.5')) return -10
    if (className.includes('translate-y-8')) return 32
    if (className.includes('translate-y-5')) return 20
    if (className.includes('translate-y-4')) return 16
    if (className.includes('translate-y-2.5')) return 10
    return 0
  }

  calculateMaxTranslateY(images) {
    return Math.max(
      ...Array.from(images).map((imageContainer) =>
        this.getInitialTranslate(imageContainer.className),
      ),
    )
  }

  calculateMaxTranslateX(images) {
    const imagesWrapper = document.querySelector('.images-wrapper')
    if (!imagesWrapper) return 0

    const imagesWrapperRect = imagesWrapper.getBoundingClientRect()
    const totalWidth =
      Array.from(images).reduce((acc, container) => {
        return acc + container.getBoundingClientRect().width
      }, 0) +
      (images.length - 1) * parseFloat(getComputedStyle(imagesWrapper).gap)

    const viewportWidth = window.innerWidth
    return (totalWidth - viewportWidth) / 2 + imagesWrapperRect.x
  }

  handleResize() {
    const currentWidth = window.innerWidth
    if (currentWidth !== this.initialWidth) {
      this.initializeImages()
      this.initialWidth = currentWidth // Update initialWidth to the new width
    }
  }

  initialize() {
    const imagesWrapper = document.querySelector('.images-wrapper')
    if (!imagesWrapper) return

    document.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.initializeImages()
  }

  cleanup() {
    document.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}

// Splide slider
class SplideSlider {
  constructor(elementSelector = '.splide') {
    this.elementSelector = elementSelector
    this.splideElements = document.querySelectorAll(this.elementSelector)
    this.initialize()
  }

  initialize() {
    this.splideElements.forEach((splideElement) => {
      const splideType = splideElement.dataset.splideType
      switch (splideType) {
        case 'code-blocks':
          this.initializeCodeBlocksCarousel(splideElement)
          break
        case 'testimonials':
          this.initializeTestimonialsCarousel(splideElement)
          break
        default:
          console.warn(`Unknown Splide type: ${splideType}`)
      }
    })
  }

  initializeCodeBlocksCarousel(splideElement) {
    const features = document.querySelectorAll('.feature')
    const splideSlides = splideElement.querySelectorAll('.splide__slide')
    const splideContainer = splideElement.querySelector('.splide__slide > div')
    const splideTrack = splideElement.querySelector('.splide__track')

    const splideInstance = new Splide(splideElement, {
      speed: 800,
      pagination: false,
      arrows: false,
      drag: false,
      direction: 'ttb',
      height: splideContainer.clientHeight,
      autoHeight: true,
      perPage: 1,
      gap: '3rem',
      breakpoints: {
        640: {
          perPage: 1,
        },
      },
    }).mount()

    const clickListeners = Array.from(features).map((feature, index) => {
      const clickHandler = () => {
        splideInstance.go(index)
        const prevActive = document.querySelector('.feature.active')
        if (prevActive) prevActive.classList.remove('active')
        feature.classList.add('active')
      }

      feature.addEventListener('click', clickHandler)
      return clickHandler
    })

    splideSlides.forEach((slide) => {
      const slideElement = slide
      slideElement.style.height = slideElement.children[0].clientHeight + 'px'
    })

    splideInstance.on('mounted move', (newIndex, prevIndex) => {
      // Get current slide and previous slide
      const currentSlide = splideSlides[newIndex]
      const prevSlide = splideSlides[prevIndex]
      if (currentSlide)
        currentSlide.classList.remove('opacity-0', 'lg:opacity-15')
      if (prevSlide) prevSlide.classList.add('opacity-0', 'lg:opacity-15')

      // Set the height of the track to the current slide height
      splideTrack.style.height = currentSlide.clientHeight + 'px'
    })
  }

  initializeTestimonialsCarousel(splideElement) {
    const customPaginationDots = splideElement.querySelectorAll(
      'button[data-pagination]',
    )

    const splideInstance = new Splide(splideElement, {
      type: 'loop',
      speed: 700,
      perPage: 1,
      perMove: 1,
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 10000,
    }).mount()

    const clickListeners = Array.from(customPaginationDots).map(
      (dot, index) => {
        const clickHandler = () => {
          splideInstance.go(index)
        }
        dot.addEventListener('click', clickHandler)
        return clickHandler
      },
    )

    splideInstance.on('move', (newIndex) => {
      customPaginationDots.forEach((dot) => (dot.dataset.active = 'false'))
      customPaginationDots[newIndex].dataset.active = 'true'
    })

    // Set the initial active dot
    customPaginationDots[0].dataset.active = 'true'
  }
}

new CardHoverEffect()
new StatsCounter()
new ScrollInteractivity()
new SplideSlider()
