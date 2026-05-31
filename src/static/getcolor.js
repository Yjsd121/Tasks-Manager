export function getcolor(valor) {
  if (valor === 'high') {
    return {
      bgTitle: '#f34a4a',
      bgcard: '#ffeaea',
      shadow: 'rgba(243, 74, 74, 0.5)'
    }
  } else if (valor === 'medium') {
    return {
      bgTitle: '#eebe22fa',
      bgcard: '#fcf6e2fa',
      shadow: 'rgba(238, 190, 34, 0.5)'
    }
  } else {
    return {
      bgTitle: '#48c528fa',
      bgcard: '#e8ffe2fa',
      shadow: 'rgba(71, 219, 34, 0.5)'
    }
  }
}
