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

import Head from 'next/head';
import Image from 'next/image';
import clsx from 'clsx';
import {ReactElement} from 'react';
import {spaceGrotesk} from '../styles/fonts';
import styles from '../styles/Home.module.css';

const Index = (): ReactElement => (
  <div className={styles.container}>
    <Head>
      <title>Oxygen UI | by WSO2</title>
      <meta name="description" content="The Design System powering WSO2's core products." />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>

    <main className={styles.main}>
      <Image
        className={styles.hero_logo}
        src="/assets/images/oxygen-ui/oxygen-ui-logo.svg"
        alt="Oxygen UI Logo"
        width={400}
        height={100}
      />
      <p className={clsx(styles.description, spaceGrotesk.className)}>
        The <span className={styles.emphasis_text}>Design System</span> powering{' '}
        <Image
          className={styles.wso2_logo}
          src="/assets/images/logos/white/wso2.svg"
          alt="wso2"
          width={50}
          height={20}
        />
        &apos;s core products.
      </p>

      <div className={styles.grid}>
        <a
          href="https://github.com/brionmario/oxygen-ui/tree/main/packages/primitives"
          className={clsx(styles.card, styles.disabled)}
          target="_blank"
          rel="noreferrer"
        >
          <h2>
            <Image src="/assets/images/oxygen-ui/guidelines-logo.svg" alt="Guidelines Logo" width={20} height={20} />
            Guidelines
            <div className={styles['coming-soon-label']}>Coming Soon</div>
          </h2>
          <code>@oxygen-ui/guidelines</code>
          <p className={spaceGrotesk.className}>A collection of principles, standards, and usage guidelines.</p>
        </a>
        <a
          href="https://github.com/brionmario/oxygen-ui/tree/main/packages/primitives"
          className={styles.card}
          target="_blank"
          rel="noreferrer"
        >
          <h2>
            <Image src="/assets/images/oxygen-ui/primitives-logo.svg" alt="Primitives Logo" width={20} height={20} />
            Primitives
          </h2>
          <code>@oxygen-ui/primitives</code>
          <p className={spaceGrotesk.className}>Low level building blocks of the Design System.</p>
        </a>
        <a
          href="https://oxygen-react.vercel.app/?path=/docs/welcome--page"
          className={styles.card}
          target="_blank"
          rel="noreferrer"
        >
          <h2>
            <Image src="/assets/images/logos/color/react.svg" alt="react" width={20} height={20} />
            React Components
          </h2>
          <code>@oxygen-ui/react</code>
          <p className={spaceGrotesk.className}>The React implementation of the Design System.</p>
        </a>

        <a
          href="https://www.figma.com/file/78epPbkczGFO5RM1sPyNtN/Oxygen?node-id=0%3A1&t=gsdIXRlJ1VChBa37-0"
          className={styles.card}
          target="_blank"
          rel="noreferrer"
        >
          <h2>
            <Image src="/assets/images/logos/color/figma.svg" alt="Styles Logo" width={20} height={20} />
            Figma
          </h2>
          <code>@oxygen-ui/figma</code>
          <p className={spaceGrotesk.className}>The place where the designing and brainstorming happens.</p>
        </a>
      </div>
      <div className={styles.divider} />
      <h2>Showcase</h2>
      <div className={styles.grid}>
        <div className={styles.examples}>
          <a
            href="https://oxygen-multi-brand-example.vercel.app"
            className={styles.card}
            target="_blank"
            rel="noreferrer"
          >
            <h2>Multi Brand Identity Example</h2>
            <code>@oxygen-ui-examples/multi-brand-identity</code>
            <p className={spaceGrotesk.className}>
              Sample app to showcase the Design System&apos; multi-branding capabilities
            </p>
          </a>
        </div>
      </div>
    </main>

    <footer className={styles.footer}>
      <a href="https://wso2.com/" target="_blank" rel="noopener noreferrer">
        Built with ❤️ by
        <Image src="/assets/images/logos/white/wso2.svg" alt="WSO2" width={40} height={16} />
      </a>
    </footer>
  </div>
);

export default Index;
