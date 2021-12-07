import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

export type DateTimeFormat = 'full' | 'date' | 'time';
interface Props {
  value: string | number | Dayjs;
  format?: DateTimeFormat | string;
  className?: string;
}

const TEMPLATES: Record<string, string> = {
  date: 'MMM DD, YYYY',
  time: 'HH:mm',
};
TEMPLATES.full = `${TEMPLATES.date} ${TEMPLATES.time}`;

export default function DateTime({ value, format = 'date', className }: Props) {
  const valueString = useMemo(() => {
    const datetime = dayjs(value);
    const template = TEMPLATES[format] || format;
    return datetime.format(template);
  }, [value, format]);

  return (
    <span className={classNames('text-sm text-light-200', className)}>
      {valueString}
    </span>
  );
}
