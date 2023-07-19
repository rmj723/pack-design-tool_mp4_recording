/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import s from './ArrowTriple.module.scss';

interface ArrowTriple {
  onClick?: () => void
  direction?: 'right' | 'left'
  className?: string
}

export const ArrowTriple = ({
  direction = 'left', onClick = null, className = '', width = 55, height = 47,
}) => {
  if (direction === 'left') {
    return (
      <div className={ s.arrowTripleRoot }>
        <svg
          onClick={ onClick }
          className={ className }
          width={ width }
          height={ height }
          viewBox="0 0 55 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.88347 23.5032C9.88347 19.1786 11.4453 14.9997 14.2944 11.7305L23.6533 0.982752C23.8729 0.74014 23.8485 0.364092 23.5984 0.145741C23.3604 -0.060479 23.0005 -0.0483485 22.7809 0.176068L0.481914 22.3508C-0.158685 22.9877 -0.158685 24.0188 0.481914 24.6556L22.787 46.8303C23.0188 47.0608 23.3971 47.0608 23.6289 46.8303C23.8485 46.612 23.8607 46.2602 23.6594 46.0237L14.3005 35.276C11.4514 32.0068 9.88347 27.8278 9.88957 23.5032H9.88347Z"
            fill="#4A505E"
          />
          <path
            d="M24.8612 23.5032C24.8612 19.1786 26.4231 14.9997 29.2722 11.7305L38.6311 0.982752C38.8507 0.74014 38.8263 0.364092 38.5762 0.145741C38.3382 -0.060479 37.9783 -0.0483485 37.7586 0.176068L15.4536 22.3508C14.813 22.9877 14.813 24.0188 15.4536 24.6556L37.7586 46.8303C37.9905 47.0608 38.3687 47.0608 38.6006 46.8303C38.8202 46.612 38.8324 46.2602 38.6311 46.0237L29.2722 35.276C26.4231 32.0068 24.8551 27.8278 24.8612 23.5032Z"
            fill="#4A505E"
          />
          <path
            d="M41.0834 23.5032C41.0834 19.1786 42.6453 14.9997 45.4944 11.7305L54.8532 0.982752C55.0729 0.74014 55.0485 0.364092 54.7983 0.145741C54.5604 -0.060479 54.2004 -0.0483485 53.9808 0.176068L31.6758 22.3508C31.0352 22.9877 31.0352 24.0188 31.6758 24.6556L53.9808 46.8303C54.2126 47.0608 54.5909 47.0608 54.8227 46.8303C55.0424 46.612 55.0546 46.2602 54.8532 46.0237L45.4944 35.276C42.6453 32.0068 41.0773 27.8278 41.0834 23.5032Z"
            fill="#4A505E"
          />
        </svg>

      </div>
    );
  }

  return (
    <div className={ s.arrowTripleRoot }>
      <svg
        onClick={ onClick }
        className={ className }
        width={ width }
        height={ height }
        viewBox="0 0 55 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45.1165 23.4968C45.1165 27.8214 43.5547 32.0003 40.7056 35.2695L31.3467 46.0172C31.1271 46.2599 31.1515 46.6359 31.4016 46.8543C31.6396 47.0605 31.9995 47.0483 32.2191 46.8239L54.5181 24.6492C55.1587 24.0123 55.1587 22.9812 54.5181 22.3444L32.213 0.169649C31.9812 -0.0608312 31.6029 -0.0608312 31.3711 0.169649C31.1515 0.388002 31.1393 0.73979 31.3406 0.976335L40.6995 11.724C43.5486 14.9932 45.1165 19.1722 45.1104 23.4968L45.1165 23.4968Z"
          fill="#4A505E"
        />
        <path
          d="M30.1388 23.4968C30.1388 27.8214 28.5769 32.0003 25.7278 35.2695L16.3689 46.0172C16.1493 46.2599 16.1737 46.6359 16.4238 46.8543C16.6618 47.0605 17.0217 47.0483 17.2414 46.8239L39.5464 24.6492C40.187 24.0123 40.187 22.9812 39.5464 22.3444L17.2414 0.169649C17.0095 -0.0608312 16.6313 -0.0608312 16.3994 0.169649C16.1798 0.388002 16.1676 0.73979 16.3689 0.976335L25.7278 11.724C28.5769 14.9932 30.1449 19.1722 30.1388 23.4968Z"
          fill="#4A505E"
        />
        <path
          d="M13.9166 23.4968C13.9166 27.8214 12.3547 32.0003 9.5056 35.2695L0.146753 46.0172C-0.0728816 46.2599 -0.0484752 46.6359 0.201664 46.8543C0.4396 47.0605 0.799555 47.0483 1.01919 46.8239L23.3242 24.6492C23.9648 24.0123 23.9648 22.9812 23.3242 22.3444L1.01919 0.169649C0.787356 -0.0608312 0.4091 -0.0608312 0.177264 0.169649C-0.0423696 0.388002 -0.0545747 0.73979 0.146757 0.976335L9.5056 11.724C12.3547 14.9932 13.9227 19.1722 13.9166 23.4968Z"
          fill="#4A505E"
        />
      </svg>
    </div>
  );
};