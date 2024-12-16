import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {router, useFocusEffect} from 'expo-router';
import QuizCard from '@/app/components/quizCard';
import TokenManager from '@/app/TokenManager';
import GuestModal from '@/app/components/guestModal';
import CommentCard from '@/app/components/commentcard';
import PostCard from '@/app/components/postcard';
import { likePost, bookmarkPost, unlikePost, unbookmarkPost, likeComment, unlikeComment } from '../../api/forum'; // Import the functions from forum.tsx

const defaultUserInfo: UserInfo = {
  username: 'ygz',
  bio: "Hello, I am an avid language learner. I am trying my best to learn English.",
  level: 'B1',
  follower_count: 0,
  following_count: 0,
  createdQuizzes: [],  
  solvedQuizzes: [],
  posts: [],
  comments: [],
  profile_picture: "",
};

type UserInfo = {
  username: string,
  bio: string,
  level: string,
  follower_count: number,
  following_count: number,
  createdQuizzes: QuizInfo[],  // Placeholder
  solvedQuizzes: QuizInfo[],  // Placeholder
  comments: any[],
  posts: any[],
  profile_picture: string,
};

export type QuizInfo = {
  author: {id: number, username: string},
  average_score: number,
  created_at: string,
  id: number,
  title: string,
  description: string,
  level: string,
  like_count: number,
  is_liked: boolean,
  is_bookmarked: boolean
  question_count: number,
  tags: string[],
  times_taken: number,
}

