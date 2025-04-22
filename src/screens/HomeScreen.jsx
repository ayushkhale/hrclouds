import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalenderGrid from '../components/Home/CalenderGrid'
import AttendanceMarker from '../components/Home/AttendanceMarker'
import AttendenceStats from '../components/Home/AttendanceStats'

const HomeScreen = () => {
  return (
    <View>
      <CalenderGrid />
      <AttendanceMarker/>
      <AttendenceStats/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})