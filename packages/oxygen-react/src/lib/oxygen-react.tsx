import styles from './oxygen-react.module.scss';

/* eslint-disable-next-line */
export interface OxygenReactProps {}

export function OxygenReact(props: OxygenReactProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OxygenReact!</h1>
    </div>
  );
}

export default OxygenReact;
