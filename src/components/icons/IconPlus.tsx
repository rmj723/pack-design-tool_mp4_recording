const IconPlus = ({ className = '', opacity = '1' }) => (
  <svg className={ className } width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity={ opacity }>
      <path d="M0 6H12" stroke="white" stroke-width="2.5" />
      <path d="M6 12L6 0" stroke="white" stroke-width="2.5" />
    </g>
  </svg>
);

export default IconPlus;
