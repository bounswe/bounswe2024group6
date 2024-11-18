import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, useColorScheme} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import {router} from "expo-router";
import { Shadow } from 'react-native-shadow-2';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export type QuizResultsProps = {
  quizResultsProps: QuizResultsCardProps,
  recommendationProps: QuizCardProps,
};

const QuizResults = () => {
  const rawProps = useLocalSearchParams<{'props': string}>();
  const props: QuizResultsProps = JSON.parse(rawProps.props);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.resultsCardContainer}>
          <QuizResultsCard 
            quizName={props.quizResultsProps.quizName}
            tags={props.quizResultsProps.tags} 
            score={props.quizResultsProps.score} 
            maxScore={props.quizResultsProps.maxScore}
            styles={{styles}}
          />
        </View>
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>Recommended Quiz</Text>
          <QuizCard 
            name={props.recommendationProps.name}
            author={props.recommendationProps.author} 
            desc={props.recommendationProps.desc} 
            tags={props.recommendationProps.tags}
            styles={{styles}}
          />
        </View>
        <View style={styles.buttonContainer}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity style={styles.retakeQuizButton} onPress={() => {router.push("/(tabs)/quizzes/quizQuestion")}}>
            <Text style={styles.retakeQuizText}>Retake Quiz</Text>
          </TouchableOpacity>
          </Shadow>
          </View>

          <View style={styles.buttonContainer}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity style={styles.mainMenuButton} onPress={() => {router.navigate("/")}}>
            <Text style={styles.mainMenuText}>Main Menu</Text>
          </TouchableOpacity>
          </Shadow>
          </View>
      </View>
    </View>
  );
};

export type QuizResultsCardProps = {
  quizName: string,
  score: number,
  maxScore: number,
  tags: string[],
  styles?: any,
}

export const QuizResultsCard = (props: QuizResultsCardProps) => {
    const { styles } = props.styles;
  return (
    <View style={[styles.resultsCard, styles.elevation]}>
      <View style={styles.resultsTitleContainer}>
        <Text style={styles.resultsTitle}>{props.quizName}</Text>
      </View>
      <View style={[styles.resultsScoreContainer, styles.elevation]}>
        <Text style={styles.scoreText}>Score</Text>
        <View style={[styles.scoreBox, styles.elevation]}>
          <Text style={styles.scoreBoxText}>{props.score}/{props.maxScore}</Text>
        </View>
      </View>
      <View style={styles.bottomMessageContainer}>
          <Text style={styles.bottomMessage}>Congrats!</Text>
          <Text style={styles.bottomMessage}>Keep it up!</Text>
        </View>
      <View style={styles.resultsBottomContainer}>
      <View style={styles.resultsTagsContainer}>
        {props.tags.map((item, index) => (
            <View style={styles.tagBox} key={index}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
        ))}
      </View>
          <TouchableOpacity>
              <Image style={styles.bottomButtonLike} source={require('@/assets/images/like-1.png')}/>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image style={[styles.bottomButtonBookmark, {borderWidth: 0}]} source={require('@/assets/images/bookmark-icon.png')}/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export type QuizCardProps = {
  name?: string, 
  desc?: string,
  author?: string,
  tags: string[],
  styles?: any,
};

export const QuizCard = (props: QuizCardProps) => {
  const { styles } = props.styles;
  return (
    <TouchableOpacity
    style={[styles.quizItem, styles.elevation]}
    onPress={() => router.navigate('/(tabs)/quizzes/quizDetails')}
  >
    <View style={styles.quizInfo}>
      <Text style={styles.quizTitle}>{props.name}</Text>
      <Text style={styles.quizDescription}>{props.desc}</Text>
      <Text style={styles.quizAuthor}>by {props.author}</Text>
      <Text style={styles.quizLevel}>{props.tags}</Text>
    </View>
    <View style={styles.quizActions}>
      <TouchableOpacity style={styles.likeButton}>
        <Image source={require('@/assets/images/like-1.png')} style={styles.icon} />
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookmarkButton}>
        <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
  );
};


const getStyles = (colorScheme:any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      marginTop: 30,
      marginBottom: 20,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    page: {
      flex: 9,
      justifyContent: "space-around",
      alignItems: 'stretch',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    resultsCardContainer: {
      flex: 3,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    resultsCard: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      alignItems: 'stretch',
    },
    resultsTitleContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultsTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
    },
    resultsTagsContainer: {
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagBox: {
      backgroundColor: isDark ? '#333' : '#dfe4ea',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12,
      alignSelf: 'flex-start',
    },
    tagText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    resultsScoreContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scoreText: {
      textAlign: 'center',
      fontSize: 24,
      color: isDark ? '#bbb' : '#000',
    },
    scoreBox: {
      width: width * 0.24,
      height: height * 0.05,
      borderRadius: 15,
      backgroundColor: isDark ? '#3944FD' : 'blue',
      paddingHorizontal: 5,
      paddingVertical: 6,
      margin: 15,
    },
    scoreBoxText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'white',
      fontSize: 20,
    },
    bottomMessageContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMessage: {
      textAlign: 'center',
      fontSize: 24,
      color: isDark ? '#fff' : '#000',
    },
    resultsBottomContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bottomButtonLike: {
      alignItems: 'center',
      width: width * 0.1,
      height: height * 0.06,
      borderRadius: 25,
    },
    bottomButtonBookmark: {
      alignItems: 'center',
      width: width * 0.10,
      height: height * 0.06,
      borderRadius: 25,
    },
    recommendationContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'stretch',
      marginLeft: 20,
      marginRight: 20,
      padding: 15,
    },
    recommendationText: {
      fontSize: 18,
      fontFamily: 'sans-serif',
      paddingLeft: 5,
      color: isDark ? '#fff' : '#000',
    },
    quizItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      marginBottom: 5,
      marginTop: 8,
      borderRadius: 8,
      position: 'relative',
    },
    retakeQuizButton: {
      backgroundColor: '#3944FD',
      padding: 15,
      borderRadius: 10,
      width: width * 0.7,
      alignItems: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    retakeQuizText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    mainMenuButton: {
      backgroundColor: isDark ? '#333' : '#CCCCCC',
      padding: 15,
      borderRadius: 10,
      width: width * 0.5,
      alignItems: 'center',
      alignSelf: 'center',
    },
    mainMenuText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    elevation: {
      elevation: 10,
      shadowColor: isDark ? '#fff' : 'black',
    },
    quizInfo: {
      flex: 1,
    },
    quizTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    quizDescription: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#666',
    },
    quizAuthor: {
      fontSize: 12,
      color: isDark ? '#888' : '#999',
    },
    quizLevel: {
      backgroundColor: isDark ? '#444' : '#dfe4ea',
      marginTop: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      fontSize: 12,
      color: isDark ? '#fff' : '#333',
      alignSelf: 'flex-start',
    },
    quizActions: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      padding: 4,
    },
    likeButton: {
      position: 'absolute',
      bottom: height * 0.02,
      left: -width * 0.15,
    },
    bookmarkButton: {
      position: 'absolute',
      bottom: height * 0.02,
      right: width * 0.03,
    },
    icon: {
      width: width * 0.07,
      height: height * 0.05,
      resizeMode: 'contain',
    },
  });
};

export default QuizResults;