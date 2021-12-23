import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { Clock } from 'react-feather';

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
  const datetime = useMemo(() => dayjs(value), [value]);
  const shortString = datetime.format(TEMPLATES[format] || format);
  const tipString = datetime.format(TEMPLATES.full);

  return (
    <Tippy
      content={
        <div className="flex items-center gap-2">
          <Clock size={16} />
          {tipString}
        </div>
      }
      theme="dark"
      arrow
    >
      <span className={classNames('text-sm text-gray-400', className)}>
        {shortString}
      </span>
    </Tippy>
  );
}
