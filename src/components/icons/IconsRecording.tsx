import { useEffect, useState } from 'react';

export const StartRecordingIcon = ({ onClick }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={ onClick }>
    <circle cx="17" cy="17" r="17" fill="white" />
    <circle cx="16.9994" cy="17.0004" r="13.9184" fill="#F44336" stroke="black" strokeWidth="2" />
  </svg>
);

export const StopRecordingIcon = ({ onClick, paused }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={ onClick }>
    <circle cx="17" cy="17" r="17" fill="white" />
    <circle cx="16.8432" cy="16.8432" r="14.4184" fill="black" stroke="black" />
    <rect x="11.5469" y="11.5469" width="10.9057" height="10.9057" rx="1" fill={ paused ? 'white' : '#F44336' } />
  </svg>
);

export const PauseRecordingIcon = ({ activated, ...otherProps }) => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" { ...otherProps }>
    <g opacity={ activated ? '1' : '0.2' }>
      <rect y="0.5" width="5" height="17" rx="1" fill="white" />
      <rect x="9" y="0.5" width="5" height="17" rx="1" fill="white" />
    </g>
  </svg>
);

export const PlayRecordingIcon = ({ ...otherProps }) => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" { ...otherProps }>
    <path
      d="M16.5782 9.14344C17.2235 9.53219 17.2235 10.4678 16.5782 10.8566L2.26604 19.479C1.59955 19.8805 0.750001 19.4005 0.750001 18.6224L0.750002 1.3776C0.750002 0.599503 1.59955 0.119507 2.26604 0.521037L16.5782 9.14344Z"
      fill="white"
    />
  </svg>
);

export const TimerDotIcon = ({ activated, paused }) => {
  const [color, setColor] = useState('white');
  useEffect(() => {
    setColor(activated ? '#F44336' : 'white');
  }, [activated]);

  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      { !paused ? (
        <circle opacity={ activated ? '1' : '0.2' } cx="4.5" cy="5" r="4.5" fill={ color } />
      ) : (
        <circle cx="4.5" cy="5" r="4" stroke="#F44336" />
      ) }
    </svg>
  );
};
