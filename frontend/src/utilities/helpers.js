import uuid from 'uuid/v4'

/**
* @description Recebe o timestamp e tranforma em uma data com formato legivel
* @param {number} timestamp
* @returns {string} Data formatada
*/
export function formatDate (timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
  }



  /**
* @description Gera um UUID 
* @returns {string} UUID gerado
*/
export function genUUID () {
    return uuid();
}