export function isQuizInfo(object: any){
  const asQuizInfo = object as QuizInfo
  return (
    asQuizInfo.author !== undefined && 
    asQuizInfo.description !== undefined && 
    asQuizInfo.id !== undefined &&
    asQuizInfo.level !== undefined
  );
};

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchProfileInfo = async () => {
        setIsLoading(true);
        const username = TokenManager.getUsername()
        if (!username){
          setGuestModalVisible(true);
          setIsLoading(false);
          return
        }
        setGuestModalVisible(false);
        const params = {
          'user': username,
         };
  
        const baseUrl = 'profile/'; // Replace with your API endpoint
  
        // Convert the parameters to a query string
        const queryString = new URLSearchParams(params).toString();
        const profileUrl = `${baseUrl}?${queryString}`;
  
        const createdQuizUrl = `quiz/created/${username}/`;
        const solvedQuizUrl = `quiz/solved/${username}/`;
        let updatedUserInfo;
  
        try {
          const profileRequest = await TokenManager.authenticatedFetch(profileUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const profileResponse = await profileRequest.json();
          if (profileRequest.ok){
            updatedUserInfo = profileResponse
          } else {
            console.log(profileRequest.status)
          };
  
          const createdQuizRequest = await TokenManager.authenticatedFetch(createdQuizUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const createdQuizResponse = await createdQuizRequest.json()
          if (createdQuizRequest.ok){
            updatedUserInfo = {...updatedUserInfo, createdQuizzes: createdQuizResponse}
          } else {
            console.log(createdQuizResponse.status)
          };
          
          const solvedQuizRequest = await TokenManager.authenticatedFetch(solvedQuizUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const solvedQuizResponse = await solvedQuizRequest.json()
          if (solvedQuizRequest.ok){
            setUserInfo({...updatedUserInfo, solvedQuizzes: solvedQuizResponse, username: username});
          } else {
            console.log(createdQuizResponse.status)
          };
  
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      };

      fetchProfileInfo();

      // Optional cleanup (runs when page loses focus)
      return () => {
      };
    }, [])
  );

  const tabData: any = [userInfo.createdQuizzes, userInfo.solvedQuizzes, userInfo.posts.concat(userInfo.comments)]

  if(isLoading){
    return (
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const onGuestModalClose = () => {
    setGuestModalVisible(false);
    router.replace("/");
  }
  if(guestModalVisible){
    return <GuestModal onClose={onGuestModalClose}/>
  }

  const handlePostPress = (id: number) => {
    router.navigate({pathname: '/(tabs)/forums/forumPostPage', params: {
       "id": id,
      }});
  };

  const handleLikePress = async (postId: number): Promise<void> => { 
    userInfo.posts.map(async post => {
      if (post.id === postId) {
        if(post.is_liked){
          try {
            const response = await unlikePost(postId);
            if (response) {
              setUserInfo(
                {
                  ...userInfo,
                  posts: userInfo.posts.map(post => {
                    if (post.id === postId) {
                      return {
                        ...post,
                        is_liked: response.is_liked,
                        like_count: response.like_count
                      };
                    }
                    return post;})
                }
              );
            }
          } catch (error) {
            console.error('Failed to unlike post:', error);
          }
        }
        else{
          try {
            const response = await likePost(postId);
            if (response) {
              setUserInfo(
                {
                ...userInfo,
                posts: userInfo.posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    is_liked: response.is_liked,
                    like_count: response.like_count
                  };
                }
                return post; }
              )});
            }
          } catch (error) {
            console.error('Failed to like post:', error);
          }
        }

      }
    })
    


  };

  const handleBookmarkPress = async (postId: number): Promise<void> => {
    userInfo.posts.map(async post => {

      if (post.id === postId) {
        if(post.is_bookmarked){

          try {
            const response = await unbookmarkPost(postId);
            if (response) {

              setUserInfo(
                {
                ...userInfo,
                posts: userInfo.posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    is_bookmarked: response.is_bookmarked,
                  };
                }
                return post;
              })}
            );}
          } catch (error) {
            console.error('Failed to unbookmark post:', error);
          }
        }
        else{
          try {
            const response = await bookmarkPost(postId);
            if (response) {
              setUserInfo(
                {
                ...userInfo,
                posts: userInfo.posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    is_bookmarked: response.is_bookmarked,
                  };
                }
                return post;
              })});
            }
          } catch (error) {
            console.error('Failed to bookmark post:', error);
          }
        }
      }
    })
    
  };

  const handleLikeComment = async (commentId: number) => {
    userInfo.comments.map(async comment => {
      if (comment.id === commentId) {
        if (comment.is_liked) {
          try {
            const response = await unlikeComment(commentId);
            if (response) {
              setUserInfo(
                {
                ...userInfo,
                comments: userInfo.comments.map(comment => {
                  if (comment.id === commentId) {
                    return {
                      ...comment,
                      is_liked: !comment.is_liked,
                      like_count: response.like_count
                    };
                  }
                  return comment;
                })
              });
            }
          } catch (error) {
            console.error('Failed to unlike comment:', error);
          }
        } else {
          try {
            const response = await likeComment(commentId);
            if (response) {
              setUserInfo(
                {
                ...userInfo,
                comments: userInfo.comments.map(comment => {
                  if (comment.id === commentId) {
                    return {
                      ...comment,
                      is_liked: !comment.is_liked,
                      like_count: response.like_count
                    };
                  }
                  return comment;
                })
              });
            }
          } catch (error) {
            console.error('Failed to like comment:', error);
          }
        }
      }
    });
  };

  return (
    <FlatList 
      data={tabData[tab-1]}
      keyExtractor={(item) => `${item.id}${item.comments ? 'yes' : 'no'}`}
      renderItem={({item}) => {
        if (isQuizInfo(item)){
          return (
            <QuizCard id={item.id} author={item.author.username} title={item.title} level={item.level} 
              description={item.description} liked={item.is_liked} likes={item.like_count} bookmarked={item.is_bookmarked}/>
          );
        }
        else if(item.comments){
          // Post
          return (
            <PostCard title={item.title} id={item.id} author={TokenManager.getUsername() || ''} likes={item.like_count} 
              liked={item.is_liked} tags={item.tags} feedOrPost='feed' isBookmarked={item.is_bookmarked} 
              description={item.description}
              onUpvote={() => handleLikePress(item.id)}
              onBookmark={() => handleBookmarkPress(item.id)}
              onPress={() => handlePostPress(item.id)}
            />
          );
        }
        else{
          // Comment
          // console.log(item)
          return (
            <CommentCard
            id={item.id}
            username={item.author}
            onUpvote={handleLikeComment}
            comment={item.body}
            isBookmarked={item.is_bookmarked}
            liked={item.is_liked}
            likes={item.like_count}
          />
          );
        }
      }}
      style={{backgroundColor: 'white'}}
      ListHeaderComponent={
        <View>
          <ProfileInfo
            username={userInfo.username}
            level={userInfo.level}
            about={userInfo.bio}
            followerCount={userInfo.follower_count}
            followingCount={userInfo.following_count}
            profile_picture_uri={userInfo.profile_picture != "" ? userInfo.profile_picture : undefined}
          />
          <Tabs tab={tab} setTab={setTab}/>
        </View>
      }
    />
  );
}

type ProfileInfoProps = {
  followerCount: number,
  followingCount: number,
  username: string,
  about: string,
  level: string,
  profile_picture_uri?: string,
}

