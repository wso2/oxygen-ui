/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import {ReactElement} from 'react';
import {spaceGrotesk} from '../styles/fonts';

const LINKS: {
  examples: {
    multiBrandIdentity: string;
  };
  figma: string;
  primitives: string;
  reactComponents: string;
} = {
  examples: {
    multiBrandIdentity: '/examples/multi-brand-identity',
  },
  figma: 'https://www.figma.com/file/78epPbkczGFO5RM1sPyNtN/Oxygen?node-id=0%3A1&t=gsdIXRlJ1VChBa37-0',
  primitives: 'https://github.com/brionmario/oxygen-ui/tree/main/packages/primitives',
  reactComponents: '/react?path=/docs/welcome--page',
};

const Index = (): ReactElement => (
  <div className="container">
    <Head>
      <title>Oxygen UI | by WSO2</title>
      <meta name="description" content="The Design System powering WSO2's core products." />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>

    <main className="main">
      <div className="hero">
        <Image
          className="hero-logo"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/oxygen-ui/oxygen-ui-logo.svg`}
          alt="Oxygen UI Logo"
          width={400}
          height={100}
        />
        <p className={clsx('hero-description', spaceGrotesk.className)}>
          The <span className="hero-emphasis-text">Design System</span> powering{' '}
          <Image
            className="wso2-logo"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/logos/white/wso2.svg`}
            alt="wso2"
            width={50}
            height={20}
          />
          &apos;s core products.
        </p>
      </div>

      <div className="grid">
        <a
          href="https://github.com/brionmario/oxygen-ui/tree/main/packages/primitives"
          className={clsx('card', 'disabled')}
          target="_blank"
          rel="noreferrer"
        >
          <h2>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/oxygen-ui/guidelines-logo.svg`}
              alt="Guidelines Logo"
              width={20}
              height={20}
            />
            Guidelines
            <div className={clsx('coming-soon-label', spaceGrotesk.className)}>Coming Soon</div>
          </h2>
          <code>@oxygen-ui/guidelines</code>
          <p className={spaceGrotesk.className}>A collection of principles, standards, and usage guidelines.</p>
        </a>
        <a href={LINKS.primitives} className="card" target="_blank" rel="noreferrer">
          <h2>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/oxygen-ui/primitives-logo.svg`}
              alt="Primitives Logo"
              width={20}
              height={20}
            />
            Primitives
          </h2>
          <code>@oxygen-ui/primitives</code>
          <p className={spaceGrotesk.className}>Low level building blocks of the Design System.</p>
        </a>
        <a href={LINKS.reactComponents} className="card" target="_blank" rel="noreferrer">
          <h2>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/logos/color/react.svg`}
              alt="react"
              width={20}
              height={20}
            />
            React Components
          </h2>
          <code>@oxygen-ui/react</code>
          <p className={spaceGrotesk.className}>The React implementation of the Design System.</p>
        </a>

        <a href={LINKS.figma} className="card" target="_blank" rel="noreferrer">
          <h2>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/logos/color/figma.svg`}
              alt="Styles Logo"
              width={20}
              height={20}
            />
            Figma
          </h2>
          <code>@oxygen-ui/figma</code>
          <p className={spaceGrotesk.className}>The place where the designing and brainstorming happens.</p>
        </a>
      </div>
      <div className="divider" />
      <h2>Showcase</h2>
      <div className="grid">
        <div className="examples">
          <a href={LINKS.examples.multiBrandIdentity} className="card" target="_blank" rel="noreferrer">
            <h2>Multi Brand Identity Example</h2>
            <code>@oxygen-ui/multi-brand-identity</code>
            <p className={spaceGrotesk.className}>
              Sample app to showcase the Design System&apos; multi-branding capabilities
            </p>
          </a>
        </div>
      </div>
    </main>

    <footer className="footer">
      <a href="https://wso2.com/" target="_blank" rel="noopener noreferrer">
        Built with ❤️ by
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/logos/white/wso2.svg`}
          alt="WSO2"
          width={40}
          height={16}
        />
      </a>
    </footer>
  </div>
);

export default Index;
