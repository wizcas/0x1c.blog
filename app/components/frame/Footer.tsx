const SYMBOL_CLASS = `inline-block text-hi-primary text-sm w-5 not-italic font-semibold text-right mr-2`;

export function Footer() {
  return (
    <footer className="bg-dark-900 min-h-hero">
      <div className="page-content py-4 flex flex-col items-center">
        <p>
          <i className={SYMBOL_CLASS}>&copy;</i>
          0x1C.dev
          <br />
          <i className={SYMBOL_CLASS}>by</i>
          Wizcas Chen
        </p>
      </div>
    </footer>
  );
}
