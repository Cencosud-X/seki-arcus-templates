import React from 'react';
import styles from './index.module.css';
import { hotjar } from 'react-hotjar';
import secrets from '../../config/secrets'

interface IProps {
  onLoadComplete: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {}


export default class BootingPage extends React.Component<IProps, IState> {
  
  override componentDidMount() {
    const { onLoadComplete } = this.props;
    this.startWarmUp(onLoadComplete);
  }

  startWarmUp(onFinish: () => void) {
    // Put here the booting logic
    hotjar.initialize(secrets.HOTJAR_ID, secrets.HOTJAR_SNIPPET_VERSION);
    onFinish();
  }

  override render() {
    return (
      <div className={styles.root}>
        <div className={styles.root__content}>
            <span>Loading</span>
        </div>
      </div>
    );
  }
}
