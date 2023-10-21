
export const getStateStyle = (pqrsState: string) => {
    let text = '';
    let backgroundColor = '';
    let backgroundPoint ='';
  
    switch (pqrsState) {
      case 'Pendiente':
        text = 'text-red-800  '; // Change to your desired color
        backgroundColor = 'bg-red-200'; // Change to your desired color
        backgroundPoint = 'bg-red-800 animate-pulse ';
        break;
      case 'Proceso':
        text = 'text-yellow-800 '; // Change to your desired color
        backgroundColor = 'bg-yellow-200'; // Change to your desired color
        backgroundPoint = 'bg-yellow-800 animate-pulse';
        break;
      case 'Finalizado':
        text = 'text-green-800 '; // Change to your desired color
        backgroundColor = 'bg-green-200'; // Change to your desired color
        backgroundPoint = 'bg-green-800 animate-pulsee';
        break;
      default:
        text = 'text-gray-700';
        backgroundColor = 'bg-gray-200';
        backgroundPoint = 'bg-gray-800 ';
    }
    return { text, backgroundColor, backgroundPoint };
  };
