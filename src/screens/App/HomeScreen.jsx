import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CalenderGrid from '../../components/Home/CalenderGrid'
import AttendanceMarker from '../../components/Home/AttendanceMarker'
import AttendenceStats from '../../components/Home/AttendanceStats'
import AnnouncementCard from '../../components/Home/AnnouncementCard'


const HomeScreen = () => {
  return (
    <View>
      <ScrollView>
      <CalenderGrid />
      <AttendanceMarker/>
      {/* <AttendenceStats/> */}
      {/* <AnnouncementCard /> */}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})