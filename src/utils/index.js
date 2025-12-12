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
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
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

