import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { router, useLocalSearchParams} from 'expo-router';

const debugUserInfo: OtherUserInfo = {
  name: 'Anil Kose',
  about: "Hello, I am another user.",
  level: 'C2',
  followerCount: 2,
  followingCount: 5,
  isFollowedByUser: false,
  isFollowingUser: true,
  createdQuizzes: [{key: 1, desc: 'Created Quiz 1'}],
  solvedQuizzes: [
    {key: 1, desc: 'Solved Quiz 1'},
    {key: 2, desc: 'Solved Quiz 2'},
    {key: 3, desc: 'Solved Quiz 3'},
    {key: 4, desc: 'Solved Quiz 4'},
    {key: 5, desc: 'Solved Quiz 5'},
    {key: 6, desc: 'Solved Quiz 6'},
  ],
  postsAndComments: [{key: 1, desc: 'Post 1'}, {key: 2, desc: 'Post 2'}],
};

type OtherUserInfo = {
  name: string,
  about: string,
  level: string,
  followerCount: number,
  followingCount: number,
  isFollowingUser: boolean,
  isFollowedByUser: boolean,
  createdQuizzes: {key: number, desc: string}[],  // Placeholder
  solvedQuizzes: {key: number, desc: string}[],  // Placeholder
  postsAndComments: {key: number, desc: string}[],  // Placeholder
};

export default function Profile() {
  /* 
  Things we need to fetch for this page:
  Send the access token, refresh token (maybe) and userId for this user. Get:
   - Name
   - Follower Count
   - Following Count
   - Created Quizzes
   - Solved Quizzes
   - Posts and Comments
  */
  const { username } = useLocalSearchParams();
  const [userInfo, setUserInfo] = useState<OtherUserInfo>(debugUserInfo);
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ENDPOINT_URL = `http://161.35.208.249:8000/users/${username}`;  // Placeholder
    const fetchProfileInfo = async () => {
      const params = {
        // TODO
       };
      try {
        const response = await fetch(ENDPOINT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok){
          setUserInfo(await response.json());
        } else {
          console.log(response.status)
        };
        setUserInfo
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchProfileInfo();
  }, []);


  const tabData = [userInfo.createdQuizzes, userInfo.solvedQuizzes, userInfo.postsAndComments]

  if(isLoading){
    return (
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList 
      data={tabData[tab-1]}
      renderItem={({item}) => {
        return (
          <View style={{height: 100, borderWidth: 3, borderColor: 'black', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 5,}}>
            <Text>Placeholder Item {item.key}: {item.desc}</Text>
          </View>
        );
      }}
      style={{backgroundColor: 'white'}}
      ListHeaderComponent={
        <>
          <ProfileInfo
            name={userInfo.name}
            level={userInfo.level}
            about={userInfo.about}
            isFollowedByUser={userInfo.isFollowedByUser}
            followerCount={userInfo.followerCount}
            followingCount={userInfo.followingCount}
          />
          <Tabs tab={tab} setTab={setTab}/>
        </>
      }
    />
  );
}

type ProfileInfoProps = {
  followerCount: number,
  followingCount: number,
  isFollowedByUser: boolean,
  name: string,
  about: string,
  level: string,
}

const ProfileInfo = (props:ProfileInfoProps) => {


  const handleLevelPress = () => {
    console.log("Level button pressed.")
  };
  const handleFollowersPress = () => {
    router.push('/(tabs)/profile/followers')
    console.log("Followers button pressed.")
  };
  const handleFollowingPress = () => {
    router.push('/(tabs)/profile/following')
    console.log("Following button pressed.")
  };
  const handleButtonPress = () => {
    console.log("Another user's follow/unfollow button pressed.")
  };

  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileInfoTopContainer}>
        <View style={styles.profileInfoTopPictureContainer}>
          <Image source={require('@/assets/images/profile-icon.png')} style={styles.profileInfoTopPicture}></Image>
        </View>
        <View style={styles.profileInfoTopFollowContainer}>
          <TouchableOpacity style={styles.profileInfoTopFollowItemContainer} onPress={handleLevelPress}>
            <Text style={styles.followItemNumberText}>{props.level}</Text>
            <Text style={styles.followItemDescriptionText}>Level</Text>
          </TouchableOpacity>
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
        <Text style={styles.profileInfoNameText}>{props.name}</Text>
        <Text style={styles.profileInfoAboutText}>{props.about}</Text>
      </View>
      <View style={styles.profileInfoButtonContainer}>
        <TouchableOpacity style={styles.profileInfoButton} onPress={handleButtonPress}>
          <Text style={styles.profileInfoButtonText}>{props.isFollowedByUser ? "Unfollow" : "Follow"}</Text>
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
    backgroundColor:'rgba(106, 156, 255, 0.6)',
    height: 40,
    borderRadius: 8,
    margin: 5,
  },
  profileInfoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(8, 8, 206, 1)',
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