const ProfileInfo = (props:ProfileInfoProps) => {

  const handleFollowersPress = () => {
    router.push('/(tabs)/profile/followers')
  };
  const handleFollowingPress = () => {
    router.push('/(tabs)/profile/following')
  };
  const handleEditProfilePress = () => {
    router.push('/(tabs)/profile/editProfile')
  };

  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileInfoTopContainer}>
        <View style={styles.profileInfoTopPictureContainer}>
          <Image 
            source={props.profile_picture_uri ? { uri: props.profile_picture_uri } : require('@/assets/images/profile-icon.png')}
            style={styles.profileInfoTopPicture}
          />
        </View>
        <View style={styles.profileInfoTopFollowContainer}>
          <View style={styles.profileInfoTopFollowItemContainer}>
            <Text style={styles.followItemNumberText}>{props.level == 'NA' ? 'N/A' : props.level}</Text>
            <Text style={styles.followItemDescriptionText}>Level</Text>
          </View>
          <TouchableOpacity style={styles.profileInfoTopFollowItemContainer} onPress={handleFollowersPress}>
            <Text style={styles.followItemNumberText}>{props.followerCount}</Text>
            <Text style={styles.followItemDescriptionText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileInfoTopFollowItemContainer} onPress={handleFollowingPress}>
            <Text style={styles.followItemNumberText}>{props.followingCount}</Text>
            <Text style={styles.followItemDescriptionText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileInfoAboutContainer}>
        <Text style={styles.profileInfoNameText}>{props.username}</Text>
        <Text style={styles.profileInfoAboutText}>{props.about}</Text>
      </View>
      <View style={styles.profileInfoButtonContainer}>
        <TouchableOpacity style={styles.profileInfoButton} onPress={handleEditProfilePress}>
          <Text style={styles.profileInfoButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type TabsProps = {
  tab: number,
  setTab: (newTab: number) => void;
};

const Tabs = (props: TabsProps) => {
  const handleTab1Press = () => {
    props.setTab(1);
  };
  const handleTab2Press = () => {
    props.setTab(2);
  };
  const handleTab3Press = () => {
    props.setTab(3);
  };

  return (
    <>
      <View style={styles.tabHeaderContainer}>
        <TouchableOpacity style={styles.tabHeaderItemContainer} onPress={handleTab1Press}>
          <View style={styles.tabHeaderItemTextContainer}>
            <Text style={props.tab==1 ? styles.tabHeaderChosenItemText: styles.tabHeaderItemText}>Created</Text>
            <Text style={props.tab==1 ? styles.tabHeaderChosenItemText: styles.tabHeaderItemText}>Quizzes</Text>
          </View>
          <View style={[styles.tabHeaderItemSelectionIndicator, props.tab==1 ? {} : {opacity: 0}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabHeaderItemContainer} onPress={handleTab2Press}>
          <View style={styles.tabHeaderItemTextContainer}>
            <Text style={props.tab==2 ? styles.tabHeaderChosenItemText: styles.tabHeaderItemText}>Solved</Text>
            <Text style={props.tab==2 ? styles.tabHeaderChosenItemText: styles.tabHeaderItemText}>Quizzes</Text>
          </View>
          <View style={[styles.tabHeaderItemSelectionIndicator, props.tab==2 ? {} : {opacity: 0}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabHeaderItemContainer} onPress={handleTab3Press}>
          <View style={styles.tabHeaderItemTextContainer}>
            <Text style={props.tab==3 ? styles.tabHeaderChosenItemText: styles.tabHeaderItemText}>Posts &</Text>
            <Text style={props.tab==3 ? styles.tabHeaderChosenItemText: styles.tabHeaderItemText}>Comments</Text>
          </View>
          <View style={[styles.tabHeaderItemSelectionIndicator, props.tab==3 ? {} : {opacity: 0}]}/>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    height: 2,
    opacity: 0.5,
    backgroundColor: 'gray',
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
    padding: 5,
  },
  profileInfoTopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  profileInfoTopPictureContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  profileInfoTopPicture: {
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'gray',
    width: 90,
    height: 90,
    margin: 10,
  },
  profileInfoTopFollowContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
    paddingTop: 10,
  },
  profileInfoTopFollowItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 3,
  },
  followItemNumberText: {
    fontSize: RFPercentage(3.2),
    fontWeight: 'bold',
  },
  followItemDescriptionText: {
    fontSize: RFPercentage(2.1),
    color: 'rgba(8, 8, 206, 1)',
  },
  profileInfoAboutContainer: {
    flex: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 10,
  },
  profileInfoButtonContainer: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  profileInfoNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileInfoAboutText: {
    fontSize: 16,
  },
  profileInfoButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(106, 156, 255, 1)',
    height: 40,
    borderRadius: 8,
    margin: 5,
  },
  profileInfoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  tabHeaderItemContainer: {
    flex: 1,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  tabHeaderItemTextContainer: {
    marginTop: 5,
  },
  tabHeaderItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(8, 8, 186, 0.2)',
    margin: -2
  },
  tabHeaderChosenItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(8, 8, 186, 1)',
    fontWeight: 'bold',
    margin: -2
  },
  tabHeaderItemSelectionIndicator: {
    backgroundColor: 'rgba(8, 8, 186, 1)',
    height: 3,
    marginHorizontal: 8,
  },
  tabContentContainer: {
    padding: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
