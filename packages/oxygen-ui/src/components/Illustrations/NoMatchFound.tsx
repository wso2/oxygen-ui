/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import type { JSX, SVGProps } from 'react'
import { useId } from 'react'
import useIllustrationColors from '../../hooks/useIllustrationColors/useIllustrationColors'

export interface NoMatchFoundIllustrationProps extends SVGProps<SVGSVGElement> {}

export default function NoMatchFoundIllustration({
  width = 518,
  height = 379,
  ...rest
}: NoMatchFoundIllustrationProps): JSX.Element {
  const {
    accentAlert,
    accentAlertLight,
    accentGold,
    accentGoldLight,
    accentCool,
    accentCoolLight,
    steelDark,
    steelLight,
    ink,
    inkStrong,
    paper,
    skinLight,
    skinDark,
  } = useIllustrationColors()

  const id = useId()

  const ids = {
    clip0: `${id}-clip0`,
    paint0: `${id}-paint0`,
    paint1: `${id}-paint1`,
    paint2: `${id}-paint2`,
    paint3: `${id}-paint3`,
    paint4: `${id}-paint4`,
    paint5: `${id}-paint5`,
    paint6: `${id}-paint6`,
    paint7: `${id}-paint7`,
    paint8: `${id}-paint8`,
    paint9: `${id}-paint9`,
    paint10: `${id}-paint10`,
    paint11: `${id}-paint11`,
    paint12: `${id}-paint12`,
    paint13: `${id}-paint13`,
    paint14: `${id}-paint14`,
    paint15: `${id}-paint15`,
    paint16: `${id}-paint16`,
    paint17: `${id}-paint17`,
    paint18: `${id}-paint18`,
    paint19: `${id}-paint19`,
    paint20: `${id}-paint20`,
    paint21: `${id}-paint21`,
    paint22: `${id}-paint22`,
    paint23: `${id}-paint23`,
    paint24: `${id}-paint24`,
    paint25: `${id}-paint25`,
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 518 379"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...rest}
    >
      <g clipPath={`url(#${ids.clip0})`}>
        <path
          d="M517.999 379H0C5.67598 364.529 16.1579 352.253 30.9339 348.611C52.5493 343.291 75.4239 357.919 96.9898 352.419C109.243 349.298 118.889 340.2 129.026 332.645C167.266 304.141 219.671 295.717 264.922 310.804C288.575 318.686 310.129 332.471 334.359 338.334C365.691 345.915 398.457 339.625 430.676 338.591C462.058 337.582 507.019 350.364 517.999 379Z"
          fill={`url(#${ids.paint0})`}
          fillOpacity="0.1"
        />
        <path
          d="M341.488 232.086H161.671V0H303.219L341.488 40.4323V232.086Z"
          fill={`url(#${ids.paint1})`}
          fillOpacity="0.16"
        />
        <path
          d="M303.219 0V40.4323H341.488L303.219 0Z"
          fill={`url(#${ids.paint2})`}
          fillOpacity="0.1"
        />
        <path
          d="M483.027 198.748H365.863V47.527H458.092L483.027 73.872V198.748Z"
          fill={`url(#${ids.paint3})`}
          fillOpacity="0.1"
        />
        <path
          d="M458.092 47.527V73.872H483.027L458.092 47.527Z"
          fill={`url(#${ids.paint4})`}
          fillOpacity="0.16"
        />
        <path
          d="M137.296 198.748H20.1313V47.527H112.361L137.296 73.872V198.748Z"
          fill={`url(#${ids.paint5})`}
          fillOpacity="0.1"
        />
        <path
          d="M112.361 47.527V73.872H137.296L112.361 47.527Z"
          fill={`url(#${ids.paint6})`}
          fillOpacity="0.16"
        />
        <path
          d="M147.434 173.41C146.72 173.409 146.019 173.22 145.402 172.863C144.784 172.506 144.271 171.992 143.914 171.375C143.557 170.757 143.369 170.056 143.368 169.343C143.368 168.629 143.554 167.928 143.91 167.309L161.551 136.665C161.814 136.196 162.168 135.784 162.592 135.452C163.016 135.12 163.502 134.876 164.021 134.733C164.54 134.591 165.082 134.552 165.616 134.62C166.15 134.688 166.665 134.862 167.131 135.13C167.598 135.399 168.006 135.757 168.334 136.184C168.661 136.612 168.9 137.1 169.037 137.62C169.174 138.14 169.207 138.683 169.133 139.216C169.059 139.749 168.88 140.262 168.607 140.725L150.965 171.37C150.608 171.99 150.094 172.506 149.474 172.864C148.854 173.222 148.15 173.411 147.434 173.41Z"
          fill={`url(#${ids.paint7})`}
        />
        <path
          d="M174.735 142.593C174.085 142.593 173.43 142.565 172.769 142.509C166.718 141.993 161.119 139.094 157.206 134.451C153.292 129.808 151.383 123.801 151.9 117.751C152.416 111.701 155.316 106.104 159.96 102.191C164.604 98.2781 170.613 96.3701 176.665 96.8865C182.546 97.3889 188.007 100.143 191.907 104.573C195.807 109.003 197.845 114.768 197.595 120.664C197.346 126.561 194.829 132.133 190.57 136.219C186.31 140.305 180.637 142.588 174.734 142.593H174.735ZM174.708 104.941C170.845 104.936 167.133 106.444 164.369 109.141C161.604 111.839 160.007 115.512 159.918 119.373C159.83 123.234 161.258 126.976 163.896 129.797C166.535 132.618 170.173 134.294 174.033 134.465C177.892 134.636 181.665 133.289 184.543 130.713C187.42 128.136 189.174 124.535 189.428 120.681C189.682 116.828 188.416 113.028 185.901 110.096C183.386 107.164 179.823 105.334 175.974 104.998C175.55 104.959 175.127 104.941 174.708 104.941Z"
          fill={`url(#${ids.paint8})`}
        />
        <path
          d="M117.943 371.865L106.23 370.472C106.757 366.04 107.354 360.716 107.394 359.842C107.394 359.899 107.394 359.945 107.394 359.98H119.19C119.187 360.332 119.187 361.408 117.943 371.865Z"
          fill={skinDark}
        />
        <path
          d="M70.9427 373.272L59.147 373.234C59.147 373.234 59.1857 361.057 59.1857 359.978H70.9814C70.982 361.06 70.9427 373.272 70.9427 373.272Z"
          fill={skinDark}
        />
        <path
          d="M122.295 367.785C121.319 343.071 121.26 317.115 120.954 292.336C116.895 265.61 114.765 236.297 109.757 209.759L109.607 209.803L109.168 206.81L66.4356 204.176C66.4356 204.176 65.3212 225.109 64.9325 232.085C62.8497 269.478 58.6229 329.581 56.1071 367.471L76.8158 369.22C80.5146 331.955 86.5456 272.59 89.8877 235.861C93.5556 254.576 97.0145 275.651 100.271 294.588C100.983 318.779 101.58 343.988 101.515 368.14L122.295 367.785Z"
          fill={inkStrong}
        />
        <path
          d="M85.2818 377.834C85.8938 377.831 86.4797 377.585 86.9105 377.15C87.3413 376.716 87.5818 376.128 87.5791 375.516C87.5791 375.46 87.5791 375.404 87.5718 375.348C87.5376 374.909 87.3788 374.49 87.1142 374.139C86.8496 373.788 86.4902 373.52 86.0783 373.366L72.347 368.769C72.081 368.681 71.7991 368.651 71.5207 368.682C71.2423 368.714 70.9739 368.804 70.7338 368.949C68.8462 370.258 66.5884 370.927 64.2922 370.858C62.5037 370.731 60.787 370.104 59.338 369.048C59.2106 368.944 59.0562 368.878 58.8927 368.858C58.7293 368.838 58.5635 368.865 58.4148 368.935C58.266 369.006 58.1404 369.117 58.0526 369.257C57.9647 369.396 57.9183 369.557 57.9186 369.722V376.434C57.9186 376.832 58.0771 377.215 58.3592 377.497C58.6413 377.779 59.0239 377.937 59.4228 377.937H59.4284L85.2818 377.834Z"
          fill={`url(#${ids.paint9})`}
        />
        <path
          d="M132.315 377.834C132.927 377.831 133.513 377.585 133.943 377.151C134.374 376.716 134.615 376.128 134.612 375.517C134.612 375.461 134.609 375.404 134.605 375.348C134.57 374.91 134.412 374.491 134.147 374.14C133.883 373.788 133.523 373.52 133.112 373.366L119.382 368.77C119.116 368.682 118.834 368.652 118.556 368.683C118.277 368.714 118.009 368.805 117.769 368.949C115.881 370.258 113.623 370.928 111.327 370.859C109.539 370.732 107.822 370.104 106.372 369.049C106.245 368.944 106.091 368.878 105.927 368.858C105.764 368.839 105.598 368.865 105.449 368.936C105.3 369.007 105.175 369.118 105.087 369.257C104.999 369.397 104.953 369.558 104.953 369.722V376.434C104.953 376.833 105.111 377.216 105.394 377.498C105.676 377.78 106.058 377.938 106.457 377.938H106.463L132.315 377.834Z"
          fill={`url(#${ids.paint10})`}
        />
        <path
          d="M80.2815 146.597C80.2815 146.597 84.6246 144.295 83.6551 132.471L92.6288 130.807C92.6288 130.807 91.6177 141.409 96.1602 144.774L80.2815 146.597Z"
          fill={skinDark}
        />
        <path
          d="M78.5633 127.886C79.1845 131.473 81.1426 134.87 84.3078 136.028C88.0655 137.404 90.8487 137.497 95.1811 137.497C101.093 137.497 100.898 131.333 101.064 125.121C101.232 118.888 100.734 112.195 98.3974 110.022C93.7353 105.684 80.045 108.431 78.3801 115.686C77.5202 119.439 77.9695 124.471 78.5633 127.886Z"
          fill={skinDark}
        />
        <path
          d="M104.716 109.953C103.727 106.327 100.645 104.556 95.5479 105.888C91.9227 106.836 91.4638 105.984 88.3936 104.506C86.6354 103.66 80.8668 104.046 79.4395 107.95C77.9094 112.131 73.176 108.745 72.7362 115.557C72.3683 121.258 74.296 129.408 78.1695 133.994C79.5108 135.582 81.6987 137.485 83.3933 137.956C85.0576 138.418 92.253 138.012 92.9523 137.6C96.3882 135.56 96.0355 126.205 95.4906 120.205C95.4013 119.217 95.5827 117.577 98.1171 117.577C99.8584 117.577 100.823 117.535 101.722 116.887C101.724 116.887 105.706 113.579 104.716 109.953Z"
          fill={inkStrong}
        />
        <path
          d="M98.8939 126.299C98.9625 127.208 98.6687 128.107 98.0766 128.8C97.4846 129.492 96.6424 129.923 95.734 129.997C94.8256 130.071 93.9247 129.783 93.2281 129.195C92.5315 128.608 92.0957 127.769 92.0159 126.861C91.972 126.417 92.0159 125.97 92.1451 125.543C92.2742 125.117 92.4862 124.72 92.7688 124.375C93.0514 124.031 93.3991 123.745 93.7921 123.535C94.1851 123.325 94.6157 123.194 95.0592 123.151C95.0974 123.147 95.135 123.143 95.1715 123.141C97.6323 123.063 98.7383 124.401 98.8939 126.299Z"
          fill={skinDark}
        />
        <path
          d="M147.783 165.004C147.783 165.004 157.249 160.595 158.736 159.404C163.974 155.211 163.864 152.084 163.155 150.763C162.321 149.201 152.497 154.357 152.497 154.357C152.497 154.357 154.401 151.718 153.374 150.993C152.951 150.696 152.371 150.972 150.671 152.669C148.734 154.605 145.415 157.32 145.415 157.32L147.783 165.004Z"
          fill={skinDark}
        />
        <path
          d="M66.9619 177.046C67.5044 179.221 67.8008 181.451 67.8455 183.693C67.8455 195.486 62.5094 200.774 62.9025 206.829C63.5204 216.345 109.765 214.096 112.121 208.691C114.547 203.117 109.623 199.683 109.839 181.451C109.862 179.466 110.015 177.391 110.226 175.277L119.326 191.562C119.802 192.415 120.476 193.141 121.29 193.68C122.105 194.219 123.036 194.556 124.007 194.662C124.979 194.768 125.961 194.64 126.872 194.288C127.784 193.937 128.598 193.373 129.247 192.643L154.458 163.161L144.992 156.507L125.816 178.075L110.819 151.233C109.399 146.992 106.166 144.152 99.572 143.869C97.3168 143.773 86.3125 143.757 78.2555 143.757C72.8429 143.757 68.3993 145.418 65.8329 147.983L65.7942 148.021C64.8532 148.978 64.1278 150.126 63.6665 151.387C63.2051 152.647 63.0186 153.992 63.1194 155.33C63.3693 159.135 64.2023 166.687 66.9619 177.046Z"
          fill={`url(#${ids.paint11})`}
        />

        <path
          d="M233.414 65.4469L228.666 60.6998L197.858 91.4995L202.607 96.2466L233.414 65.4469Z"
          fill={paper}
        />
        <path
          d="M228.666 96.2466L233.414 91.4995L202.607 60.6998L197.858 65.4469L228.666 96.2466Z"
          fill={paper}
        />
        <path
          d="M305.301 65.4466L300.552 60.6995L269.745 91.4992L274.493 96.2463L305.301 65.4466Z"
          fill={paper}
        />
        <path
          d="M300.552 96.2469L305.301 91.4998L274.493 60.7001L269.745 65.4472L300.552 96.2469Z"
          fill={paper}
        />
        <path
          d="M220.415 148.882L215.453 144.321C215.997 143.728 229.046 129.793 253.545 129.793C278.187 129.793 289.684 143.9 290.161 144.501L284.884 148.693C284.491 148.209 274.78 136.531 253.545 136.531C232.14 136.532 220.53 148.757 220.415 148.882Z"
          fill={paper}
        />

        <path
          d="M420.146 248.93L414.357 250.298L421.614 280.987L427.403 279.618L420.146 248.93Z"
          fill={paper}
        />
        <path
          d="M426.515 246.55L421.544 273.486L424.758 274.079L429.729 247.142L426.515 246.55Z"
          fill={`url(#${ids.paint12})`}
        />
        <path
          d="M426.517 246.541L425.952 249.513L429.162 250.123L429.728 247.152L426.517 246.541Z"
          fill={`url(#${ids.paint13})`}
          fillOpacity="0.16"
        />
        <path
          d="M416.565 253.391L414.78 254.094L425.195 280.523L426.979 279.82L416.565 253.391Z"
          fill={accentCool}
        />
        <path d="M429.982 264.96H414.284V285.019H429.982V264.96Z" fill={`url(#${ids.paint14})`} />

        <path d="M372.378 321.251H366.506V378.999H372.378V321.251Z" fill={`url(#${ids.paint15})`} />
        <path
          d="M367.545 321.251H361.673V378.999H367.545V321.251Z"
          fill={`url(#${ids.paint16})`}
          fillOpacity="0.16"
        />
        <path d="M445.514 321.251H439.642V378.999H445.514V321.251Z" fill={`url(#${ids.paint17})`} />
        <path
          d="M440.682 321.251H434.81V378.999H440.682V321.251Z"
          fill={`url(#${ids.paint18})`}
          fillOpacity="0.16"
        />
        <path d="M388.482 321.251H382.611V378.999H388.482V321.251Z" fill={`url(#${ids.paint19})`} />
        <path
          d="M383.65 321.251H377.778V378.999H383.65V321.251Z"
          fill={`url(#${ids.paint20})`}
          fillOpacity="0.16"
        />
        <path d="M461.618 321.251H455.747V378.999H461.618V321.251Z" fill={`url(#${ids.paint21})`} />
        <path
          d="M456.786 321.251H450.915V378.999H456.786V321.251Z"
          fill={`url(#${ids.paint22})`}
          fillOpacity="0.16"
        />
        <path d="M461.619 284.286H382.647V322.636H461.619V284.286Z" fill={`url(#${ids.paint23})`} />
        <path
          d="M440.645 284.286H361.673V322.636H440.645V284.286Z"
          fill={`url(#${ids.paint24})`}
          fillOpacity="0.16"
        />

        <g opacity="0.53">
          <path
            d="M436.397 289.738H365.922V317.014H436.397V289.738Z"
            fill={`url(#${ids.paint25})`}
            fillOpacity="0.1"
          />
        </g>

        <path
          d="M401.159 306.505C402.888 306.505 404.289 305.105 404.289 303.376C404.289 301.648 402.888 300.247 401.159 300.247C399.431 300.247 398.029 301.648 398.029 303.376C398.029 305.105 399.431 306.505 401.159 306.505Z"
          fill={paper}
        />
      </g>

      <defs>
        <linearGradient
          id={ids.paint0}
          x1="259"
          y1="303.426"
          x2="259"
          y2="379"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint1}
          x1="251.579"
          y1="0"
          x2="251.579"
          y2="232.086"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint2}
          x1="322.353"
          y1="0"
          x2="322.353"
          y2="40.4323"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint3}
          x1="424.445"
          y1="47.527"
          x2="424.445"
          y2="198.748"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint4}
          x1="470.559"
          y1="47.527"
          x2="470.559"
          y2="73.872"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint5}
          x1="78.7135"
          y1="47.527"
          x2="78.7135"
          y2="198.748"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint6}
          x1="124.828"
          y1="47.527"
          x2="124.828"
          y2="73.872"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint7}
          x1="156.27"
          y1="134.588"
          x2="156.27"
          y2="173.41"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={steelDark} />
          <stop offset="1" stopColor={steelLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint8}
          x1="174.716"
          y1="96.8035"
          x2="174.716"
          y2="142.593"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={steelDark} />
          <stop offset="1" stopColor={steelLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint9}
          x1="72.7489"
          y1="368.671"
          x2="72.7489"
          y2="377.937"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint10}
          x1="119.782"
          y1="368.671"
          x2="119.782"
          y2="377.938"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint11}
          x1="108.67"
          y1="143.757"
          x2="108.67"
          y2="213.356"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint12}
          x1="424.03"
          y1="260.018"
          x2="427.243"
          y2="260.611"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint13}
          x1="426.235"
          y1="248.027"
          x2="429.445"
          y2="248.638"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint14}
          x1="422.133"
          y1="264.96"
          x2="422.133"
          y2="285.019"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint15}
          x1="369.442"
          y1="321.251"
          x2="369.442"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint16}
          x1="364.609"
          y1="321.251"
          x2="364.609"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint17}
          x1="442.578"
          y1="321.251"
          x2="442.578"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint18}
          x1="437.746"
          y1="321.251"
          x2="437.746"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint19}
          x1="385.546"
          y1="321.251"
          x2="385.546"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint20}
          x1="380.714"
          y1="321.251"
          x2="380.714"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint21}
          x1="458.683"
          y1="321.251"
          x2="458.683"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint22}
          x1="453.85"
          y1="321.251"
          x2="453.85"
          y2="378.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint23}
          x1="422.133"
          y1="284.286"
          x2="422.133"
          y2="322.636"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentGold} />
          <stop offset="1" stopColor={accentGoldLight} />
        </linearGradient>

        <linearGradient
          id={ids.paint24}
          x1="401.159"
          y1="284.286"
          x2="401.159"
          y2="322.636"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <linearGradient
          id={ids.paint25}
          x1="401.159"
          y1="289.738"
          x2="401.159"
          y2="317.014"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={accentAlertLight} />
          <stop offset="1" stopColor={accentAlert} />
        </linearGradient>

        <clipPath id={ids.clip0}>
          <rect width="518" height="379" fill={paper} />
        </clipPath>
      </defs>
    </svg>
  )
}
