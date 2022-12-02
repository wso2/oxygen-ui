import Head from "next/head";
import Image from "next/image";
import { spaceGrotesk } from "../styles/fonts";
import clsx from "clsx";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Oxygen | by WSO2</title>
        <meta
          name="description"
          content="The design system used by WSO2's core products."
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Image
          className={styles.hero_logo}
          src="/assets/images/oxygen/oxygen-logo.svg"
          alt="oxygen"
          width={400}
          height={100}
        />
        <p className={clsx(styles.description, spaceGrotesk.className)}>
          The <span className={ styles.emphasis_text }>Design System</span> powering{" "}
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
            href="https://github.com/brionmario/oxygen/tree/main/packages/oxygen-primitives"
            className={styles.card}
            target="_blank"
            rel="noreferrer"
          >
            <h2>
              <Image
                src="/assets/images/oxygen/primitives-logo.svg"
                alt="Primitives Logo"
                width={20}
                height={20}
              />
              Primitives
            </h2>
            <code>@oxygen/primitives</code>
            <p className={spaceGrotesk.className}>
              Low level foundation of Oxygen Design System.
            </p>
          </a>
          <a
            href="/react"
            className={styles.card}
          >
            <h2>
              <Image
                src="/assets/images/logos/color/react.svg"
                alt="react"
                width={20}
                height={20}
              />
              React Components
            </h2>
            <code>@oxygen/react</code>
            <p className={spaceGrotesk.className}>
              The React implementation of Oxygen Design System.
            </p>
          </a>
          <a
            href="https://github.com/brionmario/oxygen/tree/main/packages/oxygen-styles"
            className={styles.card}
            target="_blank"
            rel="noreferrer"
          >
            <h2>
              <Image
                src="/assets/images/oxygen/styles-logo.svg"
                alt="Styles Logo"
                width={20}
                height={20}
              />
              Styles
            </h2>
            <code>@oxygen/styles</code>
            <p className={spaceGrotesk.className}>
              SASS based styling system of Oxygen Design System
            </p>
          </a>
          <a
            href="https://www.figma.com/file/78epPbkczGFO5RM1sPyNtN/Oxygen?node-id=0%3A1&t=gsdIXRlJ1VChBa37-0"
            className={styles.card}
            target="_blank"
            rel="noreferrer"
          >
            <h2>
              <Image
                src="/assets/images/logos/color/figma.svg"
                alt="Styles Logo"
                width={20}
                height={20}
              />
              Figma
            </h2>
            <code>@oxygen/figma</code>
            <p className={spaceGrotesk.className}>
              The core origin of Oxygen Design System in Figma
            </p>
          </a>
        </div>
        <div className={styles.divider} />
        <h2>Showcase</h2>
        <div className={styles.examples}>
          <a
            href="/examples/multi-brand-identity"
            className={styles.card}
          >
            <h2>
              Multi Brand Identity Example
            </h2>
            <code>@oxygen-examples/multi-brand-identity</code>
            <p className={spaceGrotesk.className}>
              The core origin of Oxygen Design System in Figma
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://wso2.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with ❤️ {" "} by
          <Image
            src="/assets/images/logos/white/wso2.svg"
            alt="WSO2"
            width={40}
            height={16}
          />
        </a>
      </footer>
    </div>
  );
}
