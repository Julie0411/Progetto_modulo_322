import React from 'react';
import { View } from 'react-native';
const BASE_CARD_STYLE = {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    backgroundColor: '#FFFFFF'
};
export const Card = ({ style, children }) => {
    return (<View style={[BASE_CARD_STYLE, style]}>
      {children}
    </View>);
};
