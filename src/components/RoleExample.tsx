import { useId, useState, type ReactNode } from 'react';

type RoleExampleProps = {
  children: ReactNode;
};

export function RoleExample({ children }: RoleExampleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="role-example">
      <button
        className="role-example__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? 'Thu gọn' : 'Xem'} ví dụ học tập
        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        id={panelId}
        className={`experience-expansion role-example__expansion ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div><p className="role-example__copy">{children}</p></div>
      </div>
    </div>
  );
}
