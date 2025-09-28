import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

type CurvedHeaderProps = {
  title?: string;
  showBackButton?: boolean;
};

export default function CurvedHeader({
  title = 'Title',
  showBackButton = true,
}: CurvedHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${width} 150`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#0e7f2eff" />
              <Stop offset="1" stopColor="#288e4cff" />
            </LinearGradient>
          </Defs>
          <Path
            d={`
              M0,0
              H${width}
              V110
              Q${width / 2},150 0,110
              Z
            `}
            fill="url(#grad)"
          />
        </Svg>
      </View>

      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            testID="back-button"
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { paddingLeft: showBackButton ? 36 : 0 }]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 60,
    zIndex: 2,
  },
  title: {
    padding: 16,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
