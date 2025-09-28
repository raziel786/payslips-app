import moment from 'moment';

export function formatDate(isoDate: string) {
  const date = moment(isoDate);
  return date.isValid() ? date.format('D MMM YYYY') : isoDate;
}

export function formatPeriod(fromIso: string, toIso: string) {
  const from = formatDate(fromIso);
  const to = formatDate(toIso);
  return `${from} – ${to}`;
}
