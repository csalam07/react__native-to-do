import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const img =
  "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const SPACING = 15;
const ITEM_SIZE = 70 + SPACING * 3;

const HomeScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const edges = useSafeAreaInsets();

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "1",
      text: "Learn React Native",
      completed: false,
    },
    {
      id: "2",
      text: "Learn Local MangoDb in RN",
      completed: false,
    },
    {
      id: "3",
      text: "Attend MyCaptain Webinar",
      completed: false,
    },
  ]);

  //   todo
  const addTodo = (e) => {
    e.preventDefault();
    if (input.length <= 0) return;
    else {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: input, completed: false },
      ]);
    }
    setInput("");
  };
  // remove todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: edges.top + 110,
        paddingBottom: 25,
        backgroundColor: "lightgray",
        flex: 1,
      }}
    >
      <Image
        source={{ uri: img }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        data={todos}
        horizontal={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                width: Dimensions.get("window").width - 60,
                padding: 15,
                borderRadius: 15,
                margin: 10,
                opacity,
                backgroundColor: "#fff",
                transform: [{ scale }],
              }}
            >
              <TouchableOpacity
                onPress={() => removeTodo(item.id)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 55,
                }}
              >
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <TextInput
        onChangeText={(text) => setInput(text)}
        value={input}
        placeholder="Add a todo"
        onSubmitEditing={(e) => addTodo(e)}
        style={styles.input}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "#000",
  },

  input: {
    width: Dimensions.get("window").width - 60,
    bottom: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
    color: "#000",
    margin: 10,
  },
});
