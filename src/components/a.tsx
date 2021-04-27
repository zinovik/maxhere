import React from 'react';

interface AProps {
  href?: string;
  text?: string;
  className?: string;
  id?: string;
  isNewTab?: boolean;
}

const A: React.FC<AProps> = ({ href, text, className, id, isNewTab = true }) =>
  href ? (
    <a
      href={href}
      target={isNewTab ? '_blank' : '_self'}
      className={className}
      id={id}
    >
      {text}
    </a>
  ) : (
    <a className="anchor" id={id} />
  );

export default A;
