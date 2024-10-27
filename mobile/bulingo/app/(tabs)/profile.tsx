import React, { useState } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, Image, TouchableOpacity, FlatList } from 'react-native';

export default function Profile() {
  const [tab, setTab] = useState(1);
  const createdQuizzes=[{key: 1, desc: 'Created Quiz 1'}]
  const solvedQuizzes=[
    {key: 1, desc: 'Solved Quiz 1'},
    {key: 2, desc: 'Solved Quiz 2'},
    {key: 3, desc: 'Solved Quiz 3'},
    {key: 4, desc: 'Solved Quiz 4'},
    {key: 5, desc: 'Solved Quiz 5'},
    {key: 6, desc: 'Solved Quiz 6'},
  ]
  const postsAndComments=[{key: 1, desc: 'Post 1'}, {key: 2, desc: 'Post 2'}]
  const content = [createdQuizzes, solvedQuizzes, postsAndComments]

  return (
    <FlatList 
      data={content[tab-1]}
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
          <ProfileInfo/>
          <Tabs tab={tab} setTab={setTab}/>
        </>
      }
    />

  );
}

type ProfileInfoProps = {
  style?: StyleProp<ViewStyle>
}

const ProfileInfo = (props?:ProfileInfoProps) => {
  return (
    <View style={[styles.profileInfoContainer, props?.style]}>
      <View style={styles.profileInfoTopContainer}>
        <View style={styles.profileInfoTopPictureContainer}>
          <Image source={require('@/assets/images/profile-icon.png')} style={styles.profileInfoTopPicture}></Image>
        </View>
        <View style={styles.profileInfoTopFollowContainer}>
          <TouchableOpacity style={styles.profileInfoTopFollowItemContainer}>
            <Text style={styles.followItemNumberText}>0</Text>
            <Text style={styles.followItemDescriptionText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileInfoTopFollowItemContainer}>
            <Text style={styles.followItemNumberText}>20</Text>
            <Text style={styles.followItemDescriptionText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileInfoAboutContainer}>
        <Text style={styles.profileInfoNameText}>Yagiz Guldal</Text>
        <Text style={styles.profileInfoAboutText}>Yagiz Guldal is currently creating the profile page. At least he tries to.</Text>
      </View>
      <View style={styles.profileInfoButtonContainer}>
        <TouchableOpacity style={styles.profileInfoButton}>
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
    padding: 10,
  },
  profileInfoTopFollowItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
  },
  followItemNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  followItemDescriptionText: {
    fontSize: 20,
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
    backgroundColor:'#00000010',
    height: 40,
    borderRadius: 8,
    margin: 5,
  },
  profileInfoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    color: 'gray',
    margin: -2
  },
  tabHeaderChosenItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    margin: -2
  },
  tabHeaderItemSelectionIndicator: {
    backgroundColor: 'black',
    height: 3,
    marginHorizontal: 8,
  },
  tabContentContainer: {
    padding: 10,
  },
});
