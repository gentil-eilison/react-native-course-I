import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/Goalnput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])
  
  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => {
      return [
        ...currentCourseGoals, 
        { text: enteredGoalText, id: Math.random().toString() }
      ]
    })
    endAddGoalHandler()
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter(goal => goal.id !== id)
    })
  }


  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button onPress={startAddGoalHandler} title='Add New Goal' color='#a065ec'/>
        <GoalInput onEndAddGoal={endAddGoalHandler} visible={modalIsVisible}  onAddGoal={addGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem onDeleteGoal={deleteGoalHandler} id={itemData.item.id} text={itemData.item.text}/>
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5
  }
});
