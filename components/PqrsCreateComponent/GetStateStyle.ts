
const GetStateStyle = (pqrsState: string) => {
    let color = '';
    let backgroundColor = '';
  
    switch (pqrsState) {
      case 'Pendiente':
        color = 'text-red-800'; // Change to your desired color
        backgroundColor = 'bg-red-200'; // Change to your desired color
        break;
      case 'Proceso':
        color = 'text-yellow-800'; // Change to your desired color
        backgroundColor = 'bg-yellow-200'; // Change to your desired color
        break;
      case 'Finalizado':
        color = 'text-green-800'; // Change to your desired color
        backgroundColor = 'bg-green-200'; // Change to your desired color
        break;
      default:
        color = 'text-gray-700';
        backgroundColor = 'bg-gray-200';
    }
    return `${color} ${backgroundColor} p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50`;
  };
  
export {GetStateStyle}