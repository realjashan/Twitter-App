import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React,{useEffect,useState} from 'react'
// import tweets from '../data/tweets'
import TweetComp from './Tweet'
import { DataStore, loadingContainer } from 'aws-amplify';
import  {TweetDb}  from '../src/models';

const Feed = () => {
const [tweets,setTweets]=useState([]);
const [loading,setLoading]=useState(false);

const fetchTweets=async ()=>{
  setLoading(true)

try {
  const tweetHandle=await DataStore.query(TweetDb);
 
  setTweets(tweetHandle);
 
} catch (error) {
console.log(error)

  
}
finally{
  setLoading(false);
}


 
  }

useEffect(() => {

 fetchTweets();
}, [])


  return (
    
  <FlatList 
  
  data={tweets}
  renderItem={({item})=><TweetComp tweet={item}/>}
  keyExtractor={(item)=>item.id}
  refreshing={loading}
  onRefresh={fetchTweets}
  />
  ) 
}


export default Feed

const styles = StyleSheet.create({})