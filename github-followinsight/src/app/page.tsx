"use client";

import { useState } from "react";

interface GitHubUser {
  login: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const fetchGitHubData = async () => {
    if (!username) return;

    try {
      setError("");
      const [followersRes, followingRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/followers`),
        fetch(`https://api.github.com/users/${username}/following`),
      ]);

      if (!followersRes.ok || !followingRes.ok) {
        setError("User not found or API limit exceeded");
        return;
      }

      const followersData: GitHubUser[] = await followersRes.json();
      const followingData: GitHubUser[] = await followingRes.json();

      setFollowers(followersData.map((user: GitHubUser) => user.login));
      setFollowing(followingData.map((user: GitHubUser) => user.login));
    } catch (err) {
      setError("Failed to fetch data. Try again later.");
    }
  };

  // Find users who are not following back and those who are not followed back
  const notFollowingBack = followers.filter((follower) => !following.includes(follower));
  const notFollowedBack = following.filter((followed) => !followers.includes(followed));

  return (
    <div className="min-h-screen p-6 bg-aqua flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">GitHub Follow Insight</h1>
      
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded-l"
        />
        <button onClick={fetchGitHubData} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Check
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="table-auto w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="p-4 text-white bg-gray-700">Your Followers</th>
            <th className="p-4 text-white bg-green-500">People You Follow</th>
            <th className="p-4 text-white bg-blue-500">Not Following Back</th>
            <th className="p-4 text-white bg-red-500">Not Followed Back</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 bg-white">
              {followers.length > 0 ? (
                <ul className="list-none">
                  {followers.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>No followers found</span>
              )}
            </td>
            <td className="border p-2 bg-green-100">
              {following.length > 0 ? (
                <ul className="list-none">
                  {following.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>Not following anyone</span>
              )}
            </td>
            <td className="border p-2 bg-blue-100">
              {notFollowingBack.length > 0 ? (
                <ul className="list-none">
                  {notFollowingBack.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>Everyone is following you back</span>
              )}
            </td>
            <td className="border p-2 bg-red-100">
              {notFollowedBack.length > 0 ? (
                <ul className="list-none">
                  {notFollowedBack.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              ) : (
                <span>You are following everyone back</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
