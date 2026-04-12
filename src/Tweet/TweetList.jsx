import { useState, useEffect } from 'react';
import Tweet from './Tweet';
import './TweetList.css';

export default function TweetList() {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockTweets = [
                    {
                        id: 1,
                        authorName: "John Doe",
                        handle: "johndoe",
                        timestamp: "Dec 25",
                        message: "I got my wife a fridge for Christmas. I can't wait to see her face light up when she opens it.",
                        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=john",
                        comments: "1,094",
                        retweets: "5",
                        likes: "8,402"
                    },
                    {
                        id: 2,
                        authorName: "Jane Smith",
                        handle: "janesmith",
                        timestamp: "Dec 24",
                        message: "Just finished my morning run! 10km in under 50 minutes. Feeling accomplished and ready to take on the day! 🏃‍♀️💪",
                        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=jane",
                        comments: "45",
                        retweets: "12",
                        likes: "234"
                    },
                    {
                        id: 3,
                        authorName: "Tech Enthusiast",
                        handle: "techguru",
                        timestamp: "Dec 23",
                        message: "The new AI features are absolutely mind-blowing! We're living in the future, folks. What's your favorite tech innovation of 2024? 🤖✨",
                        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=tech",
                        comments: "892",
                        retweets: "234",
                        likes: "5,678"
                    },
                    {
                        id: 4,
                        authorName: "Foodie Life",
                        handle: "foodlover",
                        timestamp: "Dec 22",
                        message: "Just discovered the most amazing Italian restaurant downtown! The pasta was to die for. Who wants recommendations? 🍝🇮🇹",
                        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=food",
                        comments: "156",
                        retweets: "45",
                        likes: "1,234"
                    },
                    {
                        id: 5,
                        authorName: "Travel Bug",
                        handle: "wanderlust",
                        timestamp: "Dec 21",
                        message: "Booking my flights for Japan! Can't wait to explore Tokyo, Kyoto, and Osaka. Any must-visit spots? 🗾✈️",
                        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=travel",
                        comments: "267",
                        retweets: "89",
                        likes: "2,456"
                    }
                ];

                setTweets(mockTweets);
            } catch (error) {
                console.error('Error fetching tweets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTweets();
    }, []);

    if (loading) {
        return (
            <div className="tweet-list">
                <div className="loading">Loading tweets...</div>
            </div>
        );
    }

    return (
        <div className="tweet-list">
            <h2 className="tweet-list-title">Latest Tweets</h2>
            <div className="tweets-container">
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        authorName={tweet.authorName}
                        handle={tweet.handle}
                        timestamp={tweet.timestamp}
                        message={tweet.message}
                        avatar={tweet.avatar}
                        comments={tweet.comments}
                        retweets={tweet.retweets}
                        likes={tweet.likes}
                    />
                ))}
            </div>
        </div>
    );
}
