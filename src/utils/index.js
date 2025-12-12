// Funções utilitárias

/**
 * Formata uma data para o formato brasileiro
 * @param {Date|string} date - Data a ser formatada
 * @returns {string} Data formatada (dd/mm/yyyy)
 */
export function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR')
}

/**
 * Scroll suave para um elemento
 * @param {string} elementId - ID do elemento
 */
export function scrollToElement(elementId) {
  try {
    const element = document.getElementById(elementId)
    if (element) {
      // Calcular offset para header fixo
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + (window.scrollY || window.pageYOffset)
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Focus no elemento para acessibilidade
      element.setAttribute('tabindex', '-1')
      element.focus()
      element.addEventListener('blur', () => {
        element.removeAttribute('tabindex')
      }, { once: true })
    }
  } catch {
    // Fallback para navegadores antigos
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = 80
      window.scrollTo(0, element.offsetTop - headerHeight)
    }
  }
}

/**
 * Debounce function
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

