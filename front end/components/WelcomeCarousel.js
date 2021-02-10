import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";
import CarouselItem from "./CarouselItem";
import colors from "../constants/colors";

const { width, _ } = Dimensions.get("window");

const WelcomeCarousel = ({ data, navigation }) => {
  let flatList = useRef();
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  if (data && data.length > 0) {
    return (
      <View style={styles.carouselContainer}>
        <FlatList
          ref={(list) => (flatList = list)}
          data={data}
          keyExtractor={(_, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={item} navigation={navigation}/>;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View style={styles.bottomPaginationView}>
          {data.map((_, index) => {
            let backgroundColor = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [colors.blurredPrimary, "#24BFFE", colors.blurredPrimary],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={[styles.page, { backgroundColor }]}
              />
            );
          })}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default WelcomeCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
  },
  bottomPaginationView: {
    width: width / 4,
    flexDirection: "row",
    justifyContent: "center",
    height: 5,
    borderRadius: 2,
  },
  page: {
    width: "25%",
    borderRadius: 2,
    marginHorizontal: 2
  },
});
