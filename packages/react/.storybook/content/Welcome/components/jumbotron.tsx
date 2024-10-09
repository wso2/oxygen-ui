/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {FC, ReactElement} from 'react';
import pkg from '../../../../package.json';
import meta from '../../../meta.json';

export type JumbotronProps = {};

const DarkLogo = () => (
  <svg width="358" height="52" viewBox="0 0 358 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.9369 25.4635L39.0476 25.4786L35.6126 31.141L27.0422 12L19.3318 27.7238L8 27.7016C8.04562 28.5677 8.16015 29.4169 8.33583 30.2456L21.1254 30.2705L26.9258 18.4432L35.2351 37L40.6831 28.019L45.9534 28.0075C45.9806 27.6198 46 27.2294 46 26.8355C45.999 26.3731 45.9748 25.9169 45.9369 25.4635Z" fill="#FF7300"/>
    <path d="M26.88 48.384C23.5093 48.384 20.3733 47.8293 17.472 46.72C14.6133 45.568 12.1173 43.968 9.984 41.92C7.89333 39.8293 6.25067 37.4187 5.056 34.688C3.904 31.9147 3.328 28.8853 3.328 25.6C3.328 22.3147 3.904 19.3067 5.056 16.576C6.25067 13.8027 7.89333 11.392 9.984 9.344C12.1173 7.25333 14.6133 5.65333 17.472 4.544C20.3307 3.392 23.4667 2.816 26.88 2.816C30.2507 2.816 33.3653 3.392 36.224 4.544C39.0827 5.65333 41.5573 7.232 43.648 9.28C45.7813 11.328 47.424 13.7387 48.576 16.512C49.7707 19.2853 50.368 22.3147 50.368 25.6C50.368 28.8853 49.7707 31.9147 48.576 34.688C47.424 37.4613 45.7813 39.872 43.648 41.92C41.5573 43.968 39.0827 45.568 36.224 46.72C33.3653 47.8293 30.2507 48.384 26.88 48.384ZM26.88 44.16C29.568 44.16 32.0427 43.712 34.304 42.816C36.608 41.8773 38.592 40.576 40.256 38.912C41.9627 37.2053 43.2853 35.2427 44.224 33.024C45.1627 30.7627 45.632 28.288 45.632 25.6C45.632 22.912 45.1627 20.4587 44.224 18.24C43.2853 15.9787 41.9627 14.016 40.256 12.352C38.592 10.6453 36.608 9.344 34.304 8.448C32.0427 7.50933 29.568 7.04 26.88 7.04C24.192 7.04 21.696 7.50933 19.392 8.448C17.088 9.344 15.0827 10.6453 13.376 12.352C11.712 14.016 10.3893 15.9787 9.408 18.24C8.46933 20.4587 8 22.912 8 25.6C8 28.2453 8.46933 30.6987 9.408 32.96C10.3893 35.2213 11.712 37.2053 13.376 38.912C15.0827 40.576 17.088 41.8773 19.392 42.816C21.696 43.712 24.192 44.16 26.88 44.16ZM53.1505 48L71.5185 23.168V26.816L54.2385 3.2H59.6785L74.2065 22.912L72.0945 22.976L86.6225 3.2H91.7425L74.6545 26.496V23.168L92.9585 48H87.4545L71.9665 26.944H73.9505L58.5905 48H53.1505ZM110.109 48V31.36L111.197 34.304L92.189 3.2H97.245L113.949 30.528H111.261L127.965 3.2H132.701L113.693 34.304L114.781 31.36V48H110.109ZM157.757 48.384C154.343 48.384 151.186 47.8293 148.285 46.72C145.426 45.568 142.93 43.968 140.797 41.92C138.706 39.872 137.063 37.4613 135.869 34.688C134.717 31.9147 134.141 28.8853 134.141 25.6C134.141 22.3147 134.717 19.2853 135.869 16.512C137.063 13.7387 138.727 11.328 140.861 9.28C142.994 7.232 145.49 5.65333 148.349 4.544C151.25 3.392 154.407 2.816 157.821 2.816C161.234 2.816 164.349 3.34933 167.165 4.416C170.023 5.48266 172.455 7.104 174.461 9.28L171.517 12.288C169.639 10.4107 167.57 9.06666 165.309 8.256C163.047 7.44533 160.615 7.04 158.013 7.04C155.239 7.04 152.679 7.50933 150.333 8.448C148.029 9.344 146.002 10.6453 144.253 12.352C142.546 14.016 141.202 15.9787 140.22 18.24C139.282 20.4587 138.812 22.912 138.812 25.6C138.812 28.2453 139.282 30.6987 140.22 32.96C141.202 35.2213 142.546 37.2053 144.253 38.912C146.002 40.576 148.029 41.8773 150.333 42.816C152.679 43.712 155.218 44.16 157.949 44.16C160.509 44.16 162.919 43.776 165.181 43.008C167.485 42.24 169.597 40.9387 171.517 39.104L174.205 42.688C172.071 44.5653 169.575 45.9947 166.717 46.976C163.858 47.9147 160.871 48.384 157.757 48.384ZM169.661 42.112V25.6H174.205V42.688L169.661 42.112ZM191.833 23.232H215.513V27.264H191.833V23.232ZM192.345 43.904H219.289V48H187.609V3.2H218.329V7.296H192.345V43.904ZM230.421 48V3.2H234.325L265.237 42.112H263.189V3.2H267.861V48H263.957L233.109 9.088H235.157V48H230.421ZM317.282 48.384C311.564 48.384 307.063 46.7413 303.778 43.456C300.492 40.1707 298.85 35.3067 298.85 28.864V3.2H303.586V28.672C303.586 33.9627 304.78 37.8667 307.17 40.384C309.559 42.9013 312.93 44.16 317.282 44.16C321.676 44.16 325.068 42.9013 327.458 40.384C329.847 37.8667 331.042 33.9627 331.042 28.672V3.2H335.65V28.864C335.65 35.3067 334.007 40.1707 330.722 43.456C327.479 46.7413 322.999 48.384 317.282 48.384ZM349.921 48V3.2H354.657V48H349.921Z" fill="white"/>
  </svg>
);

