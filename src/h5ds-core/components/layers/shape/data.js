/* eslint-disable react/display-name */

import React from 'react';

const cdnHost = 'http://cdn.h5ds.cn';

export const shapes = [
  {
    type: 'line',
    name: '线条',
    img: cdnHost + '/static/images/line.png',
    dom: (style = {}) => (
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${style.width || 1} ${style.height || 1}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1={0}
          y1={0}
          x2={style.width || 1}
          y2={style.height || 1}
          style={{
            stroke: style.fill || '#000',
            strokeWidth: style.strokeWidth || 1
          }}
        />
      </svg>
    )
  },
  {
    type: 'star4',
    name: '四角星',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M523.93046471 1021.82852532L408.07239629 618.0485752 1.90635325 510.6743928l401.12873572-105.25321088 97.03444632-403.24970724L615.92760371 405.9514248l406.16604304 107.3741824-401.12873572 105.25321088-97.03444632 403.24970724z"
          fill={style.fill}
        />
      </svg>
    )
  },
  {
    type: 'star5',
    name: '五星',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1092 1024" version="1.1">
        <path
          fill={style.fill}
          d="M546.133333 819.2l-320.989866 168.7552 61.303466-357.444267L26.760533 377.378133l358.877867-52.155733L546.133333 0l160.494934 325.2224 358.877866 52.155733-259.6864 253.1328 61.303467 357.444267z"
        />
      </svg>
    )
  },
  {
    type: 'circle',
    name: '圆形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path3',
    name: '三角形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M583.475783 1024L1.458689 0H1166.951567z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path4',
    name: '四边形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="100" height="100" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path5',
    name: '五边形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M512.128 0l-512 391.04L195.648 1024h632.64l195.84-632.96z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path6', // ...
    name: '六边形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M768 64H256L0 512l256 448h512l256-448z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path7', // ...
    name: '平行四边形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M630.08 1024H0L393.6 0H1024z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path8', // ...
    name: '梯形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M1024 1024H0L256 0h512z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path9', // ...
    name: '菱形',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 512L512 0l512 512-512 512z" fill={style.fill} />
      </svg>
    )
  },
  {
    type: 'path10', // ...
    name: '管道',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1024 704V320c-176.736 0-320-143.264-320-320H320c0 176.736-143.264 320-320 320v384c176.736 0 320 143.264 320 320h384c0-176.736 143.264-320 320-320z"
          fill={style.fill}
        />
      </svg>
    )
  },
  {
    type: 'icon-qipao',
    name: '气泡',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1194 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M597.333333 920.618667c-40.106667 0-79.274667-2.816-117.205333-8.448-131.882667 46.677333-176.426667 63.957333-309.205333 111.146666 33.536-74.666667 45.653333-115.029333 76.373333-190.037333C97.706667 749.482667 0 613.546667 0 460.672 0 205.653333 267.392 0 597.333333 0s597.333333 205.653333 597.333334 460.672c0 254.293333-267.392 459.946667-597.333334 459.946667z"
          fill={style.fill}
        />
      </svg>
    )
  },
  {
    type: 'icon-heart',
    name: '心',
    dom: (style = {}) => (
      <svg preserveAspectRatio="none" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M755.072 64q-26.016 0-52 7.008t-48.992 19.008-44.512 28.992-39.488 36.992-32.512 42.016-25.504 44.992q-35.008-74.016-100.992-126.496t-142.016-52.512q-111.008 0-190.016 79.008t-79.008 190.016q0 62.016 16.992 116.512t48.512 98.496 70.496 84.512 88 83.008 95.488 84 99.008 97.504 93.504 115.008q39.008-58.016 90.016-114.496t97.504-99.008 96-85.504 88.992-84 72-84.992 50.016-97.504 17.504-113.504q0-111.008-79.008-190.016t-190.016-79.008z"
          fill={style.fill}
        />
      </svg>
    )
  }
];
