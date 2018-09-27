/**
* @description Recebe o timestamp e tranforma em um formato legivel para ser mostrado
* @param {number} timestamp
* @returns {string} Data formatada
*/
export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }