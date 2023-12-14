import React from 'react';
import {
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import UniStylesExample from './screens/showcase/UniStylesExample';

const App = (): React.JSX.Element => {
  const { styles } = useStyles(themedStyles)

  return (
    <View style={styles.constainer}>
      <UniStylesExample />
    </View>
  );
}

const themedStyles = createStyleSheet({
  constainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App;
