import { format, parseISO } from 'date-fns';

const formatDate = (dateString: string, formatString: string = 'dd MMM yyyy'): string => {
  try {
    const date = parseISO(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};
export default formatDate;
