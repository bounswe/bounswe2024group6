import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TokenManager from '../TokenManager';
import AdminOptions from './adminOptions';
import TagEdit from './tagEdit';
import { router } from 'expo-router';
import PressableText from '../pressableText';

interface PostCardProps {
    id: string;
  title: string;
  author: string;
  likes: number;
  tags: string[];
  liked: boolean;
  isBookmarked: boolean;
  feedOrPost: string;
  onUpvote: () => void;
  onBookmark: () => void;
  onPress?: () => void;
}


const PostCard: React.FC<PostCardProps> = ({
    id,
  title,
  author,
  likes,
  tags,
  liked,
  isBookmarked,
  feedOrPost,
  onUpvote,
  onBookmark,
  onPress,
}) => {
  const [isAdminOptionsVisible, setIsAdminOptionsVisible] = useState(false);
  const [isTagEditVisible, setIsTagEditVisible] = useState(false);

  const handleAdminDeletePost = async () => {
    const url = 'post/delete/';
    const params = {
      'post_id': id,
    }
    try{
      const response = await TokenManager.authenticatedFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (response.ok){
        console.log("Post Deletion successful")
        router.replace('/?notification=Post Deleted Successfully');
      } else {
        console.log(response.status)
      };
    } catch(error) {
      console.error(error)
    }
  }
  

  return (
    <>
      { isTagEditVisible && 
        <TagEdit type="Quiz" id={id} onClose={() => setIsTagEditVisible(false)} tags={tags}/>
      }
      { isAdminOptionsVisible &&
        <AdminOptions onClose={()=>setIsAdminOptionsVisible(false)} options={[
          {
            text: "Delete Post",
            onPress: handleAdminDeletePost
          },
          {
            text: "Change Post Tags",
            onPress: ()=>{
              setIsTagEditVisible(true);
              console.log("Change Post Tags Pressed") /* Placeholder until endpoint is ready */ 
            }
          },
        ]}
        />
      }
      <TouchableOpacity 
        onPress={onPress} 
        onLongPress={() => TokenManager.getIsAdmin() && setIsAdminOptionsVisible(true)}
        testID='card'
      >
        <View style={styles.cardContainer}>
          <View style={styles.header}>
            {/* <PressableText style={styles.title}</> */}
          <PressableText style={styles.title} text={title}/>
            {/* <Text style={styles.title}>{title}</Text> */}
            <Text style={styles.author}>by {author}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {tags && tags.map((tag, index) => (
              <View key={index} style={styles.levelBadge}>
                <Text style={styles.levelText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <View style={styles.actionsContainer}>
              {/* <TouchableOpacity onPress={onUpvote} style={styles.upvoteButton}>
                <FontAwesome name="arrow-up" size={20} color="green" />
                <Text style={styles.upvoteCount}>{likes}</Text>
              </TouchableOpacity>
                */}
              <TouchableOpacity style={styles.likeButton} onPress={() => onUpvote(id)} testID={'likeButton'}>
                <Text style={styles.quizLikes}>
              <Image source={liked ? require('../../assets/images/like-2.png') : require('../../assets/images/like-1.png')}style={styles.icon} /> 
              {likes}
              </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton} testID={'bookmarkButton'}>
                <FontAwesome 
                  name={isBookmarked ? 'bookmark' : 'bookmark-o'} 
                  size={20} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

// Updated styles
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    maxWidth: 400,
    elevation: 5
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  levelBadge: {
    backgroundColor: '#dfe4ea',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 5,
    marginBottom: 5,
  },
  levelText: {
    fontSize: 10,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  upvoteCount: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  bookmarkButton: {},
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  }, 
   quizLikes: {
    fontSize: 16,
    marginBottom: 12,
    // lineHeight: 43,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});

export default PostCard;