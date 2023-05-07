import { StyleSheet, View, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import MyMap from './components/MyMap';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 500; // You can adjust the value accordingly

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle='dark-content'/>
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
          style={styles.subContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled
          keyboardVerticalOffset = {keyboardVerticalOffset}
        >
          <MyMap />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
  }

});

export default App