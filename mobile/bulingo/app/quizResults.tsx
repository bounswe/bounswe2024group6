import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import Navbar from "./navbar";
import {router} from "expo-router";

export type QuizResultsProps = {
  quizResultsProps: QuizResultsCardProps,
  recommendationProps: QuizCardProps,
};

const QuizResults = () => {
  const rawProps = useLocalSearchParams<{'props': string}>();
  const props: QuizResultsProps = JSON.parse(rawProps.props);

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}><Navbar/></View>
      <View style={styles.page}>
        <View style={styles.resultsCardContainer}>
          <QuizResultsCard 
            quizName={props.quizResultsProps.quizName}
            tags={props.quizResultsProps.tags} 
            score={props.quizResultsProps.score} 
            maxScore={props.quizResultsProps.maxScore}
          />
        </View>
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>Recommended Quiz</Text>
          <QuizCard 
            name={props.recommendationProps.name}
            author={props.recommendationProps.author} 
            desc={props.recommendationProps.desc} 
            tags={props.recommendationProps.tags}
          />
        </View>
        <View style={styles.actionButtonsContainer}>
          <Pressable style={styles.retakeQuizButton} onPress={() => {router.push("/quizQuestion")}}>
            <Text style={styles.retakeQuizText}>Retake Quiz</Text>
          </Pressable>
          <Pressable style={styles.mainMenuButton} onPress={() => {router.navigate("/")}}>
            <Text style={styles.mainMenuText}>Main Menu</Text>
          </Pressable>
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
}

export const QuizResultsCard = (props: QuizResultsCardProps) => {
  return (
    <View style={styles.resultsCard}>
      <View style={styles.resultsTitleContainer}>
        <Text style={styles.resultsTitle}>{props.quizName}</Text>
      </View>
      <View style={styles.resultsTagsContainer}>
        {props.tags.map((item, index) => (
            <View style={styles.tagBox} key={index}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
        ))}
      </View>
      <View style={styles.resultsScoreContainer}>
        <Text style={styles.scoreText}>Score</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreBoxText}>{props.score}/{props.maxScore}</Text>
        </View>
      </View>
      <View style={styles.resultsBottomContainer}>
        <View style={styles.bottomButtonContainer}>
          <Pressable>
            <View style={styles.bottomButton}>
              <Image style={{width: 30, height: 30, marginTop: 5}} source={require('@/assets/images/like-1.png')}/>
            </View>
          </Pressable>
        </View>
        <View style={styles.bottomMessageContainer}>
          <Text style={styles.bottomMessage}>Congrats!</Text>
          <Text style={styles.bottomMessage}>Keep it up!</Text>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Pressable>
            <Image style={[styles.bottomButton, {borderWidth: 0}]} source={require('@/assets/images/bookmark-icon.png')}/>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export type QuizCardProps = {
  name?: string, 
  desc?: string,
  author?: string,
  tags: string[],
};

export const QuizCard = (props: QuizCardProps) => {
  return (
    <View style={styles.quizCard}>
      <View style={styles.quizCardTop}>
        <Text style={styles.quizCardTitle}>{props.name}</Text>
      </View>
      <View style={styles.quizCardMiddle}>
        <Text style={styles.quizCardDescription}>{props.desc}</Text>
      </View>
      <View style={styles.quizCardBottom}>
        <View style={styles.quizCardBottomLeft}>
          <Text style={styles.quizCardAuthorText}>by {props.author}</Text>
          <View style={styles.quizCardTagsContainer}>
            {props.tags.map((item, index) => (
                <View style={styles.tagBox} key={index}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
            ))}
          </View>
        </View>
        <View style={styles.quizCardBottomRight}>
          <Pressable>
            <View style={styles.quizCardBookmarkButton}>
              <Image style={styles.quizCardBookmarkButton} source={require('@/assets/images/bookmark-icon.png')}/>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  navbarContainer: {
    flex: 1,
  },
  page: {
    flex: 9,
    justifyContent: "space-around",
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  resultsCardContainer: {
    flex: 3,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  resultsCard: {
    flex: 1,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#b2f2bb",
    justifyContent: 'space-between',
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
  },
  resultsTagsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagBox: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    margin: 2,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    textAlign: 'center',
    backgroundColor: "#f40038bb",
  },
  tagText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultsScoreContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 24,
  },
  scoreBox: {
    borderWidth: 2,
    borderColor: '#1971c2',
    backgroundColor: "#a5d8ff",
    paddingHorizontal: 5,
    paddingVertical: 2,
    margin: 5,
  },
  scoreBoxText: {
    textAlign: 'center',
    fontSize: 20,
  },
  resultsBottomContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomMessageContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 5,
  },
  bottomMessage: {
    textAlign: 'center',
    fontSize: 24
  }, 
  bottomButton: {
    alignItems: 'center',
    borderWidth: 3,
    borderColor: "#000",
    width: 50,
    height: 50,
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
    fontSize: 20,
    paddingLeft: 5,
  },
  quizCard: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: "#b2f2bb",
    padding: 5,
  },
  quizCardTop: {
    flex: 1,
    justifyContent: 'center',
  },
  quizCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quizCardMiddle: {
    flex: 1,
    justifyContent: 'center',
  },
  quizCardDescription: {
    fontSize: 12,
  },
  quizCardBottom: {
    flex: 2,
    flexDirection: 'row',
    
  },
  quizCardBottomLeft: {
    flex: 4,
    justifyContent: 'center'
  },
  quizCardAuthorText: {
    fontSize: 16,
  },
  quizCardTagsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  quizCardBottomRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizCardBookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  actionButtonsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  retakeQuizButton: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    margin: 5,
    borderRadius: 10,
    flex: 1,
    borderWidth: 2,
    backgroundColor: '#b2f2bb',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeQuizText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  mainMenuButton: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 10,
    flex:1,
    borderWidth: 2,
    backgroundColor: '#b2f2bb',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMenuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  
});

export default QuizResults;