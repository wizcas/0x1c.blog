import classNames from 'classnames';

const SYMBOL_CLASS = `inline-block text-primary-400 text-sm w-5 not-italic font-semibold text-right mr-2`;

export function Footer() {
  return (
    <footer className="bg-gray-900 min-h-[100px]">
      <div className="page-content py-4 flex flex-col items-center">
        <p>
          <i className={SYMBOL_CLASS}>&copy;</i>
          0x1C.dev
          <i className={classNames(SYMBOL_CLASS, 'mx-2')}>by</i>
          <a href="mailto:chen@wizcas.is" className="!text-gray-200">
            Wizcas Chen
          </a>
        </p>
      </div>
    </footer>
  );
}
