import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

interface RangeSliderProps {
  value: number | number[];
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number | number[]) => void;
  step?: number;
  isRange?: boolean;
}

export default function RangeSlider({
  value,
  minimumValue,
  maximumValue,
  onValueChange,
  step = 1,
  isRange = false,
}: RangeSliderProps) {
  const sliderWidth = 280;
  const thumbSize = 20;
  
  const range = maximumValue - minimumValue;
  
  const getPosition = (val: number) => {
    return ((val - minimumValue) / range) * sliderWidth;
  };
  
  const getValue = (position: number) => {
    const val = (position / sliderWidth) * range + minimumValue;
    return Math.round(val / step) * step;
  };

  const position1 = useSharedValue(
    getPosition(isRange ? (value as number[])[0] : (value as number))
  );
  const position2 = useSharedValue(
    isRange ? getPosition((value as number[])[1]) : 0
  );

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = position1.value;
    },
    onActive: (event, context) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, context.startX + event.translationX));
      if (isRange && newPosition > position2.value) return;
      position1.value = newPosition;
    },
    onEnd: () => {
      const newValue = getValue(position1.value);
      if (isRange) {
        const currentValue = value as number[];
        runOnJS(onValueChange)([newValue, currentValue[1]]);
      } else {
        runOnJS(onValueChange)(newValue);
      }
    },
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = position2.value;
    },
    onActive: (event, context) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, context.startX + event.translationX));
      if (newPosition < position1.value) return;
      position2.value = newPosition;
    },
    onEnd: () => {
      const newValue = getValue(position2.value);
      const currentValue = value as number[];
      runOnJS(onValueChange)([currentValue[0], newValue]);
    },
  });

  const thumb1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: position1.value - thumbSize / 2 }],
  }));

  const thumb2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value - thumbSize / 2 }],
  }));

  const trackStyle = useAnimatedStyle(() => {
    const left = isRange ? position1.value : 0;
    const width = isRange ? position2.value - position1.value : position1.value;
    return {
      left,
      width,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <View style={styles.track} />
        <Animated.View style={[styles.activeTrack, trackStyle]} />
        
        <PanGestureHandler onGestureEvent={gestureHandler1}>
          <Animated.View style={[styles.thumb, thumb1Style]} />
        </PanGestureHandler>
        
        {isRange && (
          <PanGestureHandler onGestureEvent={gestureHandler2}>
            <Animated.View style={[styles.thumb, thumb2Style]} />
          </PanGestureHandler>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  slider: {
    width: 280,
    height: 20,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  activeTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
});