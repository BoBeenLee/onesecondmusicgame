import hoistNonReactStatic from 'hoist-non-react-statics';
import React, {Component} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {getRootStore} from 'src/stores/Store';

const withAppState = <P extends object>(
  TargetComponent: React.ComponentType<P>,
) => {
  class WithAppState extends Component<P> {
    public appStateListener: ReturnType<
      typeof AppState.addEventListener
    > | null = null;
    public componentDidMount() {
      this.appStateListener = AppState.addEventListener(
        'change',
        this.handleAppStateChange,
      );
    }

    public componentWillUnmount() {
      if (this.appStateListener) {
        this.appStateListener.remove();
      }
    }

    public render() {
      return <TargetComponent {...this.props} />;
    }

    private handleAppStateChange = async (appState: AppStateStatus) => {
      if (appState !== getRootStore().appStateStatus) {
        getRootStore().setAppStateStatus(appState);
      }
    };

    private isChangeActiveState = (appState: AppStateStatus) => {
      return (
        appState === 'active' && getRootStore().appStateStatus !== 'active'
      );
    };
  }
  hoistNonReactStatic(WithAppState, TargetComponent);
  return WithAppState;
};

export default withAppState;