const LightLogo = () => (
  <svg width="358" height="52" viewBox="0 0 358 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_218_80)">
      <path d="M45.9369 25.4635L39.0476 25.4786L35.6126 31.141L27.0422 12L19.3318 27.7238L8 27.7016C8.04562 28.5677 8.16015 29.4169 8.33583 30.2456L21.1254 30.2705L26.9258 18.4432L35.2351 37L40.6831 28.019L45.9534 28.0075C45.9806 27.6198 46 27.2294 46 26.8355C45.999 26.3731 45.9748 25.9169 45.9369 25.4635Z" fill="#FF7300" />
      <path d="M26.88 48.384C23.5093 48.384 20.3733 47.8293 17.472 46.72C14.6133 45.568 12.1173 43.968 9.984 41.92C7.89333 39.8293 6.25067 37.4187 5.056 34.688C3.904 31.9147 3.328 28.8853 3.328 25.6C3.328 22.3147 3.904 19.3067 5.056 16.576C6.25067 13.8027 7.89333 11.392 9.984 9.344C12.1173 7.25333 14.6133 5.65333 17.472 4.544C20.3307 3.392 23.4667 2.816 26.88 2.816C30.2507 2.816 33.3653 3.392 36.224 4.544C39.0827 5.65333 41.5573 7.232 43.648 9.28C45.7813 11.328 47.424 13.7387 48.576 16.512C49.7707 19.2853 50.368 22.3147 50.368 25.6C50.368 28.8853 49.7707 31.9147 48.576 34.688C47.424 37.4613 45.7813 39.872 43.648 41.92C41.5573 43.968 39.0827 45.568 36.224 46.72C33.3653 47.8293 30.2507 48.384 26.88 48.384ZM26.88 44.16C29.568 44.16 32.0427 43.712 34.304 42.816C36.608 41.8773 38.592 40.576 40.256 38.912C41.9627 37.2053 43.2853 35.2427 44.224 33.024C45.1627 30.7627 45.632 28.288 45.632 25.6C45.632 22.912 45.1627 20.4587 44.224 18.24C43.2853 15.9787 41.9627 14.016 40.256 12.352C38.592 10.6453 36.608 9.344 34.304 8.448C32.0427 7.50933 29.568 7.04 26.88 7.04C24.192 7.04 21.696 7.50933 19.392 8.448C17.088 9.344 15.0827 10.6453 13.376 12.352C11.712 14.016 10.3893 15.9787 9.408 18.24C8.46933 20.4587 8 22.912 8 25.6C8 28.2453 8.46933 30.6987 9.408 32.96C10.3893 35.2213 11.712 37.2053 13.376 38.912C15.0827 40.576 17.088 41.8773 19.392 42.816C21.696 43.712 24.192 44.16 26.88 44.16ZM53.1505 48L71.5185 23.168V26.816L54.2385 3.2H59.6785L74.2065 22.912L72.0945 22.976L86.6225 3.2H91.7425L74.6545 26.496V23.168L92.9585 48H87.4545L71.9665 26.944H73.9505L58.5905 48H53.1505ZM110.109 48V31.36L111.197 34.304L92.189 3.2H97.245L113.949 30.528H111.261L127.965 3.2H132.701L113.693 34.304L114.781 31.36V48H110.109ZM157.757 48.384C154.343 48.384 151.186 47.8293 148.285 46.72C145.426 45.568 142.93 43.968 140.797 41.92C138.706 39.872 137.063 37.4613 135.869 34.688C134.717 31.9147 134.141 28.8853 134.141 25.6C134.141 22.3147 134.717 19.2853 135.869 16.512C137.063 13.7387 138.727 11.328 140.861 9.28C142.994 7.232 145.49 5.65333 148.349 4.544C151.25 3.392 154.407 2.816 157.821 2.816C161.234 2.816 164.349 3.34933 167.165 4.416C170.023 5.48266 172.455 7.104 174.461 9.28L171.517 12.288C169.639 10.4107 167.57 9.06666 165.309 8.256C163.047 7.44533 160.615 7.04 158.013 7.04C155.239 7.04 152.679 7.50933 150.333 8.448C148.029 9.344 146.002 10.6453 144.253 12.352C142.546 14.016 141.202 15.9787 140.22 18.24C139.282 20.4587 138.812 22.912 138.812 25.6C138.812 28.2453 139.282 30.6987 140.22 32.96C141.202 35.2213 142.546 37.2053 144.253 38.912C146.002 40.576 148.029 41.8773 150.333 42.816C152.679 43.712 155.218 44.16 157.949 44.16C160.509 44.16 162.919 43.776 165.181 43.008C167.485 42.24 169.597 40.9387 171.517 39.104L174.205 42.688C172.071 44.5653 169.575 45.9947 166.717 46.976C163.858 47.9147 160.871 48.384 157.757 48.384ZM169.661 42.112V25.6H174.205V42.688L169.661 42.112ZM191.833 23.232H215.513V27.264H191.833V23.232ZM192.345 43.904H219.289V48H187.609V3.2H218.329V7.296H192.345V43.904ZM230.421 48V3.2H234.325L265.237 42.112H263.189V3.2H267.861V48H263.957L233.109 9.088H235.157V48H230.421ZM317.282 48.384C311.564 48.384 307.063 46.7413 303.778 43.456C300.492 40.1707 298.85 35.3067 298.85 28.864V3.2H303.586V28.672C303.586 33.9627 304.78 37.8667 307.17 40.384C309.559 42.9013 312.93 44.16 317.282 44.16C321.676 44.16 325.068 42.9013 327.458 40.384C329.847 37.8667 331.042 33.9627 331.042 28.672V3.2H335.65V28.864C335.65 35.3067 334.007 40.1707 330.722 43.456C327.479 46.7413 322.999 48.384 317.282 48.384ZM349.921 48V3.2H354.657V48H349.921Z" fill="black" />
    </g>
    <defs>
      <clipPath id="clip0_218_80">
        <rect width="358" height="52" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Jumbotron: FC<JumbotronProps> = (): ReactElement => {

  const currentTheme = JSON.parse(localStorage.getItem('sb-addon-themes-3')).current;

  return (
    <div className='storybook-welcome-header'>
      <div className="storybook-welcome-header-logo">
        {currentTheme === "dark" ? <DarkLogo /> : <LightLogo />}
      </div>
      <span className='storybook-welcome-header-description'>
        <p className={currentTheme === "dark" ? 'dark' : ''}>
          The Design System Powering WSO2's Core Products
          </p>
      </span>
      <div className="storybook-welcome-header-version">
        <a href={meta.github.react.url} target="_blank">
          <span className="_381jL0iq5g04eNKgAubL8a">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="lgooi8wRddgYuG7wEUIsI"
              height="24px"
              width="24px"
            >
              <title id="lgooi8wRddgYuG7wEUIsI">Github</title>
              <path
                fill="#eee"
                d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z"
              ></path>
            </svg>
          </span>
          <span className="version-number">Version {pkg.version}</span>
        </a>
      </div>
    </div>
  )
};
