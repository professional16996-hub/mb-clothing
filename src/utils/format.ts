import { Currency } from '../types';

export function formatPrice(amountInUSD: number, currency: Currency): string {
  const converted = amountInUSD * currency.rate;
  
  if (currency.code === 'INR') {
    return `${currency.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  if (currency.code === 'AED') {
    return `${currency.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }
  if (currency.code === 'EUR') {
    return `${currency.symbol}${Math.round(converted).toLocaleString('de-DE')}`;
  }
  if (currency.code === 'GBP') {
    return `${currency.symbol}${Math.round(converted).toLocaleString('en-GB')}`;
  }
  return `${currency.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export const SIZE_CHART = [
  { size: 'XS', bustCm: '80-84', waistCm: '62-66', hipCm: '88-92', bustIn: '31.5-33', waistIn: '24.5-26', hipIn: '34.5-36', uk: '6', us: '2', fr: '34', it: '38' },
  { size: 'S', bustCm: '84-88', waistCm: '66-70', hipCm: '92-96', bustIn: '33-34.5', waistIn: '26-27.5', hipIn: '36-37.5', uk: '8', us: '4', fr: '36', it: '40' },
  { size: 'M', bustCm: '88-92', waistCm: '70-74', hipCm: '96-100', bustIn: '34.5-36', waistIn: '27.5-29', hipIn: '37.5-39.5', uk: '10', us: '6', fr: '38', it: '42' },
  { size: 'L', bustCm: '92-98', waistCm: '74-80', hipCm: '100-106', bustIn: '36-38.5', waistIn: '29-31.5', hipIn: '39.5-41.5', uk: '12', us: '8', fr: '40', it: '44' },
  { size: 'XL', bustCm: '98-104', waistCm: '80-86', hipCm: '106-112', bustIn: '38.5-41', waistIn: '31.5-34', hipIn: '41.5-44', uk: '14', us: '10', fr: '42', it: '46' },
];
