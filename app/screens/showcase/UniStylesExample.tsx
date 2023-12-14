import * as React from 'react';
import {View, Text} from 'react-native';

type Props = {
  text?: String;
};

const UniStylesExample = ({text}: Props): React.JSX.Element => {
  return <Text style={{color: 'white'}}>{text || 'Example Text'}</Text>;
};

export default UniStylesExample;
